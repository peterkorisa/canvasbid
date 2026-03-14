import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home'
import Contact from './page/Contactus';
import LoginForm from './page/Login';
import RegisterForm from './page/Register';
import Artworks from './page/Artworks';
import Productpage from './page/Product_page';
function App() {

  return (
    <>
      
      <div className="pt-16"> {/* To avoid content hidden behind fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/artworks" element={<Artworks />} />
                    <Route path="/p" element={<Productpage />} />

          
    
        </Routes>
      </div>
    </>
  )
}

export default App
