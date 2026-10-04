import type { FilterList } from '../types/filterList'
import { createFilterRule } from './filterRuleBuilder'

const FILTER_RULE_START_ID = 100

export function generateFilterRules(
  filterLists: FilterList[],
): chrome.declarativeNetRequest.Rule[] {
  const rules: chrome.declarativeNetRequest.Rule[] = []

  let ruleId = FILTER_RULE_START_ID

  for (const filterList of filterLists) {
    if (!filterList.enabled) {
      continue
    }

    for (const entry of filterList.entries) {
      if (!entry.enabled) {
        continue
      }

      rules.push(createFilterRule(entry, ruleId))
      ruleId += 1
    }
  }

  return rules
}