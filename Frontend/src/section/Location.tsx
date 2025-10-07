import website from '../assets/Location.png'
import { useNavigate } from 'react-router-dom'
import type { AppDispatch } from '../app/Store'
import { useDispatch } from 'react-redux'
import { activeTab } from '../features/qrType/QrTypeSlice'

const Location = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateQrCode = () => {
    dispatch(activeTab('location'))
    navigate('/new-qr');
  }

  return (
    <div className="flex flex-col justify-center items-center pt-48 px-4">
      <div className='w-full h-[40vh] lg:h-[50vh] bg-gradient-to-b from-indigo-800 to-white rounded-t-lg flex justify-center'>
        <img src={website} alt="img" className="h-[60vh] lg:h-[80vh] relative bottom-25" />
      </div>

      <div className="w-full p-4 md:p-8 md:pl-24 bg-[#F7F7F7] rounded-b-lg z-1">
        <div className='w-full md:w-2/3 flex flex-col justify-center gap-3'>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Location</h2>
          <p className="text-gray-600 text-sm md:text-md lg:text-lg">Guide users directly to your store or office. Scanning opens Google Maps with the pinned location, making navigation simple and hassle-free.</p>
          <button className="self-start bg-blue-600 text-white text-lg px-6 py-3 mt-3 rounded-full font-bold hover:bg-blue-700 transition-transform duration-300 hover:scale-105" onClick={handleCreateQrCode}>Create QR code</button>
        </div>
      </div>
    </div>
  )
}

export default Location