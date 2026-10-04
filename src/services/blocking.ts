import { blockingRules } from '../rules/blockingRules'
import { generateFilterRules } from '../rules/generateFilterRules'
import { getEnabledFilterLists } from './filterLists'

const FILTER_RULE_ID_START = 100
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

async function createFilterRules(): Promise<
  chrome.declarativeNetRequest.Rule[]
> {
  const filterLists = await getEnabledFilterLists()

  return generateFilterRules(filterLists).map(
    (rule, index) => ({
      ...rule,
      id: FILTER_RULE_ID_START + index,
    }),
  )
}

export async function enableBlocking(
  whitelist: string[] = [],
): Promise<void> {
  const whitelistRules = createWhitelistRules(whitelist)
  const filterRules = await createFilterRules()

  const oldFilterRuleIds = Array.from(
    { length: 900 },
    (_, index) => FILTER_RULE_ID_START + index,
  )

  const oldWhitelistRuleIds = Array.from(
    { length: 100 },
    (_, index) => WHITELIST_RULE_ID_START + index,
  )

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [
      ...blockingRules.map((rule) => rule.id),
      ...oldFilterRuleIds,
      ...oldWhitelistRuleIds,
    ],
    addRules: [
      ...blockingRules,
      ...filterRules,
      ...whitelistRules,
    ],
  })

  console.log(
    `D-Blockerz blocking enabled: ${
      blockingRules.length +
      filterRules.length +
      whitelistRules.length
    } rules`,
  )
}

export async function disableBlocking(): Promise<void> {
  const filterRuleIds = Array.from(
    { length: 900 },
    (_, index) => FILTER_RULE_ID_START + index,
  )

  const whitelistRuleIds = Array.from(
    { length: 100 },
    (_, index) => WHITELIST_RULE_ID_START + index,
  )

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [
      ...blockingRules.map((rule) => rule.id),
      ...filterRuleIds,
      ...whitelistRuleIds,
    ],
  })

  console.log('D-Blockerz blocking disabled')
}