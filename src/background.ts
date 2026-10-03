import { blockingRules } from './rules/blockingRules'

console.log('D-Blockerz background service worker started')

async function installBlockingRules() {
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: blockingRules.map((rule) => rule.id),
      addRules: blockingRules,
    })

    console.log(
      `D-Blockerz blocking rules installed: ${blockingRules.length}`,
    )
  } catch (error) {
    console.error('Failed to install blocking rules:', error)
  }
}

installBlockingRules()