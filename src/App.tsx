import { useEffect, useState } from 'react'
import Popup from './pages/Popup'
import {
  addToWhitelist,
  getWhitelist,
  removeFromWhitelist,
} from './services/storage'
import { getCurrentDomain } from './services/chrome'

function App() {
  const [enabled, setEnabled] = useState(true)
  const [whitelist, setWhitelist] = useState<string[]>([])
  const [currentDomain, setCurrentDomain] = useState('Unknown')

  useEffect(() => {
    async function loadData() {
      const domains = await getWhitelist()
      const domain = await getCurrentDomain()

      setWhitelist(domains)
      setCurrentDomain(domain)
    }

    loadData()
  }, [])

  async function handleAddWhitelist(domain: string) {
    await addToWhitelist(domain)
    setWhitelist(await getWhitelist())
  }

  async function handleRemoveWhitelist(domain: string) {
    await removeFromWhitelist(domain)
    setWhitelist(await getWhitelist())
  }

  return (
    <Popup
      enabled={enabled}
      onToggle={setEnabled}
      whitelist={whitelist}
      onAddWhitelist={handleAddWhitelist}
      onRemoveWhitelist={handleRemoveWhitelist}
      currentDomain={currentDomain}
    />
  )
}

export default App