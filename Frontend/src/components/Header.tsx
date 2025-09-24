import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200 flex justify-between items-center py-4 px-4 md:px-8">
      <div className="flex items-center gap-2">
        <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
        <p className="font-bold text-2xl text-black">QweRty</p>
      </div>

      <div className="flex items-center gap-2">
        <NavLink to="/login"><button className="px-6 py-2 border border-gray-300 rounded-full text-blue-600 hover:bg-gray-100 transition duration-300 hover:scale-102">Log In</button></NavLink>
        <NavLink to="/register"><button className="hidden md:block px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 hover:scale-102">Register</button></NavLink>
      </div>
    </div>
  )
}

export default Header