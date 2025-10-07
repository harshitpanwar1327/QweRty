import { useState, type ReactNode } from "react"
import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import { Language, PictureAsPdf, AccountBox, Image, Videocam, Apps, Event, QueueMusic, WhatsApp, Email, Wifi, People, Feedback, TextFields, LocationOn, Badge, Loop, PlayArrowRounded } from "@mui/icons-material"
import { Select, MenuItem } from "@mui/material"
import { ArrowRight, Download } from "lucide-react"
import SampleQr from '../../assets/SampleQR.png'
import API from "../../util/API"
import axios from "axios"
import { toast } from "react-toastify"
import { DownloadQR } from "../../modals/DownloadQR"
import type { AppDispatch, RootState } from '../../app/Store.js'
import { useSelector, useDispatch } from 'react-redux'
import { activeTab } from "../../features/qrType/QrTypeSlice.js"
import WebsiteLogic from "../../components/NewQr/WebsiteLogic.js"
import TextLogic from "../../components/NewQr/TextLogic.js"
import WhatsappLogic from "../../components/NewQr/WhatsappLogic.js"
import EmailLogic from "../../components/NewQr/EmailLogic.js"
import WifiLogic from "../../components/NewQr/WifiLogic.js"
import LocationLogic from "../../components/NewQr/LocationLogic.js"
import VCardLogic from "../../components/NewQr/VCardLogic.js"

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

const NewQR = () => {
  const uid = sessionStorage.getItem('userId') || '';

  const qrType = useSelector((state: RootState) => state.qrType.type);
  const dispatch = useDispatch<AppDispatch>();

  const [qrName, setQrName] = useState<string>('');

  const [designTab, setDesignTab] = useState<string>('Shape');
  const [foregroundColor, setForegroundColor] = useState<string>('#000000');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<string>('Q');

  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [scanLimit, setScanLimit] = useState<number | null>(null);
  const [password, setPassword] = useState<string>('');

  const [qrPreview, setQrPreview] = useState<string>("");
  const [openDownloadModal, setOpenDownload] = useState<boolean>(false);

  const [content, setContent] = useState({});

  const handleGenerateQr = async () => {
    try {
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

      const response = await API.post("/new-qr", qrPayload);
      setQrPreview(response.data.qr_image);
      toast.success("QR generated successfully!");
    } catch (error: unknown) {
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
    <div className="w-screen flex">
      <NavigationBar />

      <div className="grow flex flex-col gap-2 p-2 overflow-auto">
        <Menubar heading='New QR'/>

        <form className="grow bg-white rounded-md overflow-y-auto flex flex-col md:flex-row gap-8 p-2" onSubmit={handleGenerateQr}>
          <div className="w-full md:w-2/3 flex flex-col gap-8 md:p-6 md:overflow-y-auto">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">1</span> Select the QR type</h3>
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

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">2</span> Name your QR</h3>
              <input type="text" placeholder="Enter name" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={qrName}onChange={(e) => setQrName(e.target.value)} required/>
            </div>

            <hr className="text-gray-300"/>

            <div className="flex flex-col gap-4">
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
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="w-full rounded-md p-8 flex flex-col items-center gap-4 bg-gray-100">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">6</span> Generate QR</h3>
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
          </div>
        </form>
      </div>
      {openDownloadModal && <DownloadQR setOpenDownloadModal={setOpenDownload} qrPreview={qrPreview} qrName={qrName} />}
    </div>
  )
}

export default NewQR