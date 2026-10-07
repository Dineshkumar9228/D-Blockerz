type HeaderProps = {
  enabled: boolean
}

function Header({ enabled }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/15 text-sm font-bold text-blue-400">
            D
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-white">
              D-Blockerz
            </h1>

            <p className="text-xs text-slate-500">
              Ad & Tracker Protection
            </p>
          </div>
        </div>
      </div>

      <div
        className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${
          enabled
            ? 'border-green-400/20 bg-green-400/10 text-green-400'
            : 'border-slate-700 bg-slate-800 text-slate-400'
        }`}
      >
        <span className="mr-1.5">?</span>
        {enabled ? 'ON' : 'OFF'}
      </div>
    </header>
  )
}

export default Header
