console.log('D-Blockerz background service worker started')

const testRule: chrome.declarativeNetRequest.Rule = {
  id: 1,
  priority: 1,
  action: {
    type: 'block',
  },
  condition: {
    urlFilter: '||ads.example.com^',
    resourceTypes: ['script', 'image', 'stylesheet', 'xmlhttprequest'],
  },
}

chrome.runtime.onInstalled.addListener(async () => {
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [testRule.id],
      addRules: [testRule],
    })

    console.log('D-Blockerz blocking rule installed')
  } catch (error) {
    console.error('Failed to install blocking rule:', error)
  }
})