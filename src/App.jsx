import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import Manager from './components/manager'
import Footer from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Manager/>

    </>
  )
}

export default App
