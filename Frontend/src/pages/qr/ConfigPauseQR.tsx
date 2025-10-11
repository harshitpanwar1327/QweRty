import { PauseCircle } from "lucide-react"

const ConfigPauseQR = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <div className="bg-white shadow-xl rounded-2xl p-10 w-9/10 md:w-1/2 lg:w-1/3 flex flex-col items-center gap-4 text-center">
            <PauseCircle className="text-yellow-500" />
            <h2 className="text-2xl font-semibold text-gray-800">QR Code Paused</h2>
            <p className="text-sm text-gray-600">This QR code has been temporarily paused by the owner. Please try again later or contact the administrator for more information.</p>
        </div>
    </div>
  )
}

export default ConfigPauseQR