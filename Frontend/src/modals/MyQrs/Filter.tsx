import { useState } from "react"
import { Language, AccountBox, WhatsApp, Email, Wifi, TextFields, LocationOn, Close, DeleteRounded } from "@mui/icons-material"

const qrStatus = ["Active", "Paused", "Finished"];

const qrTypes = [
  { key: 'website', name: "Website", icon: <Language fontSize="small" /> },
  { key: 'text', name: "Text", icon: <TextFields fontSize="small" /> },
  { key: 'whatsapp', name: "WhatsApp", icon: <WhatsApp fontSize="small" /> },
  { key: 'email', name: "Email", icon: <Email fontSize="small" /> },
  { key: 'wifi', name: "WiFi", icon: <Wifi fontSize="small" /> },
  { key: 'location', name: "Location", icon: <LocationOn fontSize="small" /> },
  { key: 'vcard', name: "vCard", icon: <AccountBox fontSize="small" /> },
];

const Filter = ({ setOpenFilterModal, setFilterData }) => {
  const [activeStatus, setActiveStatus] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleStatus = (status: string) => {
    setActiveStatus((prev) => prev.includes(status)? prev.filter((s) => s !== status) : [...prev, status])
  }

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => prev.includes(type)? prev.filter((t) => t !== type) : [...prev, type])
  }

  const handleClearFilter = () => {
    setActiveStatus([]);
    setSelectedTypes([]);
  }

  const handleResult = () => {
    setFilterData({
      activeStatus: [...activeStatus],
      selectedTypes: [...selectedTypes]
    })
    setOpenFilterModal(false);
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen p-4 flex justify-end items-center bg-[#0000005a] z-10' onClick={()=>setOpenFilterModal(false)}>
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-md shadow-md p-4 flex flex-col gap-4" onClick={(e)=>e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">Filter results</h2>
          <div className="flex justify-center items-center p-1 hover:bg-gray-100 rounded-full text-gray-500 cursor-pointer">
            <Close onClick={()=>setOpenFilterModal(false)}/>
          </div>
        </div>

        <hr className="text-gray-200"/>
        
        <h3 className='text-black font-semibold'>QR code status</h3>
        <div className="flex flex-wrap gap-2">
          {qrStatus.map((status, index) => (
            <button key={index} onClick={()=>toggleStatus(status)} className={`flex items-center gap-2 py-2 px-3 text-sm rounded-md border transition-all duration-300 ${activeStatus.includes(status)? "bg-pink-50 border-pink-500 text-pink-600": "border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
              {status}
            </button>
          ))}
        </div>

        <hr className="text-gray-200"/>

        <h3 className='text-black font-semibold'>QR code type</h3>
        <div className="flex flex-wrap gap-2">
          {qrTypes.map((type, index) => (
            <button key={index} onClick={()=>toggleType(type.key)} className={`flex items-center gap-2 py-2 px-3 text-sm rounded-md border transition-all duration-300 ${selectedTypes.includes(type.key)? "bg-pink-50 border-pink-500 text-pink-600": "border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
              {type.icon}
              <span>{type.name}</span>
            </button>
          ))}
        </div>

        <hr className="text-gray-200"/>
        
        <div className="self-end flex items-center gap-4">
          <button className="flex items-center gap-1 font-semibold text-blue-500 hover:text-blue-600  transition duration-300" onClick={handleClearFilter}><DeleteRounded /> Clear filters</button>
          <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 py-2 px-3 text-white font-semibold rounded-full" onClick={handleResult}>See results</button>
        </div>
      </div>
    </div>
  )
}

export default Filter