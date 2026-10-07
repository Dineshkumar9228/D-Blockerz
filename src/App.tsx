import { useEffect, useState } from 'react'
import Popup from './pages/Popup'
import {
  addToWhitelist,
  getProtectionState,
  getWhitelist,
  removeFromWhitelist,
  setProtectionState,
} from './services/storage'
import { getCurrentDomain } from './services/chrome'

function App() {
  const [enabled, setEnabled] = useState(true)
  const [whitelist, setWhitelist] = useState<string[]>([])
  const [currentDomain, setCurrentDomain] =
    useState('Unknown')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [
          protectionState,
          domains,
          domain,
        ] = await Promise.all([
          getProtectionState(),
          getWhitelist(),
          getCurrentDomain(),
        ])

        setEnabled(protectionState)
        setWhitelist(domains)
        setCurrentDomain(domain)
      } catch (error) {
        console.error(
          'Failed to load D-Blockerz popup data:',
          error,
        )
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [])

  async function handleToggle(
    nextEnabled: boolean,
  ) {
    try {
      await setProtectionState(nextEnabled)
      setEnabled(nextEnabled)
    } catch (error) {
      console.error(
        'Failed to update protection state:',
        error,
      )
    }
  }

  async function handleAddWhitelist(
    domain: string,
  ) {
    try {
      await addToWhitelist(domain)
      setWhitelist(await getWhitelist())
    } catch (error) {
      console.error(
        'Failed to add whitelist domain:',
        error,
      )
    }
  }

  async function handleRemoveWhitelist(
    domain: string,
  ) {
    try {
      await removeFromWhitelist(domain)
      setWhitelist(await getWhitelist())
    } catch (error) {
      console.error(
        'Failed to remove whitelist domain:',
        error,
      )
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center p-6">
          <div className="rounded-2xl bg-slate-900 px-6 py-5 text-center">
            <p className="text-sm font-medium">
              Loading D-Blockerz...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Preparing protection settings
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <Popup
      enabled={enabled}
      onToggle={handleToggle}
      whitelist={whitelist}
      onAddWhitelist={handleAddWhitelist}
      onRemoveWhitelist={handleRemoveWhitelist}
      currentDomain={currentDomain}
    />
  )
}

export default App