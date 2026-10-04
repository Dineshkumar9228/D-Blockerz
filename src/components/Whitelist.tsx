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
    <section className="mt-4 rounded-2xl bg-slate-900 p-4">
      <h2 className="text-lg font-semibold">
        Whitelist
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Sites that D-Blockerz will not block.
      </p>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault()

          const form = event.currentTarget
          const input = form.elements.namedItem(
            'domain',
          ) as HTMLInputElement

          const domain = input.value.trim().toLowerCase()

          if (!domain) return

          onAdd(domain)
          input.value = ''
        }}
      >
        <input
          name="domain"
          type="text"
          placeholder="example.com"
          className="min-w-0 flex-1 rounded-xl bg-slate-800 px-3 py-2 text-sm outline-none"
        />

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
        >
          Add
        </button>
      </form>

      {domains.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          No whitelisted sites.
        </p>
      ) : (
        <div className="mt-4 space-y-2">
          {domains.map((domain) => (
            <div
              key={domain}
              className="flex items-center justify-between rounded-xl bg-slate-800 p-3"
            >
              <span className="text-sm">
                {domain}
              </span>

              <button
                type="button"
                onClick={() => onRemove(domain)}
                className="text-sm text-red-400 hover:text-red-300"
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