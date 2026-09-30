import Header from '../components/Header'
import Toggle from '../components/Toggle'
import StatCard from '../components/StatCard'

type PopupProps = {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

function Popup({ enabled, onToggle }: PopupProps) {
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
                {enabled ? 'Protection is active' : 'Protection is disabled'}
              </p>
            </div>

            <Toggle
              enabled={enabled}
              onChange={onToggle}
            />
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-4">
          <StatCard
            label="Ads blocked"
            value={0}
          />

          <StatCard
            label="Trackers"
            value={0}
          />
        </section>

        <section className="mt-4 rounded-2xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Current website
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span>
              example.com
            </span>

            <span className="text-sm text-green-400">
              Protected
            </span>
          </div>
        </section>

      </div>
    </main>
  )
}

export default Popup