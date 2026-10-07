import type {
  FilterEntry,
  FilterList,
} from '../types/filterList'
import { builtInFilterLists } from '../rules/filterLists'

const FILTER_LISTS_KEY = 'filterLists'

const VALID_ENTRY_TYPES = new Set([
  'ad',
  'tracker',
  'analytics',
])

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

function isValidFilterEntry(
  entry: unknown,
): entry is FilterEntry {
  if (
    typeof entry !== 'object' ||
    entry === null
  ) {
    return false
  }

  const candidate = entry as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.domain === 'string' &&
    typeof candidate.type === 'string' &&
    typeof candidate.enabled === 'boolean' &&
    VALID_ENTRY_TYPES.has(candidate.type) &&
    isValidDomain(candidate.domain)
  )
}

function normalizeFilterLists(
  filterLists: unknown,
): FilterList[] {
  if (!Array.isArray(filterLists)) {
    return builtInFilterLists
  }

  return filterLists
    .filter(
      (filterList): filterList is FilterList =>
        typeof filterList === 'object' &&
        filterList !== null &&
        typeof filterList.id === 'string' &&
        typeof filterList.name === 'string' &&
        typeof filterList.description === 'string' &&
        typeof filterList.enabled === 'boolean' &&
        Array.isArray(filterList.entries),
    )
    .map((filterList) => ({
      ...filterList,
      entries: filterList.entries
        .filter(isValidFilterEntry)
        .map((entry) => ({
          ...entry,
          domain: entry.domain
            .trim()
            .toLowerCase(),
        })),
    }))
}

export async function getFilterLists(): Promise<FilterList[]> {
  const result = await chrome.storage.local.get(
    FILTER_LISTS_KEY,
  )

  return normalizeFilterLists(
    result[FILTER_LISTS_KEY],
  )
}

export async function saveFilterLists(
  filterLists: FilterList[],
): Promise<void> {
  await chrome.storage.local.set({
    [FILTER_LISTS_KEY]:
      normalizeFilterLists(filterLists),
  })
}

export async function initializeFilterLists(): Promise<void> {
  const existing = await chrome.storage.local.get(
    FILTER_LISTS_KEY,
  )

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

  const updatedFilterLists = filterLists.map(
    (filterList) =>
      filterList.id === filterListId
        ? {
            ...filterList,
            enabled,
          }
        : filterList,
  )

  await saveFilterLists(updatedFilterLists)
}

export async function getEnabledFilterLists(): Promise<
  FilterList[]
> {
  const filterLists = await getFilterLists()

  return filterLists.filter(
    (filterList) => filterList.enabled,
  )
}
