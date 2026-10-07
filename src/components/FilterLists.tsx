import { useEffect, useState } from 'react'
import {
  getFilterLists,
  updateFilterList,
} from '../services/filterLists'
import type { FilterList } from '../types/filterList'

export default function FilterLists() {
  const [filterLists, setFilterLists] = useState<FilterList[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFilterLists() {
      try {
        const lists = await getFilterLists()
        setFilterLists(lists)
      } catch (loadError) {
        console.error(
          'Failed to load filter lists:',
          loadError,
        )

        setError('Unable to load filter lists.')
      } finally {
        setLoading(false)
      }
    }

    void loadFilterLists()
  }, [])

  async function handleToggle(
    filterList: FilterList,
  ) {
    if (updatingId) {
      return
    }

    const enabled = !filterList.enabled

    setUpdatingId(filterList.id)
    setError(null)

    try {
      await updateFilterList(
        filterList.id,
        enabled,
      )

      setFilterLists((current) =>
        current.map((list) =>
          list.id === filterList.id
            ? {
                ...list,
                enabled,
              }
            : list,
        ),
      )
    } catch (updateError) {
      console.error(
        'Failed to update filter list:',
        updateError,
      )

      setError('Unable to update filter list.')
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) {
    return (
      <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="animate-pulse">
          <div className="h-4 w-24 rounded bg-slate-800" />
          <div className="mt-2 h-3 w-48 rounded bg-slate-800" />
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Loading filter lists...
        </p>
      </section>
    )
  }

  return (
    <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">
            Filter Lists
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Choose which protection lists are active.
          </p>
        </div>

        <span className="rounded-full bg-blue-400/10 px-2.5 py-1 text-[11px] font-medium text-blue-400">
          {filterLists.filter(
            (list) => list.enabled,
          ).length}{' '}
          active
        </span>
      </div>

      {error && (
        <div className="mb-3 rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2">
          <p className="text-xs text-red-400">
            {error}
          </p>
        </div>
      )}

      <div className="space-y-2">
        {filterLists.map((filterList) => {
          const updating =
            updatingId === filterList.id

          return (
            <div
              key={filterList.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-800/60 p-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">
                  {filterList.name}
                </p>

                <p className="mt-1 text-xs leading-4 text-slate-500">
                  {filterList.description}
                </p>

                <p className="mt-1.5 text-[11px] text-slate-600">
                  {filterList.entries.length}{' '}
                  rules
                </p>
              </div>

              <button
                type="button"
                disabled={updating}
                onClick={() => {
                  void handleToggle(filterList)
                }}
                className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  filterList.enabled
                    ? 'bg-green-400/10 text-green-400 hover:bg-green-400/20'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {updating
                  ? 'Saving...'
                  : filterList.enabled
                    ? 'Enabled'
                    : 'Disabled'}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
