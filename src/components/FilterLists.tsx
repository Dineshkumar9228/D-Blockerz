import { useEffect, useState } from 'react'
import {
  getFilterLists,
  updateFilterList,
} from '../services/filterLists'
import type { FilterList } from '../types/filterList'

export default function FilterLists() {
  const [filterLists, setFilterLists] = useState<FilterList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void getFilterLists().then((lists) => {
      setFilterLists(lists)
      setLoading(false)
    })
  }, [])

  async function handleToggle(
    filterList: FilterList,
  ) {
    const enabled = !filterList.enabled

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
  }

  if (loading) {
    return (
      <section className="mt-4 rounded-2xl bg-slate-900 p-4">
        <p className="text-sm text-slate-400">
          Loading filter lists...
        </p>
      </section>
    )
  }

  return (
    <section className="mt-4 rounded-2xl bg-slate-900 p-4">
      <div className="mb-4">
        <p className="text-sm font-medium text-white">
          Filter Lists
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Choose which protection lists are active.
        </p>
      </div>

      <div className="space-y-3">
        {filterLists.map((filterList) => (
          <div
            key={filterList.id}
            className="flex items-center justify-between gap-4 rounded-xl bg-slate-800 p-3"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">
                {filterList.name}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {filterList.description}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {filterList.entries.length} rules
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                void handleToggle(filterList)
              }}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium ${
                filterList.enabled
                  ? 'bg-green-600 text-white hover:bg-green-500'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {filterList.enabled
                ? 'Enabled'
                : 'Disabled'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}