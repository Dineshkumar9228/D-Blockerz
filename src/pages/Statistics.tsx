import { useEffect, useState } from 'react'
import {
  getStatistics,
  resetStatistics,
} from '../services/statistics'
import type { Statistics as StatisticsData } from '../types/statistics'

export default function Statistics() {
  const [statistics, setStatistics] =
    useState<StatisticsData | null>(null)

  useEffect(() => {
    void getStatistics().then((data) => {
      setStatistics(data)
    })
  }, [])

  async function handleReset() {
    await resetStatistics()

    const data = await getStatistics()
    setStatistics(data)
  }

  if (!statistics) {
    return (
      <div className="grid grid-cols-3 gap-3">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-2xl font-bold">
            {statistics.adsBlocked}
          </p>

          <p className="text-xs text-gray-500">
            Ads Blocked
          </p>
        </div>

        <div>
          <p className="text-2xl font-bold">
            {statistics.trackersBlocked}
          </p>

          <p className="text-xs text-gray-500">
            Trackers Blocked
          </p>
        </div>

        <div>
          <p className="text-2xl font-bold">
            {statistics.totalBlocked}
          </p>

          <p className="text-xs text-gray-500">
            Total Blocked
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="mt-4 w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700"
      >
        Reset Statistics
      </button>
    </div>
  )
}