type ToggleProps = {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-7 w-12 rounded-full transition ${
        enabled ? 'bg-blue-600' : 'bg-slate-600'
      }`}
      aria-label={enabled ? 'Disable protection' : 'Enable protection'}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
          enabled ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  )
}

export default Toggle