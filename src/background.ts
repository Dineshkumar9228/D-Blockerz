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

console.log(
  'D-Blockerz background service worker started',
)

async function restoreProtectionState(): Promise<void> {
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

    try {
      await disableBlocking()
    } catch (disableError) {
      console.error(
        'Failed to safely disable blocking after restoration error:',
        disableError,
      )
    }
  }
}

void restoreProtectionState()

chrome.storage.onChanged.addListener(
  async (changes, areaName) => {
    if (areaName !== 'local') {
      return
    }

    try {
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
    } catch (error) {
      console.error(
        'Failed to refresh blocking rules after storage change:',
        error,
      )
    }
  },
)
