import { useEffect, useState } from 'react'
import Popup from './pages/Popup'
import {
  getProtectionState,
  setProtectionState,
} from './services/storage'
import {
  enableBlocking,
  disableBlocking,
} from './services/blocking'

function App() {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    async function loadProtectionState() {
      const storedState = await getProtectionState()
      setEnabled(storedState)
    }

    loadProtectionState()
  }, [])

  async function handleToggle(nextState: boolean) {
    setEnabled(nextState)
    await setProtectionState(nextState)

    if (nextState) {
      await enableBlocking()
    } else {
      await disableBlocking()
    }
  }

  return (
    <Popup
      enabled={enabled}
      onToggle={handleToggle}
    />
  )
}

export default App