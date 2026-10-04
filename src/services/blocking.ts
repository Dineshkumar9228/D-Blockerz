import { blockingRules } from '../rules/blockingRules'

const WHITELIST_RULE_ID_START = 1000

function createWhitelistRules(
  whitelist: string[],
): chrome.declarativeNetRequest.Rule[] {
  return whitelist.map((domain, index) => ({
    id: WHITELIST_RULE_ID_START + index,
    priority: 10,
    action: {
      type: 'allow',
    },
    condition: {
      urlFilter: `||${domain}^`,
      resourceTypes: [
        'script',
        'image',
        'stylesheet',
        'xmlhttprequest',
      ],
    },
  })) as chrome.declarativeNetRequest.Rule[]
}

export async function enableBlocking(
  whitelist: string[] = [],
): Promise<void> {
  const whitelistRules = createWhitelistRules(whitelist)

  const oldWhitelistRuleIds = Array.from(
    { length: 100 },
    (_, index) => WHITELIST_RULE_ID_START + index,
  )

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [
      ...blockingRules.map((rule) => rule.id),
      ...oldWhitelistRuleIds,
    ],
    addRules: [
      ...blockingRules,
      ...whitelistRules,
    ],
  })

  console.log(
    `D-Blockerz blocking enabled: ${
      blockingRules.length + whitelistRules.length
    } rules`,
  )
}

export async function disableBlocking(): Promise<void> {
  const whitelistRuleIds = Array.from(
    { length: 100 },
    (_, index) => WHITELIST_RULE_ID_START + index,
  )

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [
      ...blockingRules.map((rule) => rule.id),
      ...whitelistRuleIds,
    ],
  })

  console.log('D-Blockerz blocking disabled')
}