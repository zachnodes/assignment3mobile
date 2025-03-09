import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import Deck from './components/Deck'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Deck/>
      
    </>
  )
}

export default App
