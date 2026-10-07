type WhitelistProps = {
  domains: string[]
  onAdd: (domain: string) => void
  onRemove: (domain: string) => void
}

function Whitelist({
  domains,
  onAdd,
  onRemove,
}: WhitelistProps) {
  return (
    <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Whitelist
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Sites where blocking is paused.
          </p>
        </div>

        {domains.length > 0 && (
          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-400">
            {domains.length}
          </span>
        )}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault()

          const form = event.currentTarget
          const input = form.elements.namedItem(
            'domain',
          ) as HTMLInputElement

          const domain = input.value
            .trim()
            .toLowerCase()

          if (!domain) {
            return
          }

          onAdd(domain)
          input.value = ''
        }}
      >
        <input
          name="domain"
          type="text"
          placeholder="example.com"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          Add
        </button>
      </form>

      {domains.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-800 px-4 py-5 text-center">
          <p className="text-xs text-slate-500">
            No whitelisted sites yet.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {domains.map((domain) => (
            <div
              key={domain}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-800/60 p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {domain}
                </p>

                <p className="mt-0.5 text-[11px] text-yellow-400">
                  Protection paused
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRemove(domain)}
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-red-400/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/30"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Whitelist
