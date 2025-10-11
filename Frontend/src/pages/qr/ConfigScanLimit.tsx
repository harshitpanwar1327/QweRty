import { XCircle } from "lucide-react"

const ConfigScanLimit = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <div className="bg-white shadow-xl rounded-2xl p-10 w-9/10 md:w-1/2 lg:w-1/3 flex flex-col items-center gap-4 text-center">
            <XCircle className="text-red-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Scan Limit Reached</h2>
            <p className="text-sm text-gray-600">The maximum number of allowed scans for this QR code has been reached. Please request a new QR code or contact the issuer.</p>
        </div>
    </div>
  )
}

export default ConfigScanLimit