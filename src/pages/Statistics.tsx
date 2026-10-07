import { useEffect, useState } from 'react'
import {
  getStatistics,
  resetStatistics,
} from '../services/statistics'
import type { Statistics as StatisticsData } from '../types/statistics'

export default function Statistics() {
  const [statistics, setStatistics] =
    useState<StatisticsData | null>(null)

  const [resetting, setResetting] =
    useState(false)

  useEffect(() => {
    void getStatistics().then((data) => {
      setStatistics(data)
    })
  }, [])

  async function handleReset() {
    if (resetting) {
      return
    }

    setResetting(true)

    try {
      await resetStatistics()

      const data = await getStatistics()
      setStatistics(data)
    } finally {
      setResetting(false)
    }
  }

  if (!statistics) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-sm text-slate-400">
          Loading statistics...
        </p>
      </div>
    )
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-4">
        <p className="text-sm font-semibold text-white">
          Statistics
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Live blocked-request counting is currently
          unavailable in production builds.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-slate-800/60 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Ads
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            {statistics.adsBlocked}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800/60 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Trackers
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            {statistics.trackersBlocked}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800/60 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Total
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            {statistics.totalBlocked}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleReset}
        disabled={resetting}
        className="mt-4 w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {resetting ? 'Resetting...' : 'Reset Statistics'}
      </button>
    </section>
  )
}
