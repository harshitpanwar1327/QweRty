import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Hero from './pages/main/Hero.js'
import Login from './pages/authentication/Login.js'
import Register from './pages/authentication/Register.js'
import ForgotPassword from './pages/authentication/ForgotPassword.js'
import Contact from './pages/main/Contact.js'
import Pricing from './pages/main/Pricing.js'
import PrivacyPolicy from './pages/main/PrivacyPolicy.js'
import TandC from './pages/main/TandC.js'
import FAQ from './pages/main/FAQ.js'
import MyQRs from './pages/portal/MyQRs.js'
import NewQR from './pages/portal/NewQR.js'
import Plans from './pages/portal/Plans.js'
import Stats from './pages/portal/Stats.js'
import EditQR from './pages/portal/EditQR.js'
import ProtectedRoutes from './components/ProtectedRoutes.js'
import ConfigPauseQR from './pages/qr/ConfigPauseQR.js'
import ConfigTimeSchedule from './pages/qr/ConfigTimeSchedule.js'
import ConfigScanLimit from './pages/qr/ConfigScanLimit.js'
import ConfigPassword from './pages/qr/ConfigPassword.js'
import SocialMedia from './pages/qr/SocialMedia.js'
import Apps from './pages/qr/Apps.js'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Hero />}/>
        <Route path='/hero' element={<Hero />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/pricing' element={<Pricing />}/>
        <Route path='/t&c' element={<TandC />}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy />}/>
        <Route path='/faq' element={<FAQ />}/>

        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>

        <Route path='/config/pauseQR' element={<ConfigPauseQR />}/>
        <Route path='/config/timeSchedule' element={<ConfigTimeSchedule />}/>
        <Route path='/config/scanLimit' element={<ConfigScanLimit />}/>
        <Route path='/config/password/:id' element={<ConfigPassword />}/>
        <Route path='/social/:id' element={<SocialMedia />} />
        <Route path='/apps/:id' element={<Apps />} />

        <Route element={<ProtectedRoutes/>}>
          <Route path='/my-qr' element={<MyQRs />}/>
          <Route path='/new-qr' element={<NewQR />}/>
          <Route path='/plans' element={<Plans />}/>
          <Route path='/stats' element={<Stats />}/>
          <Route path='/edit-qr/:id' element={<EditQR />}/>
        </Route>

        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </>
  )
}

export default App