import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Hero from './pages/Hero.js'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Hero />}/>
        <Route path='/hero' element={<Hero />}/>

        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </>
  )
}

export default App