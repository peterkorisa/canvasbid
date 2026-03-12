import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home'
function App() {

  return (
    <>
      
      <div className="pt-16"> {/* To avoid content hidden behind fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
    
        </Routes>
      </div>
    </>
  )
}

export default App
