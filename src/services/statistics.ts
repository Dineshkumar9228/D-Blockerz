import type { Statistics } from '../types/statistics'

const STATISTICS_KEY = 'statistics'

const DEFAULT_STATISTICS: Statistics = {
  adsBlocked: 0,
  trackersBlocked: 0,
  totalBlocked: 0,
  lastUpdated: Date.now(),
}

export async function getStatistics(): Promise<Statistics> {
  const result = await chrome.storage.local.get(STATISTICS_KEY)

  return (result[STATISTICS_KEY] as Statistics | undefined) ?? DEFAULT_STATISTICS
}

export async function saveStatistics(
  statistics: Statistics,
): Promise<void> {
  await chrome.storage.local.set({
    [STATISTICS_KEY]: statistics,
  })
}

export async function incrementAdsBlocked(): Promise<void> {
  const statistics = await getStatistics()

  await saveStatistics({
    ...statistics,
    adsBlocked: statistics.adsBlocked + 1,
    totalBlocked: statistics.totalBlocked + 1,
    lastUpdated: Date.now(),
  })
}

export async function incrementTrackersBlocked(): Promise<void> {
  const statistics = await getStatistics()

  await saveStatistics({
    ...statistics,
    trackersBlocked: statistics.trackersBlocked + 1,
    totalBlocked: statistics.totalBlocked + 1,
    lastUpdated: Date.now(),
  })
}

export async function resetStatistics(): Promise<void> {
  await saveStatistics({
    ...DEFAULT_STATISTICS,
    lastUpdated: Date.now(),
  })
}