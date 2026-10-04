import {
  enableBlocking,
  disableBlocking,
} from './services/blocking'
import {
  getProtectionState,
  getWhitelist,
} from './services/storage'

console.log('D-Blockerz background service worker started')

async function restoreProtectionState() {
  try {
    const enabled = await getProtectionState()

    if (enabled) {
      const whitelist = await getWhitelist()

      await enableBlocking(whitelist)

      console.log(
        `D-Blockerz protection restored: ON (${whitelist.length} whitelisted domains)`,
      )
    } else {
      await disableBlocking()
      console.log('D-Blockerz protection restored: OFF')
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
    if (areaName !== 'local') return

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
  },
)