import type { FilterList } from '../types/filterList'
import { builtInFilterLists } from '../rules/filterLists'

const FILTER_LISTS_KEY = 'filterLists'

export async function getFilterLists(): Promise<FilterList[]> {
  const result = (await chrome.storage.local.get(FILTER_LISTS_KEY)) as Partial<{
    [FILTER_LISTS_KEY]: FilterList[]
  }>

  return result[FILTER_LISTS_KEY] ?? builtInFilterLists
}

export async function saveFilterLists(
  filterLists: FilterList[],
): Promise<void> {
  await chrome.storage.local.set({
    [FILTER_LISTS_KEY]: filterLists,
  })
}

export async function initializeFilterLists(): Promise<void> {
  const existing = (await chrome.storage.local.get(FILTER_LISTS_KEY)) as Partial<{
    [FILTER_LISTS_KEY]: FilterList[]
  }>

  if (existing[FILTER_LISTS_KEY]) {
    return
  }

  await saveFilterLists(builtInFilterLists)

  console.log(
    `D-Blockerz filter lists initialized: ${builtInFilterLists.length} lists`,
  )
}

export async function updateFilterList(
  filterListId: string,
  enabled: boolean,
): Promise<void> {
  const filterLists = await getFilterLists()

  const updatedFilterLists = filterLists.map((filterList) =>
    filterList.id === filterListId
      ? {
          ...filterList,
          enabled,
        }
      : filterList,
  )

  await saveFilterLists(updatedFilterLists)
}
export async function getEnabledFilterLists(): Promise<FilterList[]> {
  const filterLists = await getFilterLists()

  return filterLists.filter(
    (filterList) => filterList.enabled,
  )
}