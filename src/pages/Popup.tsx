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
  const [resetting, setResetting] = useState(false)

  const isValidCurrentDomain =
    currentDomain !== 'Unknown' &&
    currentDomain !== 'Browser page'

  const isWhitelisted =
    whitelist.includes(currentDomain)

  useEffect(() => {
    void getStatistics().then((data) => {
      setStatistics(data)
    })
  }, [])

  async function handleResetStatistics() {
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

  function handleSiteProtection() {
    if (!isValidCurrentDomain) {
      return
    }

    if (isWhitelisted) {
      onRemoveWhitelist(currentDomain)
    } else {
      onAddWhitelist(currentDomain)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col p-5">
        <Header enabled={enabled} />

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    enabled
                      ? 'bg-green-400'
                      : 'bg-slate-500'
                  }`}
                />

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Protection
                </p>
              </div>

              <p className="mt-2 text-base font-semibold">
                {enabled
                  ? 'Protection is active'
                  : 'Protection is disabled'}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {enabled
                  ? 'Ads and trackers are being blocked.'
                  : 'Network protection is currently paused.'}
              </p>
            </div>

            <Toggle
              enabled={enabled}
              onChange={onToggle}
            />
          </div>
        </section>

        <section className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Today
            </p>

            <button
              type="button"
              onClick={handleResetStatistics}
              disabled={resetting}
              className="text-xs font-medium text-slate-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resetting ? 'Resetting...' : 'Reset'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
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
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Current website
              </p>

              <p className="mt-2 truncate text-sm font-medium text-white">
                {currentDomain}
              </p>
            </div>

            {isValidCurrentDomain && (
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  isWhitelisted
                    ? 'bg-yellow-400/10 text-yellow-400'
                    : 'bg-green-400/10 text-green-400'
                }`}
              >
                {isWhitelisted
                  ? 'Paused'
                  : 'Protected'}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleSiteProtection}
            disabled={!isValidCurrentDomain}
            className={`mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
              !isValidCurrentDomain
                ? 'cursor-not-allowed bg-slate-800 text-slate-500'
                : isWhitelisted
                  ? 'bg-slate-700 text-white hover:bg-slate-600'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {!isValidCurrentDomain
              ? 'Website unavailable'
              : isWhitelisted
                ? 'Resume protection'
                : 'Pause protection'}
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