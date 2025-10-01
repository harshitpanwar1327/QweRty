import { useState, type ReactNode } from "react"
import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import { Language, PictureAsPdf, AccountBox, Image, Videocam, Apps, Event, QueueMusic, WhatsApp, Email, Wifi, People, Feedback, TextFields, LocationOn } from "@mui/icons-material"
import { Select, MenuItem } from "@mui/material"
import SampleQr from '../../assets/SampleQR.png'

interface QRType {
  key: string,
  icon: ReactNode,
  label: string
}

interface NewQRProp {
  qrType?: string
}

const qrTypes: QRType[] = [
  { key: "website", icon: <Language fontSize="medium" />, label: "Website" },
  { key: "text", icon: <TextFields fontSize="medium" />, label: "Text" },
  { key: "whatsapp", icon: <WhatsApp fontSize="medium" />, label: "WhatsApp" },
  { key: "email", icon: <Email fontSize="medium" />, label: "Email" },
  { key: "wifi", icon: <Wifi fontSize="medium" />, label: "WiFi" },
  { key: "social", icon: <People fontSize="medium" />, label: "Socials" },
  { key: "apps", icon: <Apps fontSize="medium" />, label: "Apps" },
  { key: "feedback", icon: <Feedback fontSize="medium" />, label: "Feedback" },
  { key: "pdf", icon: <PictureAsPdf fontSize="medium" />, label: "PDF" },
  { key: "images", icon: <Image fontSize="medium" />, label: "Images" },
  { key: "video", icon: <Videocam fontSize="medium" />, label: "Video" },
  { key: "mp3", icon: <QueueMusic fontSize="medium" />, label: "MP3" },
  { key: "location", icon: <LocationOn fontSize="medium" />, label: "Location" },
  { key: "event", icon: <Event fontSize="medium" />, label: "Event" },
  { key: "vcard", icon: <AccountBox fontSize="medium" />, label: "vCard" },
];

const tabsArray = ["Frame", "Shape", "Logo", "Level"];

const NewQR: React.FC<NewQRProp> = ({ qrType }) => {
  const [activeTab, setActiveTab] = useState<string>(qrType || "website");
  const [designTab, setDesignTab] = useState<string>("Frame");

  return (
    <div className="w-screen flex">
      <NavigationBar />

      <div className="grow flex flex-col gap-2 p-2 overflow-auto">
        <Menubar heading='New QR'/>

        <div className="grow bg-white rounded-md overflow-y-auto flex flex-col lg:flex-row gap-8 p-2">
          <div className="w-2/3 flex flex-col gap-8 p-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">1</span> Select the QR type</h3>
              <Select value={activeTab} onChange={(e) => setActiveTab(e.target.value)} className="w-2/3">
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
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">2</span> Complete the content</h3>

              {activeTab==='website' &&
                <div className="flex flex-col gap-1">
                  <label>Enter your Website</label>
                  <input type="text" placeholder="E.g. https://www.myweb.com/" className="w-2/3 p-2 border border-gray-300 rounded"/>
                </div>
              }
            </div>

            <hr className="text-gray-300"/>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">3</span> Design your QR</h3>
              <div className="flex gap-2">
                {tabsArray.map((tab, index) => (
                  <button key={index} onClick={()=>setDesignTab(tab)} className={`py-3 px-4 text-sm rounded-md ${designTab === tab ? "text-pink-500 bg-pink-100" : "text-gray-600 hover:text-pink-500 hover:bg-pink-100"}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-1/3 rounded-md p-8 flex flex-col items-center gap-4 bg-gray-100">
            <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">4</span> Downlaod QR</h3>
            <img src={SampleQr} alt="w-full bg-white rounded-lg shadow-lg p-2" />
            <button className="px-6 py-2 bg-white rounded-full hover:bg-gray-300">Generate QR</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewQR