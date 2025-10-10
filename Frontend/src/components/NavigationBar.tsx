import { NavLink } from 'react-router-dom'
import { QrCode, QrCode2, CreditCard, BarChart } from "@mui/icons-material"

const NavigationBar = () => {
  return (
    <div className="h-screen min-w-[260px] hidden lg:flex flex-col gap-8 p-4 shadow-lg bg-white rounded-r-lg">
      <NavLink className="flex items-center gap-2 py-2" to={'/hero'}>
        <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
        <p className="font-bold text-2xl text-black">QweRty</p>
      </NavLink>

      <ul className="flex flex-col gap-2">
        <NavLink to="/new-qr" className={({ isActive }) =>`cursor-pointer w-full flex !text-gray-600 mx-auto p-3 rounded-lg transition duration-300 ease-in hover:scale-102 hover:!text-pink-500 ${isActive? "!text-pink-500 bg-pink-100" : ""}`}>
          <li className="flex items-center gap-2"><QrCode2 /> New QR</li>
        </NavLink>
        <NavLink to="/my-qr" className={({ isActive }) =>`cursor-pointer w-full flex !text-gray-600 mx-auto p-3 rounded-lg transition duration-300 ease-in hover:scale-102 hover:!text-pink-500 ${isActive? "!text-pink-500 bg-pink-100" : ""}`}>
          <li className="flex items-center gap-2"><QrCode /> My QR Codes</li>
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) =>`cursor-pointer w-full flex !text-gray-600 mx-auto p-3 rounded-lg transition duration-300 ease-in hover:scale-102 hover:!text-pink-500 ${isActive? "!text-pink-500 bg-pink-100" : ""}`}>
          <li className="flex items-center gap-2"><BarChart /> Stats</li>
        </NavLink>
        {/* <NavLink to="/plans" className={({ isActive }) =>`cursor-pointer w-full flex !text-gray-600 mx-auto p-3 rounded-lg transition duration-300 ease-in hover:scale-102 hover:!text-pink-500 ${isActive? "!text-pink-500 bg-pink-100" : ""}`}>
          <li className="flex items-center gap-2"><CreditCard /> Plans and Pricings</li>
        </NavLink> */}
      </ul>
    </div>
  )
}

export default NavigationBar