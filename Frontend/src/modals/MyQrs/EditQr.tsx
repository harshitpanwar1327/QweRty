import { Close, Language, WhatsApp, Email, AccountBox, Wifi, TextFields, LocationOn, People, Apps, Feedback, PictureAsPdf, Image, Videocam, QueueMusic, Event, Badge, Loop, PlayArrowRounded } from "@mui/icons-material"
import { Select, MenuItem } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux'
import { useState, type ReactNode } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { activeTab } from "../../features/qrType/QrTypeSlice.js"
import WebsiteLogic from "../../components/NewQr/WebsiteLogic.js"
import TextLogic from "../../components/NewQr/TextLogic.js"
import WhatsappLogic from "../../components/NewQr/WhatsappLogic.js"
import EmailLogic from "../../components/NewQr/EmailLogic.js"
import WifiLogic from "../../components/NewQr/WifiLogic.js"
import LocationLogic from "../../components/NewQr/LocationLogic.js"
import VCardLogic from "../../components/NewQr/VCardLogic.js"
import type { AppDispatch, RootState } from '../../app/Store.js'

interface EditQrProps {
  setOpenEditQrModal: React.Dispatch<React.SetStateAction<boolean>>;
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

interface QRTypeArray {
  key: string,
  icon: ReactNode,
  label: string
}

const qrTypes: QRTypeArray[] = [
  { key: "website", icon: <Language fontSize="medium" />, label: "Website" },
  { key: "text", icon: <TextFields fontSize="medium" />, label: "Text" },
  { key: "whatsapp", icon: <WhatsApp fontSize="medium" />, label: "WhatsApp" },
  { key: "email", icon: <Email fontSize="medium" />, label: "Email" },
  { key: "wifi", icon: <Wifi fontSize="medium" />, label: "WiFi" },
  { key: "location", icon: <LocationOn fontSize="medium" />, label: "Location" },
  { key: "vcard", icon: <AccountBox fontSize="medium" />, label: "vCard" },
  // { key: "social", icon: <People fontSize="medium" />, label: "Social Media" },
  // { key: "apps", icon: <Apps fontSize="medium" />, label: "Apps" },
  // { key: "feedback", icon: <Feedback fontSize="medium" />, label: "Feedback" },
  // { key: "pdf", icon: <PictureAsPdf fontSize="medium" />, label: "PDF" },
  // { key: "images", icon: <Image fontSize="medium" />, label: "Images" },
  // { key: "video", icon: <Videocam fontSize="medium" />, label: "Video" },
  // { key: "mp3", icon: <QueueMusic fontSize="medium" />, label: "MP3" },
  // { key: "event", icon: <Event fontSize="medium" />, label: "Event" },
  // { key: "vcardplus", icon: <Badge fontSize="medium" />, label: "vCard Plus" },
];

const designTabsArray: string[] = ["Shape", "Level"];

interface levelObject {
  key: string,
  label: string,
  percentage: number
}

const levelTabsArray: levelObject[] = [
  { key: 'Q', label: 'Level Q', percentage: 25 },
  { key: 'H', label: 'Level H', percentage: 30 },
  { key: 'M', label: 'Level M', percentage: 15 },
  { key: 'L', label: 'Level L', percentage: 7 }
]

const EditQr: React.FC<EditQrProps> = ({setOpenEditQrModal, selectedQr}) => {
  const qrType = useSelector((state: RootState) => state.qrType.type);
  const dispatch = useDispatch<AppDispatch>();
  const [qrName, setQrName] = useState<string>(selectedQr.name || '');
  const [designTab, setDesignTab] = useState<string>(selectedQr.designTab || '');
  const [foregroundColor, setForegroundColor] = useState<string>(selectedQr.foregroundColor);
  const [backgroundColor, setBackgroundColor] = useState<string>(selectedQr.backgroundColor);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<string>(selectedQr.errorCorrectionLevel);

  const [openTimeScheduling, setOpenTimeScheduling] = useState<boolean>(false);
  const [openScanLimit, setOpenScanLimit] = useState<boolean>(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [scanLimit, setScanLimit] = useState<number | null>(null);
  const [password, setPassword] = useState<string>('');

  const [content, setContent] = useState({});

  const handleInvert = () => {
    setBackgroundColor(foregroundColor);
    setForegroundColor(backgroundColor);
  }

  const renderQRContent = () => {
    switch (qrType) {
      case "website":
        return <WebsiteLogic setContent={setContent} />;
      case "text":
        return <TextLogic setContent={setContent} />;
      case "whatsapp":
        return <WhatsappLogic setContent={setContent} />;
      case "email":
        return <EmailLogic setContent={setContent} />;
      case "wifi":
        return <WifiLogic setContent={setContent} />;
      case "location":
        return <LocationLogic setContent={setContent} />;
      case "vcard":
        return <VCardLogic setContent={setContent} />;
      default:
        return null;
    }
  };

  return (
    <div className='fixed top-0 left-0 w-screen h-screen p-4 flex justify-end items-center bg-[#0000005a] z-10' onClick={()=>setOpenEditQrModal(false)}>
      <motion.div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-md shadow-md p-4 flex flex-col gap-4" onClick={(e)=>e.stopPropagation()}
        initial={{opacity: 0, x: '100%'}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: '100%'}}
        transition={{duration: 0.3}}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">Edit QR</h2>
          <div className="flex justify-center items-center p-1 hover:bg-gray-100 rounded-full text-gray-500 cursor-pointer">
            <Close onClick={()=>setOpenEditQrModal(false)}/>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="flex gap-4">
            <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">1</span> Edit QR type</h3>
            <Select value={qrType} onChange={(e) => dispatch(activeTab(e.target.value))} className="w-full lg:w-2/3" required>
              {qrTypes.map((data, index) => (
                <MenuItem value={data.key} key={index}>
                  <span className="flex items-center gap-2 text-pink-500">
                    {data.icon}
                    {data.label}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </div>

          <hr className="text-gray-300"/>

          <div className="flex gap-4">
            <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">2</span> Edit QR name:</h3>
            <input type="text" placeholder="Enter name" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={qrName}onChange={(e) => setQrName(e.target.value)} required/>
          </div>

          <hr className="text-gray-300"/>

          <div className="flex gap-4">
            <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">3</span> Complete the content</h3>
            {renderQRContent()}
          </div>

          <hr className="text-gray-300"/>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">4</span> Design your QR</h3>
            <div className="grid grid-cols-4 gap-2">
              {designTabsArray.map((tab, index) => (
                <button type="button" key={index} onClick={()=>setDesignTab(tab)} className={`py-3 text-sm rounded-md ${designTab === tab ? "text-pink-500 bg-pink-100" : "text-gray-600 hover:text-pink-500 hover:bg-pink-100"} transition duration-300`}>{tab}</button>
              ))}
            </div>

            {designTab==='Shape' &&
              <div className="flex justify-between items-end bg-gray-100 p-4 rounded-md">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Foreground Color</label>
                    <input type="color" name="foreground" id="foreground" value={foregroundColor} onChange={(e)=>setForegroundColor(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Background Color</label>
                    <input type="color" name="background" id="background" value={backgroundColor} onChange={(e)=>setBackgroundColor(e.target.value)} />
                  </div>
                </div>

                <button type="button" className="text-sm font-semibold text-blue-500 hover:text-blue-600 border border-gray-300 px-2 rounded-full" onClick={handleInvert}><Loop sx={{fontSize: '14px'}} /> Invert</button>
              </div>
            }

            {designTab==='Level' &&
              <div className="flex flex-wrap gap-5 p-4 bg-gray-100 rounded-md">
                {levelTabsArray.map((level, index)=>(
                  <p className={`text-sm font-semibold flex items-center gap-3 cursor-pointer ${errorCorrectionLevel===level.key? 'text-pink-500': ''} transition duration-300`} key={index} onClick={()=>setErrorCorrectionLevel(level.key)}>{level.label} <span className={`text-gray-500 border p-2 rounded-md ${errorCorrectionLevel===level.key? 'text-pink-500 border-pink-500': 'border-gray-200'} transition duration-300`}>{level.percentage}%</span></p>
                ))}
              </div>
            }
          </div>

          <hr className="text-gray-300"/>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">5</span> Customize your QR</h3>
            <div>
              <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => setOpenTimeScheduling(!openTimeScheduling)}>
                <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openTimeScheduling ? "rotate-90" : "rotate-0"}`} /> Time Scheduling
              </div>
              <AnimatePresence>
                {openTimeScheduling &&
                  <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.5}}
                  >
                    <div className="flex flex-col gap-3 p-3">
                      <p className="text-sm text-gray-600">Control when your QR code will be active. Set a start and end date to automatically enable or disable access. Useful for time-limited campaigns, events, or offers.</p>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="date" name="fromDate" id="fromDate" className="p-2 border border-gray-300 rounded" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
                        <input type="date" name="toDate" id="toDate" className="p-2 border border-gray-300 rounded" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
                      </div>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
              <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-t border-gray-200" onClick={() => setOpenScanLimit(!openScanLimit)}>
                <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openScanLimit ? "rotate-90" : "rotate-0"}`} /> Scan Limit
              </div>
              <AnimatePresence>
                {openScanLimit &&
                  <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.5}}
                  >
                    <div className="flex flex-col gap-3 p-3">
                      <p className="text-sm text-gray-600">Restrict the number of times your QR code can be scanned. Once the limit is reached, users will no longer be able to access the linked content. Perfect for exclusive offers, limited trials, or controlled access.</p>
                      <input type="number" name="scanLimit" id="scanLimit" placeholder="Limit number of scans" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={scanLimit || ''} onChange={(e)=>setScanLimit(e.target.value ? Number(e.target.value) : null)} />
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
              <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-t border-gray-200" onClick={() => setOpenPassword(!openPassword)}>
                <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openPassword ? "rotate-90" : "rotate-0"}`} /> Password
              </div>
              <AnimatePresence>
                {openPassword &&
                  <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.5}}
                  >
                    <div className="flex flex-col gap-3 p-3">
                      <p className="text-sm text-gray-600">Protect your QR code with a password. Users will need to enter the correct password before they can view or access the linked content. Ideal for private documents, internal links, or sensitive materials.</p>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="password" name="password" id="password" placeholder="Change password" className="p-2 border border-gray-300 rounded" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        
                      </div>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EditQr