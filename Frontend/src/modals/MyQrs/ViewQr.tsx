import { Close, Language, WhatsApp, Email, AccountBox, Wifi, TextFields, LocationOn } from "@mui/icons-material"
// import { People, Apps, Feedback, PictureAsPdf, Image, Videocam, QueueMusic, Event, Badge } from "@mui/icons-material"
import { Download } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import DownloadQR from "../DownloadQR"

interface ViewQrProps {
  setOpenViewQrModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedQr: {
    qr_id: number;
    user_id: number;
    name: string;
    qr_type: 'website'|'text'|'whatsapp'|'email'|'wifi'|'location'|'vcard';
    content: object;
    design?: object;
    configuration?: object;
    qr: string;
    created_at: string;
    updated_at: string;
    state: string;
    total_scans: number;
  }
}

const qrTypes = {
  website: { icon: <Language sx={{fontSize: '16px'}} />, label: "Website" },
  text: { icon: <TextFields sx={{fontSize: '16px'}} />, label: "Text" },
  whatsapp: { icon: <WhatsApp sx={{fontSize: '16px'}} />, label: "WhatsApp" },
  email: { icon: <Email sx={{fontSize: '16px'}} />, label: "Email" },
  wifi: { icon: <Wifi sx={{fontSize: '16px'}} />, label: "WiFi" },
  location: { icon: <LocationOn sx={{fontSize: '16px'}} />, label: "Location" },
  vcard: { icon: <AccountBox sx={{fontSize: '16px'}} />, label: "vCard" },
  // social: { icon: <People sx={{fontSize: '16px'}} />, label: "Social Media" },
  // apps: { icon: <Apps sx={{fontSize: '16px'}} />, label: "Apps" },
  // feedback: { icon: <Feedback sx={{fontSize: '16px'}} />, label: "Feedback" },
  // pdf: { icon: <PictureAsPdf sx={{fontSize: '16px'}} />, label: "PDF" },
  // images: { icon: <Image sx={{fontSize: '16px'}} />, label: "Images" },
  // video: { icon: <Videocam sx={{fontSize: '16px'}} />, label: "Video" },
  // mp3: { icon: <QueueMusic sx={{fontSize: '16px'}} />, label: "MP3" },
  // event: { icon: <Event sx={{fontSize: '16px'}} />, label: "Event" },
  // vcardplus: { icon: <Badge sx={{fontSize: '16px'}} />, label: "vCard Plus" },
};

const ViewQr: React.FC<ViewQrProps> = ({setOpenViewQrModal, selectedQr}) => {
  const [openDownloadModal, setOpenDownloadModal] = useState<boolean>(false);

  return (
    <div className='fixed top-0 left-0 w-screen h-screen p-4 flex justify-end items-center bg-[#0000005a] z-10' onClick={()=>setOpenViewQrModal(false)}>
      <motion.div className="w-2/3 md:w-1/3 lg:w-1/4 bg-white rounded-md shadow-md p-4 flex flex-col gap-4" onClick={(e)=>e.stopPropagation()}
        initial={{opacity: 0, x: '100%'}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: '100%'}}
        transition={{duration: 0.3}}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">{selectedQr.name}</h2>
          <div className="flex justify-center items-center p-1 hover:bg-gray-100 rounded-full text-gray-500 cursor-pointer">
            <Close onClick={()=>setOpenViewQrModal(false)}/>
          </div>
        </div>

        <hr className="text-gray-200"/>

        <div className="flex items-center gap-2">
          <div className='flex justify-center items-center gap-1 py-1 px-3 bg-pink-100 text-pink-500 rounded'>
            {qrTypes[selectedQr.qr_type]?.icon}
            <p className='text-sm font-semibold'>{qrTypes[selectedQr.qr_type]?.label}</p>
          </div>
          <p className={`text-sm font-semibold text-white py-1 px-3 rounded flex justify-center items-center ${selectedQr.state==='Active'? 'bg-[#46CB48]': selectedQr.state==='Pause'? 'bg-blue-500': 'bg-[#FE8E3E]'}`}>{selectedQr.state}</p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <div className="w-full flex justify-center p-4 bg-gray-100 rounded-lg">
            <img src={selectedQr.qr} className="bg-white rounded-lg shadow-lg" alt='Qr' />
          </div>
          <button className="flex items-center justify-center bg-blue-500 p-1 rounded-full hover:bg-blue-700 group" onClick={()=>setOpenDownloadModal(true)}>
            <p className='text-sm text-white px-3'>Download QR</p>
            <Download size={32} className='bg-white rounded-full p-2 rotate-0 group-hover:rotate-180 transition duration-300 ease-in-out'/>
          </button>
        </div>
      </motion.div>
      <AnimatePresence>
        {openDownloadModal && <DownloadQR setOpenDownloadModal={setOpenDownloadModal} qrPreview={selectedQr.qr} qrName={selectedQr.name} />}
      </AnimatePresence>
    </div>
  )
}

export default ViewQr