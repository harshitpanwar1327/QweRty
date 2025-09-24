import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Hero from './pages/main/Hero.js'
import Login from './pages/authentication/Login.js'
import Register from './pages/authentication/Register.js'
import ForgotPassword from './pages/authentication/ForgotPassword.js'
import Contact from './pages/main/Contact.js'
import Pricing from './pages/main/Pricing.js'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Hero />}/>
        <Route path='/hero' element={<Hero />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/pricing' element={<Pricing />}/>

        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>

        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </>
  )
}

export default App