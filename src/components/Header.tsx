type HeaderProps = {
  enabled: boolean
}

function Header({ enabled }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          D-Blockerz
        </h1>

        <p className="text-sm text-slate-400">
          Ad & Tracker Protection
        </p>
      </div>

      <div
        className={`rounded-full px-3 py-1 text-sm font-medium ${
          enabled
            ? 'bg-green-500/20 text-green-400'
            : 'bg-red-500/20 text-red-400'
        }`}
      >
        {enabled ? 'ON' : 'OFF'}
      </div>
    </header>
  )
}

export default Header