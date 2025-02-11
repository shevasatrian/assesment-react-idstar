// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import MagicLink from './pages/MagicLink'
import Inventory from './pages/Inventory'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <Home />
            } />

            <Route path='/login' element={
              <Login />
            } />

            <Route path='/magic-link' element={
              <MagicLink />
             } />

            <Route path='/inventory' element={<Inventory />} />
          </Routes>
        </BrowserRouter>

      {/* <h2>hello world</h2> */}
    </>
  )
}

export default App
