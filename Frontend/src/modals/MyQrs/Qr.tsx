import { Close, Language, WhatsApp, Email, AccountBox, Wifi, TextFields, LocationOn } from "@mui/icons-material"
import { Download } from "lucide-react"

interface QrProps {
  setOpenQrModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedQr: {
    name: string;
    qr_type: keyof typeof qrTypes;
    state: string;
    qr: string;
  };
}

const qrTypes = {
  website: { icon: <Language sx={{fontSize: '16px'}} />, label: "Website" },
  text: { icon: <TextFields sx={{fontSize: '16px'}} />, label: "Text" },
  whatsapp: { icon: <WhatsApp sx={{fontSize: '16px'}} />, label: "WhatsApp" },
  email: { icon: <Email sx={{fontSize: '16px'}} />, label: "Email" },
  wifi: { icon: <Wifi sx={{fontSize: '16px'}} />, label: "WiFi" },
  location: { icon: <LocationOn sx={{fontSize: '16px'}} />, label: "Location" },
  vcard: { icon: <AccountBox sx={{fontSize: '16px'}} />, label: "vCard" }
};

const Qr: React.FC<QrProps> = ({setOpenQrModal, selectedQr}) => {

  return (
    <div className='fixed top-0 left-0 w-screen h-screen p-4 flex justify-end items-center bg-[#0000005a] z-10' onClick={()=>setOpenQrModal(false)}>
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-md shadow-md p-4 flex flex-col gap-4" onClick={(e)=>e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">{selectedQr.name}</h2>
          <div className="flex justify-center items-center p-1 hover:bg-gray-100 rounded-full text-gray-500 cursor-pointer">
            <Close onClick={()=>setOpenQrModal(false)}/>
          </div>
        </div>

        <hr className="text-gray-200"/>

        <div className="flex gap-2">
          <div className='flex w-[5rem] justify-center items-center gap-1 py-1 bg-pink-100 text-pink-500 rounded '>
            {qrTypes[selectedQr.qr_type]?.icon}
            <p className='text-sm font-semibold'>{qrTypes[selectedQr.qr_type]?.label}</p>
          </div>
          <p className={`text-sm font-semibold text-white px-6 my-2 rounded flex justify-center items-center ${selectedQr.state==='Active'? 'bg-[#46CB48]': selectedQr.state==='Pause'? 'bg-blue-500': 'bg-[#FE8E3E]'}`}>{selectedQr.state}</p>
        </div>

        <div className="flex flex-wrap">
          <img src={selectedQr.qr} className="w-full bg-white rounded-lg shadow-lg p-2 mb-2" alt='Qr' />
          <button type="button" className="flex items-center justify-center bg-blue-500 p-1 rounded-full hover:bg-blue-700 group">
            <p className='text-sm text-white px-3'>Download QR</p>
            <Download size={32} className='bg-white rounded-full p-2 rotate-0 group-hover:rotate-180 transition duration-300 ease-in-out'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Qr