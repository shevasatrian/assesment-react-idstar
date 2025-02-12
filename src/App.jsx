// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import MagicLink from './pages/MagicLink'
import Inventory from './pages/Inventory'
import COGS from './pages/COGS'
import { InventoryProvider } from './context/InventoryContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
        <AuthProvider>
          <InventoryProvider>
          <Routes>
              <Route path='/' element={<Home />} />

              <Route path='/login' element={<Login />} />

              <Route path='/magic-link' element={<MagicLink />} />

              <Route path='/inventory' element={<Inventory />} />

              <Route path='/cogs' element={<COGS />} />
            </Routes>
          </InventoryProvider>
        </AuthProvider>
        
          
        </BrowserRouter>

      {/* <h2>hello world</h2> */}
    </>
  )
}

export default App
