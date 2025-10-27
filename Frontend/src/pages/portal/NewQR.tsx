import { useState, type FormEvent, type ReactNode } from "react"
import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import { Language, AccountBox, WhatsApp, Email, Wifi, TextFields, LocationOn, Loop, PlayArrowRounded, People } from "@mui/icons-material"
// import { PictureAsPdf, Image, Videocam, Apps, Event, QueueMusic, Feedback, Badge } from "@mui/icons-material"
import { Select, MenuItem } from "@mui/material"
import { ArrowRight, Download } from "lucide-react"
import SampleQr from '../../assets/SampleQR.png'
import API from "../../util/API"
import axios from "axios"
import { toast } from "react-toastify"
import { HashLoader } from "react-spinners"
import DownloadQR from "../../modals/DownloadQR"
import type { AppDispatch, RootState } from '../../app/Store.js'
import { useSelector, useDispatch } from 'react-redux'
import { activeTab } from "../../features/qrType/QrTypeSlice.js"
import { motion, AnimatePresence } from 'framer-motion'
import WebsiteLogic from "../../components/NewQr/WebsiteLogic.js"
import TextLogic from "../../components/NewQr/TextLogic.js"
import WhatsappLogic from "../../components/NewQr/WhatsappLogic.js"
import EmailLogic from "../../components/NewQr/EmailLogic.js"
import WifiLogic from "../../components/NewQr/WifiLogic.js"
import LocationLogic from "../../components/NewQr/LocationLogic.js"
import VCardLogic from "../../components/NewQr/VCardLogic.js"
import SocialMediaLogic from "../../components/NewQr/SocialMediaLogic.js"

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
  { key: "social", icon: <People fontSize="medium" />, label: "Social Media" },
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

