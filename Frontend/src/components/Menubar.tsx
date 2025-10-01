import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { QrCode, QrCode2, CreditCard, BarChart } from "@mui/icons-material"
import { motion, AnimatePresence } from 'framer-motion'

interface MenubarProps {
  heading: string;
}

const Menubar: React.FC<MenubarProps> = ({ heading }) => {
  const email = sessionStorage.getItem('email');

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full p-4 md:px-8 flex justify-between items-center gap-8 shadow-md bg-white rounded-md">
      <div className="flex items-center gap-2">
        <MenuIcon className='lg:!hidden cursor-pointer' onClick={()=>setIsOpen(!isOpen)}/>
        <h2 className="font-semibold text-xl">{heading}</h2>
      </div>

      <div className="flex items-center gap-2">
        <h3 className="text-sm hidden md:block">{email}</h3>
        <AccountCircleIcon sx={{fontSize: '32px'}}/>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 h-screen min-w-[260px] bg-white shadow-lg z-50 flex flex-col gap-8 p-4 rounded-r-lg"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <NavLink className="flex items-center gap-2" to={'/hero'}>
                  <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
                  <p className="font-bold text-2xl text-black">QweRty</p>
                </NavLink>
              </div>

              <ul className="flex flex-col gap-2">
                <NavLink to="/new-qr" className={({ isActive }) =>
                  `cursor-pointer w-full flex !text-gray-600 mx-auto p-3 rounded-lg transition duration-300 ease-in hover:!text-pink-500 ${isActive ? "!text-pink-500 bg-pink-100" : ""}`}>
                  <li className="flex items-center gap-2"><QrCode2 /> New QR</li>
                </NavLink>
                <NavLink to="/my-qr" className={({ isActive }) =>
                  `cursor-pointer w-full flex !text-gray-600 mx-auto p-3 rounded-lg transition duration-300 ease-in hover:!text-pink-500 ${isActive ? "!text-pink-500 bg-pink-100" : ""}`}>
                  <li className="flex items-center gap-2"><QrCode /> My QR codes</li>
                </NavLink>
                <NavLink to="/stats" className={({ isActive }) =>
                  `cursor-pointer w-full flex !text-gray-600 mx-auto p-3 rounded-lg transition duration-300 ease-in hover:!text-pink-500 ${isActive ? "!text-pink-500 bg-pink-100" : ""}`}>
                  <li className="flex items-center gap-2"><BarChart /> Stats</li>
                </NavLink>
                <NavLink to="/plans" className={({ isActive }) =>
                  `cursor-pointer w-full flex !text-gray-600 mx-auto p-3 rounded-lg transition duration-300 ease-in hover:!text-pink-500 ${isActive ? "!text-pink-500 bg-pink-100" : ""}`}>
                  <li className="flex items-center gap-2"><CreditCard /> Plans and Pricings</li>
                </NavLink>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menubar;