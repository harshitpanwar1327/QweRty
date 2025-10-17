import { PauseCircle } from "lucide-react"
import { NavLink } from "react-router-dom"

const ConfigPauseQR = () => {
  return (
    <div className='bg-pink-500 flex justify-center items-center w-screen h-screen'>
      <div className='fixed top-0 left-0 w-full bg-white shadow-sm border-b border-gray-200 flex items-center gap-8 py-4 px-4 md:px-8'>
        <NavLink to={'/hero'} className="flex items-center gap-2 cursor-pointer">
          <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
          <p className="font-bold text-2xl text-black">QweRty</p>
        </NavLink>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-10 w-9/10 md:w-1/2 lg:w-1/3 flex flex-col items-center gap-4 text-center">
        <PauseCircle className="text-yellow-500" />
        <h2 className="text-2xl font-semibold text-gray-800">QR Code Paused</h2>
        <p className="text-sm text-gray-600">This QR code has been temporarily paused by the owner. Please try again later or contact the administrator for more information.</p>
      </div>
    </div>
  )
}

export default ConfigPauseQR