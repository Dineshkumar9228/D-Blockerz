type ToggleProps = {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={
        enabled
          ? 'Disable protection'
          : 'Enable protection'
      }
      onClick={() => onChange(!enabled)}
      className={`relative h-7 w-12 shrink-0 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
        enabled ? 'bg-blue-600' : 'bg-slate-700'
      }`}
    >
      <span
        className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
          enabled
            ? 'translate-x-5'
            : 'translate-x-0'
        }`}
      />
    </button>
  )
}

export default Toggle
