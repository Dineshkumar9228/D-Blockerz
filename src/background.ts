import {
  enableBlocking,
  disableBlocking,
} from './services/blocking'
import {
  getProtectionState,
  getWhitelist,
} from './services/storage'
import {
  initializeFilterLists,
} from './services/filterLists'
import {
  incrementAdsBlocked,
  incrementTrackersBlocked,
} from './services/statistics'

console.log('D-Blockerz background service worker started')

async function restoreProtectionState() {
  try {
    await initializeFilterLists()

    const enabled = await getProtectionState()

    if (enabled) {
      const whitelist = await getWhitelist()

      await enableBlocking(whitelist)

      console.log(
        `D-Blockerz protection restored: ON (${whitelist.length} whitelisted domains)`,
      )
    } else {
      await disableBlocking()

      console.log(
        'D-Blockerz protection restored: OFF',
      )
    }
  } catch (error) {
    console.error(
      'Failed to restore protection state:',
      error,
    )
  }
}

restoreProtectionState()

chrome.storage.onChanged.addListener(
  async (changes, areaName) => {
    if (areaName !== 'local') {
      return
    }

    if (changes.whitelist) {
      const enabled = await getProtectionState()

      if (enabled) {
        const whitelist = await getWhitelist()

        await enableBlocking(whitelist)

        console.log(
          `D-Blockerz whitelist updated: ${whitelist.length} domains`,
        )
      }
    }

    if (changes.filterLists) {
      const enabled = await getProtectionState()

      if (enabled) {
        const whitelist = await getWhitelist()

        await enableBlocking(whitelist)

        console.log(
          'D-Blockerz filter lists updated: blocking rules refreshed',
        )
      }
    }
  },
)

if (chrome.declarativeNetRequest.onRuleMatchedDebug) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
    async (info) => {
      const ruleId = info.rule.ruleId

      try {
        if (ruleId === 1) {
          await incrementAdsBlocked()

          console.log(
            'D-Blockerz statistics: ad blocked',
          )
        }

        if (ruleId === 2 || ruleId === 3) {
          await incrementTrackersBlocked()

          console.log(
            'D-Blockerz statistics: tracker blocked',
          )
        }
      } catch (error) {
        console.error(
          'Failed to update blocking statistics:',
          error,
        )
      }
    },
  )

  console.log(
    'D-Blockerz statistics debug listener enabled',
  )
}