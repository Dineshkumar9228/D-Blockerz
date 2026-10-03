type BlockRuleConfig = {
  id: number
  domain: string
  resourceTypes: string[]
}

function createBlockRule({
  id,
  domain,
  resourceTypes,
}: BlockRuleConfig): chrome.declarativeNetRequest.Rule {
  return {
    id,
    priority: 1,
    action: {
      type: 'block',
    },
    condition: {
      urlFilter: `||${domain}^`,
      resourceTypes,
    } as chrome.declarativeNetRequest.RuleCondition,
  }
}

function createAllowRule({
  id,
  domain,
  resourceTypes,
}: BlockRuleConfig): chrome.declarativeNetRequest.Rule {
  return {
    id,
    priority: 2,
    action: {
      type: 'allow',
    },
    condition: {
      urlFilter: `||${domain}^`,
      resourceTypes,
    } as chrome.declarativeNetRequest.RuleCondition,
  }
}

export const blockingRules: chrome.declarativeNetRequest.Rule[] = [
  createBlockRule({
    id: 1,
    domain: 'ads.example.com',
    resourceTypes: [
      'script',
      'image',
      'stylesheet',
      'xmlhttprequest',
    ],
  }),

  createBlockRule({
    id: 2,
    domain: 'tracker.example.com',
    resourceTypes: [
      'script',
      'image',
      'xmlhttprequest',
    ],
  }),

  createBlockRule({
    id: 3,
    domain: 'analytics.example.com',
    resourceTypes: [
      'script',
      'xmlhttprequest',
    ],
  }),

  createAllowRule({
    id: 4,
    domain: 'ads.example.com/allowed',
    resourceTypes: [
      'image',
    ],
  }),
]