const NewQR = () => {
  const uid = sessionStorage.getItem('userId') || '';

  // QR Type Section
  const qrType = useSelector((state: RootState) => state.qrType.type);
  const dispatch = useDispatch<AppDispatch>();

  // Name Section
  const [qrName, setQrName] = useState<string>('');

  // Design Section
  const [designTab, setDesignTab] = useState<string>('Shape');
  const [foregroundColor, setForegroundColor] = useState<string>('#000000');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<string>('Q');

  // Configuration Section
  const [openTimeScheduling, setOpenTimeScheduling] = useState<boolean>(false);
  const [openScanLimit, setOpenScanLimit] = useState<boolean>(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [scanLimit, setScanLimit] = useState<number | null>(null);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [qrPreview, setQrPreview] = useState<string>("");
  const [openDownloadModal, setOpenDownload] = useState<boolean>(false);

  const [content, setContent] = useState({});

  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateQr = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password!==confirmPassword) {
      toast.error('Password and confirm password not match!');
      return;
    }

    try {
      setLoading(true);
      const qrPayload = {
        user_id: uid,
        name: qrName,
        qr_type: qrType,
        content,
        design: {
          color: {
            foregroundColor,
            backgroundColor,
          },
          errorCorrectionLevel
        },
        configuration: {
          from_date: fromDate,
          to_date: toDate,
          scan_limit: scanLimit,
          password,
        }
      };

      if(["text", "wifi", "vcard"].includes(qrType)) {
        const response = await API.post("/static-qr", qrPayload);
        setQrPreview(response.data.qr_image);
      } else {
        const response = await API.post("/dynamic-qr", qrPayload);
        setQrPreview(response.data.qr_image);
      }
      
      setQrName('');
      setContent({});
      setDesignTab('Shape');
      setForegroundColor('#000000');
      setBackgroundColor('#FFFFFF');
      setErrorCorrectionLevel('Q');
      setFromDate('');
      setToDate('');
      setScanLimit(null);
      setPassword('');
      setConfirmPassword('');
      toast.success("QR generated successfully.");
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error);
      } else {
        toast.error("QR generation failed!");
      }
    }
  };

  const handleInvert = () => {
    setBackgroundColor(foregroundColor);
    setForegroundColor(backgroundColor);
  }

  const renderQRContent = () => {
    switch (qrType) {
      case "website":
        return <WebsiteLogic content={content} setContent={setContent} />;
      case "text":
        return <TextLogic content={content} setContent={setContent} />;
      case "whatsapp":
        return <WhatsappLogic content={content} setContent={setContent} />;
      case "email":
        return <EmailLogic content={content} setContent={setContent} />;
      case "wifi":
        return <WifiLogic content={content} setContent={setContent} />;
      case "location":
        return <LocationLogic content={content} setContent={setContent} />;
      case "vcard":
        return <VCardLogic content={content} setContent={setContent} />;
      case "social":
        return <SocialMediaLogic content={content} setContent={setContent} />
      default:
        return null;
    }
  };

  return (
    <div className="w-screen flex">
      {loading && (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
          <HashLoader color="#dc3753" />
        </div>
      )}

      <NavigationBar />

      <div className="grow flex flex-col gap-2 p-2 overflow-auto">
        <Menubar heading='New QR'/>

        <form className="grow bg-white rounded-md overflow-y-auto flex flex-col md:flex-row gap-8 p-2" onSubmit={handleGenerateQr}>
          <div className="w-full md:w-2/3 flex flex-col gap-8 md:p-6 md:overflow-y-auto">
            <AnimatePresence>
              {["text", "wifi", "vcard"].includes(qrType) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-md"
                >
                  <strong>Note:</strong> The selected QR type is <span className="font-medium capitalize">{qrType}</span>. 
                  These are <strong>static QR codes</strong> — analytics and tracking features are not available for them.
                </motion.div>
              )}
            </AnimatePresence>

            {/* QR Type Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">1</span> Select the QR type</h3>
              <Select value={qrType} className="w-full lg:w-2/3" required
                onChange={(e) => dispatch(activeTab(e.target.value))}
              >
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

            {/* Name Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">2</span> Name your QR</h3>
              <input type="text" placeholder="Enter name" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={qrName}onChange={(e) => setQrName(e.target.value)} required/>
            </div>

            <hr className="text-gray-300"/>

            {/* Content Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">3</span> Complete the content</h3>
              {renderQRContent()}
            </div>

            <hr className="text-gray-300"/>

            {/* Design Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">4</span> Design your QR</h3>
              <div className="grid grid-cols-4 gap-2">
                {designTabsArray.map((tab, index) => (
                  <button type="button" key={index} onClick={()=>setDesignTab(tab)} className={`py-3 text-sm rounded-md font-semibold ${designTab === tab ? "text-pink-500 bg-pink-100" : "text-gray-600 hover:text-pink-500"} transition duration-300`}>{tab}</button>
                ))}
              </div>

              {designTab==='Shape' &&
                <div className="flex justify-between items-end bg-gray-100 p-4 rounded-md">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-gray-500">Foreground Color</label>
                      <input type="color" name="foreground" id="foreground" value={foregroundColor} onChange={(e)=>setForegroundColor(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-gray-500">Background Color</label>
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

            {!['text', 'wifi', 'vcard'].includes(qrType) &&
              <>
                <hr className="text-gray-300"/>

                {/* Customization Section */}
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
                              <input type="date" name="fromDate" id="fromDate" className="p-2 border border-gray-300 rounded" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} min={today}/>
                              <input type="date" name="toDate" id="toDate" className="p-2 border border-gray-300 rounded" value={toDate} onChange={(e)=>setToDate(e.target.value)} min={fromDate || today} />
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
                              <input type="password" name="password" id="password" placeholder="Set a password" className="p-2 border border-gray-300 rounded" value={password} onChange={(e)=>setPassword(e.target.value)} />
                              <input type="text" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" className="p-2 border border-gray-300 rounded" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                            </div>
                          </div>
                        </motion.div>
                      }
                    </AnimatePresence>
                  </div>
                </div>
              </>
            }
          </div>

          {/* Download QR Section */}
          <div className="w-full md:w-1/3 rounded-md p-8 flex flex-col items-center gap-4 bg-gray-100">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">{['text', 'wifi', 'vcard'].includes(qrType)? 5: 6}</span> Generate QR</h3>
              <img src={qrPreview || SampleQr} className="w-full bg-white rounded-lg shadow-lg p-2" alt='Qr' />
              <button type="submit" className="flex items-center bg-black p-1 rounded-full hover:bg-black/85 group">
                <p className='text-sm text-white px-3'>Generate QR</p>
                <ArrowRight size={32} className='bg-white rounded-full p-2 -rotate-45 group-hover:rotate-0 transition duration-300 ease-in-out'/>
              </button>
              {qrPreview &&
                <button type="button" onClick={()=>setOpenDownload(true)} className="flex items-center bg-blue-500 p-1 rounded-full hover:bg-blue-700 group">
                  <p className='text-sm text-white px-3'>Download QR</p>
                  <Download size={32} className='bg-white rounded-full p-2 rotate-0 group-hover:rotate-180 transition duration-300 ease-in-out'/>
                </button>
              }
          </div>
        </form>
      </div>
      <AnimatePresence>
        {openDownloadModal && <DownloadQR setOpenDownloadModal={setOpenDownload} qrPreview={qrPreview} qrName={qrName} />}
      </AnimatePresence>
    </div>
  )
}

export default NewQR