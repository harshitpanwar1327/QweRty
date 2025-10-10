import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, QrCode, QrCode2, CreditCard, BarChart, AccountCircle, KeyboardArrowDown, Logout } from "@mui/icons-material"
import { motion, AnimatePresence } from 'framer-motion'
import Swal from 'sweetalert2'
import { auth } from '../util/Firebase.js'
import { signOut } from 'firebase/auth'

interface MenubarProps {
  heading: string;
}

const Menubar: React.FC<MenubarProps> = ({ heading }) => {
  const email = sessionStorage.getItem('email');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profileDropdown, setProfileDropdown] = useState<boolean>(false);

  const navigate = useNavigate();
  
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current && 
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will need to log in again to access your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signOut(auth);
          sessionStorage.clear();
          navigate("/hero");
          Swal.fire({
            title: "Logged out!",
            text: "You have been successfully logged out.",
            icon: "success",
          });
        } catch (error) {
          console.error("Logout error:", error);
          Swal.fire({
            title: "Error",
            text: "Something went wrong while logging out.",
            icon: "error",
          });
        }
      }
    });
  }

  return (
    <div className="w-full p-4 md:px-8 flex justify-between items-center gap-8 shadow-md bg-white rounded-md">
      <div className="flex items-center gap-2">
        <Menu className='lg:!hidden cursor-pointer' onClick={()=>setIsOpen(!isOpen)}/>
        <h2 className="font-semibold text-xl">{heading}</h2>
      </div>

      <div className="relative" ref={profileRef}>
        <div className="flex items-center gap-1 cursor-pointer group" onClick={()=>setProfileDropdown(!profileDropdown)}>
          <AccountCircle sx={{ fontSize: '32px' }} />
          <KeyboardArrowDown sx={{ fontSize: '24px', color: '#ec4899' }} className='group-hover:bg-pink-100 rounded' />
        </div>

        <AnimatePresence>
          {profileDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute bg-white right-0 mt-2 border border-gray-200 shadow-lg rounded-lg z-10 flex flex-col items-center gap-2 p-2"
            >
              <p className="p-3 border-b border-gray-100 text-sm text-gray-700 font-medium">{email}</p>
              <button className="py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-red-500 text-sm font-semibold" onClick={handleLogout}>
                <Logout sx={{ fontSize: '18px' }} /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
                {/* <NavLink to="/plans" className={({ isActive }) =>
                  `cursor-pointer w-full flex !text-gray-600 mx-auto p-3 rounded-lg transition duration-300 ease-in hover:!text-pink-500 ${isActive ? "!text-pink-500 bg-pink-100" : ""}`}>
                  <li className="flex items-center gap-2"><CreditCard /> Plans and Pricings</li>
                </NavLink> */}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menubar;