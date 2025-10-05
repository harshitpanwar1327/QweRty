import { useState, type ReactNode } from "react"
import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import { Language, PictureAsPdf, AccountBox, Image, Videocam, Apps, Event, QueueMusic, WhatsApp, Email, Wifi, People, Feedback, TextFields, LocationOn, Badge } from "@mui/icons-material"
import { Select, MenuItem } from "@mui/material"
import SampleQr from '../../assets/SampleQR.png'
import API from "../../util/API"
import { toast } from "react-toastify"
import axios from "axios"
import { ArrowRight, Download } from "lucide-react"
import { DownloadQR } from "../../modals/DownloadQR"

interface NewQRProp {
  activeTab?: string
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
  { key: "social", icon: <People fontSize="medium" />, label: "Social Media" },
  { key: "apps", icon: <Apps fontSize="medium" />, label: "Apps" },
  { key: "feedback", icon: <Feedback fontSize="medium" />, label: "Feedback" },
  { key: "pdf", icon: <PictureAsPdf fontSize="medium" />, label: "PDF" },
  { key: "images", icon: <Image fontSize="medium" />, label: "Images" },
  { key: "video", icon: <Videocam fontSize="medium" />, label: "Video" },
  { key: "mp3", icon: <QueueMusic fontSize="medium" />, label: "MP3" },
  { key: "event", icon: <Event fontSize="medium" />, label: "Event" },
  { key: "vcardplus", icon: <Badge fontSize="medium" />, label: "vCard Plus" },
];

const tabsArray: string[] = ["Frame", "Shape", "Logo", "Level"];

const NewQR: React.FC<NewQRProp> = ({ activeTab }) => {
  const [designTab, setDesignTab] = useState<string>("Frame");
  const [qrPreview, setQrPreview] = useState<string>("");
  const [openDownloadModal, setOpenDownload] = useState<boolean>(false);

  const uid = sessionStorage.getItem('userId') || '';

  const [qrType, setQrType] = useState<string>(activeTab || "website");
  const [qrName, setQrName] = useState<string>('');

  const [websiteContent, setWebsiteContent] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [whatsappMessage, setWhatsappMessage] = useState<string>('');
  const [emailContent, setEmailContent] = useState<string>('');
  const [wifiSsid, setWifiSsid] = useState<string>('');
  const [wifiPassword, setWifiPassword] = useState<string>('');
  const [wifiEncryption, setWifiEncryption] = useState<string>('');

  const [borderColour, setBorderColour] = useState<string>('');
  const [backgroundColour, setBackgroungColour] = useState<string>('');
  const [logo, setLogo] = useState<string>('');

  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [scanLimit, setScanLimit] = useState<number | null>(null);
  const [password, setPassword] = useState<string>('');

  const handleGenerateQr = async () => {
    try {
      const qrPayload = {
        user_id: uid,
        name: qrName,
        qr_type: qrType,
        content: {
          url: websiteContent,
          text: textContent,
          whatsapp: {
            whatsappNumber,
            whatsappMessage
          },
          email: emailContent,
          wifi: {
            ssid: wifiSsid,
            password: wifiPassword,
            encryption: wifiEncryption
          },
          location: "",
          vCard: ""
        },
        design: {
          borderColour,
          backgroundColour,
          logo,
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

  return (
    <div className="w-screen flex">
      <NavigationBar />

      <div className="grow flex flex-col gap-2 p-2 overflow-auto">
        <Menubar heading='New QR'/>

        <form className="grow bg-white rounded-md overflow-y-auto flex flex-col md:flex-row gap-8 p-2" onSubmit={handleGenerateQr}>
          <div className="w-full md:w-2/3 flex flex-col gap-8 p-6 md:overflow-y-auto">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">1</span> Select the QR type</h3>
              <Select value={qrType} onChange={(e) => setQrType(e.target.value)} className="w-full lg:w-2/3" required>
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

              {qrType==='website' &&
                <div className="flex flex-col gap-1">
                  <label>Enter your Website</label>
                  <input type="text" placeholder="E.g. https://www.myweb.com/" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={websiteContent} onChange={(e) => setWebsiteContent(e.target.value)} required/>
                </div>
              }

              {qrType==='text' &&
                <div className="flex flex-col gap-1">
                  <label>Message</label>
                  <textarea placeholder="Enter some text..." rows={5} className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={textContent} onChange={(e) => setTextContent(e.target.value)} maxLength={2000} required/>
                  <div className={`text-sm ${textContent.length==2000? 'text-red-500' :'text-gray-500'}`}>
                    {textContent.length}/2000 characters
                  </div>
                </div>
              }

              {qrType==='whatsapp' &&
                <div className="flex flex-col gap-1">
                  <label>Number</label>
                  <input type="text" placeholder="E.g. +919876543210" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} required/>
                  <label>Message</label>
                  <textarea placeholder="Enter a by default message..." rows={5} className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={whatsappMessage} onChange={(e) => setWhatsappMessage(e.target.value)} maxLength={200}/>
                  <div className={`text-sm ${whatsappMessage.length==200? 'text-red-500' :'text-gray-500'}`}>
                    {whatsappMessage.length}/200 characters
                  </div>
                </div>
              }

              {qrType==='email' &&
                <div className="flex flex-col gap-1">
                  <label>Enter your Website</label>
                  <input type="email" placeholder="E.g. myemail@gmail.com" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={emailContent} onChange={(e) => setEmailContent(e.target.value)} required/>
                </div>
              }

              {qrType==='wifi' &&
                <div className="flex flex-col gap-1">
                  <label>Network name (SSID)</label>
                  <input type="text" placeholder="E.g. HomeWifi" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} required/>
                  <label>Network password</label>
                  <input type="text" placeholder="E.g. MyPassword" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)}/>
                  <label>Type of encryption</label>
                  <select name="encryption" id="encryption" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={wifiEncryption} onChange={(e) => setWifiEncryption(e.target.value)} required>
                    <option value="WEP">WEP</option>
                    <option value="WPA">WPA</option>
                    <option value="WPA2-EAP">WPA2-EAP</option>
                    <option value="nopass">nopass</option>
                  </select>
                </div>
              }

              {qrType==='location' &&
                <div className="flex flex-col gap-1">
                  <label>Enter your Website</label>
                  <input type="text" placeholder="E.g. https://www.myweb.com/" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={websiteContent} onChange={(e) => setWebsiteContent(e.target.value)} required/>
                </div>
              }

              {qrType==='vcard' &&
                <div className="flex flex-col gap-1">
                  <label>Enter your Website</label>
                  <input type="text" placeholder="E.g. https://www.myweb.com/" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={websiteContent} onChange={(e) => setWebsiteContent(e.target.value)} required/>
                </div>
              }
            </div>

            <hr className="text-gray-300"/>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">4</span> Design your QR</h3>
              <div className="flex gap-2">
                {tabsArray.map((tab, index) => (
                  <button type="button" key={index} onClick={()=>setDesignTab(tab)} className={`py-3 px-4 text-sm rounded-md ${designTab === tab ? "text-pink-500 bg-pink-100" : "text-gray-600 hover:text-pink-500 hover:bg-pink-100"}`}>
                    {tab}
                  </button>
                ))}
              </div>
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