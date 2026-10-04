import type { FilterEntry } from '../types/filterList'

const RESOURCE_TYPES = [
  'script',
  'image',
  'stylesheet',
  'xmlhttprequest',
  'media',
  'font',
] as chrome.declarativeNetRequest.ResourceType[]

export function createFilterRule(
  entry: FilterEntry,
  ruleId: number,
): chrome.declarativeNetRequest.Rule {
  return {
    id: ruleId,
    priority: 1,
    action: {
      type: 'block',
    },
    condition: {
      urlFilter: `||${entry.domain}^`,
      resourceTypes: RESOURCE_TYPES,
    },
  }
}