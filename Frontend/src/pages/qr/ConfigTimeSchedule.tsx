import { ClockAlert } from "lucide-react"

const ConfigTimeSchedule = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <div className="bg-white shadow-xl rounded-2xl p-10 w-9/10 md:w-1/2 lg:w-1/3 flex flex-col items-center gap-4 text-center">
            <ClockAlert className="text-orange-500" />
            <h2 className="text-2xl font-semibold text-gray-800">QR Code Expired</h2>
            <p className="text-sm text-gray-600">The validity period for this QR code has ended. Please contact the administrator or scan a new QR code.</p>
        </div>
    </div>
  )
}

export default ConfigTimeSchedule