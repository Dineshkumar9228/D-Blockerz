import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Toggle from '../components/Toggle'
import StatCard from '../components/StatCard'
import Whitelist from '../components/Whitelist'
import FilterLists from '../components/FilterLists'
import {
  getStatistics,
  resetStatistics,
} from '../services/statistics'
import type { Statistics } from '../types/statistics'

type PopupProps = {
  enabled: boolean
  onToggle: (enabled: boolean) => void
  whitelist: string[]
  onAddWhitelist: (domain: string) => void
  onRemoveWhitelist: (domain: string) => void
  currentDomain: string
}

function Popup({
  enabled,
  onToggle,
  whitelist,
  onAddWhitelist,
  onRemoveWhitelist,
  currentDomain,
}: PopupProps) {
  const [statistics, setStatistics] =
    useState<Statistics | null>(null)

  const isWhitelisted = whitelist.includes(currentDomain)

  useEffect(() => {
    void getStatistics().then((data) => {
      setStatistics(data)
    })
  }, [])

  async function handleResetStatistics() {
    await resetStatistics()

    const data = await getStatistics()
    setStatistics(data)
  }

  function handleSiteProtection() {
    if (isWhitelisted) {
      onRemoveWhitelist(currentDomain)
    } else {
      onAddWhitelist(currentDomain)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col p-6">
        <Header enabled={enabled} />

        <section className="mt-8 rounded-2xl bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Protection
              </p>

              <p className="mt-1 font-medium">
                {enabled
                  ? 'Protection is active'
                  : 'Protection is disabled'}
              </p>
            </div>

            <Toggle
              enabled={enabled}
              onChange={onToggle}
            />
          </div>
        </section>

        <section className="mt-4 grid grid-cols-3 gap-3">
          <StatCard
            label="Ads blocked"
            value={statistics?.adsBlocked ?? 0}
          />

          <StatCard
            label="Trackers"
            value={statistics?.trackersBlocked ?? 0}
          />

          <StatCard
            label="Total blocked"
            value={statistics?.totalBlocked ?? 0}
          />
        </section>

        <button
          type="button"
          onClick={handleResetStatistics}
          className="mt-4 w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700"
        >
          Reset Statistics
        </button>

        <section className="mt-4 rounded-2xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Current website
          </p>

          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="truncate">
              {currentDomain}
            </span>

            <span
              className={`text-sm ${
                isWhitelisted
                  ? 'text-yellow-400'
                  : 'text-green-400'
              }`}
            >
              {isWhitelisted ? 'Paused' : 'Protected'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSiteProtection}
            className={`mt-4 w-full rounded-xl px-4 py-3 text-sm font-medium ${
              isWhitelisted
                ? 'bg-slate-700 text-white hover:bg-slate-600'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {isWhitelisted
              ? 'Resume protection on this site'
              : 'Pause protection on this site'}
          </button>
        </section>

        <Whitelist
          domains={whitelist}
          onAdd={onAddWhitelist}
          onRemove={onRemoveWhitelist}
        />

        <FilterLists />
      </div>
    </main>
  )
}

export default Popup