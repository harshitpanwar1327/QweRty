import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import { Language, PictureAsPdf, AccountBox, Image, Videocam, Apps, Event, QueueMusic, WhatsApp, Email, Wifi, People, Feedback, TextFields, LocationOn } from "@mui/icons-material"
import { useState } from "react"

const qrTypes = [
  { key: "website", icon: <Language fontSize="medium" />, label: "Website" },
  { key: "text", icon: <TextFields fontSize="medium" />, label: "Text" },
  { key: "whatsapp", icon: <WhatsApp fontSize="medium" />, label: "WhatsApp" },
  { key: "email", icon: <Email fontSize="medium" />, label: "Email" },
  { key: "wifi", icon: <Wifi fontSize="medium" />, label: "WiFi" },
  { key: "social", icon: <People fontSize="medium" />, label: "Social Media" },
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

const designTabs = ["Frame", "Shape", "Logo", "Level"];

const NewQR = () => {
  const [activeTab, setActiveTab] = useState<string>("website");
  const [designTab, setDesignTab] = useState<string>("Frame")

  return (
    <>
    <NavigationBar />
    <div className="flex flex-col w-screen h-screen overflow-y-auto">
      <Menubar heading='NewQR'/>

      <div className="bg-white rounded-md grow overflow-y-auto flex flex-col p-4 m-2 gap-4">
        <div className="relative flex items-center">
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap p-2">
            {qrTypes.map((item) => (
              <button key={item.key} onClick={()=>setActiveTab(item.key)}className={`flex flex-col items-center py-3 rounded-md min-w-[90px] transition hover:scale-105 hover:text-pink-500 ${activeTab === item.key? "bg-pink-100 text-pink-500" : "text-gray-600 hover:bg-gray-100"}`}>
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* <div className="flex-1 p-4 border rounded-md">
          {activeTab === "website" && (
            <div>
              <h2 className="font-semibold text-lg">Enter your Website</h2>
              <input
                type="text"
                placeholder="E.g. https://www.myweb.com/"
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
          )}

          {activeTab === "text" && <p>Text QR</p>}
          {activeTab === "whatsapp" && <p>Whatsapp QR</p>}
          {activeTab === "email" && <p>Email QR</p>}
        </div> */}
        <div className="flex gap-6 h-full">
          <div className="flex-1 space-y-8 p-3">
            {/* P1 */}
            <div className="mt-4 space-y-4">
              {activeTab === "website" && (
                <>
                  <h3 className="text-md font-bold flex items-center gap-2"><span className="bg-black text-white px-2 py-1 rounded">1</span>Complete the content</h3>
                  <label className="block font-medium text-md mb-1">Enter your Website</label>
                  <input type="text" placeholder="E.g. https://www.myweb.com/" className="w-full p-2 border rounded"/>
                </>
              )}
              {activeTab === "text" && (
                <>
                  <h3 className="text-md font-bold flex items-center gap-2"><span className="bg-black text-white px-2 py-1 rounded">1</span>Complete the content</h3>
                  <label className="block font-medium text-md mb-1">Message <sup>*</sup></label>
                  <textarea name="message" id="message" className="w-full p-2 border rounded" placeholder="Enter some text..."></textarea>
                </>
              )}
              {activeTab === "whatsapp" && <p>Enter whatsApp content</p>}
              {activeTab === "email" && <p>Enter email content</p>}
            </div>

            <hr className="text-gray-300"/>

            {/* P2 */}
            <div>
              <h3 className="text-md font-bold flex items-center gap-2"><span className="bg-black text-white px-2 py-1 rounded">2</span>Design your QR</h3>
              <div className="flex gap-1 my-4 ">
                {designTabs.map((tab) => (
                  <button key={tab} onClick={() => setDesignTab(tab)} className={`p-2 px-6 text-sm font-semibold rounded-md ${designTab === tab ? "text-pink-500 border-b-2 border-pink-500 bg-pink-100" : "text-gray-600 hover:text-pink-500 hover:bg-pink-100"}`}>
                    {tab}
                  </button>
                ))}
              </div>
              {designTab === "Frame" && <p>Choose a QR frame</p>}
              {designTab === "Shape" && <p>Choose QR shape</p>}
              {designTab === "Logo" && <p>Upload/Add logo</p>}
              {designTab === "Level" && <p>Select level</p>}
            </div>
          </div>

          {/* P3 */}
          <div className="w-[20rem] rounded-md py-10 flex flex-col items-center bg-gray-100">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6"><span className="bg-black text-white px-2 py-1 rounded">3</span>Download your QR</h3>
            <div className="w-[10rem] h-[10rem] flex items-center justify-center my-4 rounded bg-white rounded-lg shadow-lg">QR Preview</div>
            <button className="px-6 py-2 bg-white rounded-full hover:bg-gray-300">Download QR</button>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default NewQR