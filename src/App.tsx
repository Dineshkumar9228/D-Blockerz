import { useState } from 'react'
import Popup from './pages/Popup'

function App() {
  const [enabled, setEnabled] = useState(true)

  return (
    <Popup
      enabled={enabled}
      onToggle={setEnabled}
    />
  )
}

export default App