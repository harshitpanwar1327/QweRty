import { NavLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { motion, AnimatePresence } from "motion/react"

const Header = () => {
  const isAuthenticated: boolean = sessionStorage.getItem('isAuthenticated')==='true';
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200 flex items-center gap-8 py-4 px-4 md:px-8">
      <div className="flex items-center gap-2">
        <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
        <p className="font-bold text-2xl text-black">QweRty</p>
      </div>

      <div className='hidden lg:flex items-center gap-4'>
        <NavLink to={'/new-qr'} className='!text-black'>QR Generator</NavLink>
        <NavLink to={'/pricing'} className='!text-black'>Plans and Pricings</NavLink>
        <NavLink to={'/contact'} className='!text-black'>Contact</NavLink>
        <NavLink to={'/faq'} className='!text-black'>FAQ</NavLink>
      </div>

      {!isAuthenticated ? (
        <div className="ml-auto hidden lg:flex items-center gap-2">
          <NavLink to="/login"><button className="px-6 py-2 border border-gray-300 rounded-full text-blue-600 hover:bg-gray-100 transition duration-300 hover:scale-102">Log In</button></NavLink>
          <NavLink to="/register"><button className="hidden md:block px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 hover:scale-102">Register</button></NavLink>
        </div>
      ) : (
        <button className="hidden lg:block ml-auto px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 hover:scale-102">Logout</button>
      )}

      <MenuIcon className='ml-auto lg:!hidden cursor-pointer' onClick={()=>setOpenNav(!openNav)}/>

      <AnimatePresence>
        {openNav && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-8 p-8 fixed top-0 left-0 text-black bg-white w-full z-50 shadow-md"
          >
            <div className="flex justify-between items-center w-full border-b border-gray-300 pb-4">
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
                <p className="font-bold text-2xl text-black">QweRty</p>
              </div>
              <CloseIcon className="cursor-pointer" onClick={()=>setOpenNav(false)}/>
            </div>

            <NavLink to={'/new-qr'} className='!text-black'>QR Generator</NavLink>
            <NavLink to={'/pricing'} className='!text-black'>Plans and Pricings</NavLink>
            <NavLink to={'/contact'} className='!text-black'>Contact</NavLink>
            <NavLink to={'/faq'} className='!text-black'>FAQ</NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header