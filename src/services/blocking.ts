import { blockingRules } from '../rules/blockingRules'
import { generateFilterRules } from '../rules/generateFilterRules'
import { getEnabledFilterLists } from './filterLists'

const FILTER_RULE_ID_START = 100
const FILTER_RULE_ID_END = 1000

const WHITELIST_RULE_ID_START = FILTER_RULE_ID_END

const MAX_DYNAMIC_RULES = 5000
const MAX_FILTER_RULES =
  FILTER_RULE_ID_END - FILTER_RULE_ID_START
const MAX_WHITELIST_RULES = 1000

let blockingUpdatePromise: Promise<void> | null = null

function isValidDomain(domain: string): boolean {
  const normalizedDomain = domain.trim().toLowerCase()

  if (!normalizedDomain) {
    return false
  }

  if (
    normalizedDomain.includes('://') ||
    normalizedDomain.includes('/') ||
    normalizedDomain.includes(' ') ||
    normalizedDomain.includes(':')
  ) {
    return false
  }

  if (
    normalizedDomain.startsWith('.') ||
    normalizedDomain.endsWith('.') ||
    normalizedDomain.includes('..')
  ) {
    return false
  }

  const labels = normalizedDomain.split('.')

  if (labels.length < 2) {
    return false
  }

  return labels.every((label) => {
    if (!label || label.length > 63) {
      return false
    }

    if (
      label.startsWith('-') ||
      label.endsWith('-')
    ) {
      return false
    }

    return /^[a-z0-9-]+$/.test(label)
  })
}

function normalizeDomains(
  domains: string[],
): string[] {
  return [
    ...new Set(
      domains
        .filter(
          (domain): domain is string =>
            typeof domain === 'string',
        )
        .map((domain) =>
          domain.trim().toLowerCase(),
        )
        .filter(isValidDomain),
    ),
  ]
}

function createWhitelistRules(
  whitelist: string[],
): chrome.declarativeNetRequest.Rule[] {
  const validDomains = normalizeDomains(whitelist)

  if (validDomains.length > MAX_WHITELIST_RULES) {
    throw new Error(
      `D-Blockerz whitelist exceeds the maximum of ${MAX_WHITELIST_RULES} domains`,
    )
  }

  return validDomains.map((domain, index) => ({
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

  const generatedRules = generateFilterRules(
    filterLists,
  )

  if (generatedRules.length > MAX_FILTER_RULES) {
    throw new Error(
      `D-Blockerz generated too many filter rules: ${generatedRules.length}`,
    )
  }

  return generatedRules.map(
    (rule, index) => ({
      ...rule,
      id: FILTER_RULE_ID_START + index,
    }),
  )
}

async function getManagedRuleIds(): Promise<number[]> {
  const dynamicRules =
    await chrome.declarativeNetRequest.getDynamicRules()

  const blockingRuleIds = new Set(
    blockingRules.map((rule) => rule.id),
  )

  return dynamicRules
    .filter((rule) => {
      if (blockingRuleIds.has(rule.id)) {
        return true
      }

      if (
        rule.id >= FILTER_RULE_ID_START &&
        rule.id < FILTER_RULE_ID_END
      ) {
        return true
      }

      if (rule.id >= WHITELIST_RULE_ID_START) {
        return true
      }

      return false
    })
    .map((rule) => rule.id)
}

async function updateBlockingRules(
  whitelist: string[],
): Promise<void> {
  const whitelistRules =
    createWhitelistRules(whitelist)

  const filterRules =
    await createFilterRules()

  const totalRules =
    blockingRules.length +
    filterRules.length +
    whitelistRules.length

  if (totalRules > MAX_DYNAMIC_RULES) {
    throw new Error(
      `D-Blockerz would exceed the dynamic rule limit: ${totalRules}`,
    )
  }

  const oldRuleIds =
    await getManagedRuleIds()

  await chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: oldRuleIds,
      addRules: [
        ...blockingRules,
        ...filterRules,
        ...whitelistRules,
      ],
    },
  )

  console.log(
    `D-Blockerz blocking enabled: ${totalRules} rules`,
  )
}

export async function enableBlocking(
  whitelist: string[] = [],
): Promise<void> {
  if (blockingUpdatePromise) {
    await blockingUpdatePromise
  }

  blockingUpdatePromise =
    updateBlockingRules(whitelist)

  try {
    await blockingUpdatePromise
  } finally {
    blockingUpdatePromise = null
  }
}

export async function disableBlocking(): Promise<void> {
  if (blockingUpdatePromise) {
    await blockingUpdatePromise
  }

  const ruleIds =
    await getManagedRuleIds()

  await chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: ruleIds,
    },
  )

  console.log(
    'D-Blockerz blocking disabled',
  )
}