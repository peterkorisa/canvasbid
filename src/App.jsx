
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home'
import Contact from './page/Contactus';
import LoginForm from './page/Login';
import RegisterForm from './page/Register';
function App() {

  return (
    <>
      
      <div className=""> {/* To avoid content hidden behind fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
    
        </Routes>
      </div>
    </>
  )
}

export default App
