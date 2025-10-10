import { Language, AccountBox, WhatsApp, Email, Wifi, TextFields, LocationOn, Close } from "@mui/icons-material"
import { useState, useEffect } from "react"; 

const Filter = ({ setOpenFilterModal }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [animate, setAnimate] = useState(false);

  const qrTypes = [
    { name: "Website", icon: <Language fontSize="small" /> },
    { name: "vCard", icon: <AccountBox fontSize="small" /> },
    { name: "WhatsApp", icon: <WhatsApp fontSize="small" /> },
    { name: "Email", icon: <Email fontSize="small" /> },
    { name: "Wi-Fi", icon: <Wifi fontSize="small" /> },
    { name: "Text", icon: <TextFields fontSize="small" /> },
    { name: "Location", icon: <LocationOn fontSize="small" /> },
  ]

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    )
  }

  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
  }, [])

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setOpenFilterModal(false), 300);
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen p-4 flex justify-end items-center bg-[#0000005a] z-10' onClick={handleClose}>
      <div className={`w-full md:w-1/2 lg:w-1/3 bg-white rounded-md shadow-md p-4 flex flex-col gap-4 transform transition-transform duration-400 ${
        animate ? "translate-x-0" : "translate-x-full"}`} onClick={(e)=>e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">Filter results</h2>
          <Close onClick={handleClose} sx={{ fontSize: 35, color: "#9ca3af", cursor: "pointer" }} className="hover:bg-gray-100 p-1 transition-colors duration-200 rounded-full"/>
        </div>
        <hr className="text-gray-200"/>

        
        <h3 className='text-sm text-black font-semibold'>QR code type</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-x-auto">
          {qrTypes.map((type) => (
            <button key={type.name} onClick={()=>toggleType(type.name)}className={`flex items-center gap-2 pl-2 py-2 text-sm rounded-md border transition-all duration-200 ${selectedTypes.includes(type.name) ? "bg-pink-50 border-pink-500 text-pink-600"
              : "border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
              {type.icon}
              <span>{type.name}</span>
            </button>
          ))}
        </div>

        <hr className="text-gray-200"/>
        <button className="bg-blue-500 py-2 px-5 text-white font-semibold rounded-full self-end hover:bg-blue-600">See results</button>
      </div>
    </div>
  )
}

export default Filter