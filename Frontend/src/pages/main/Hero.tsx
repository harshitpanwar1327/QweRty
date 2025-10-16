import { Language, AccountBox, WhatsApp, Email, Wifi, TextFields, LocationOn } from "@mui/icons-material"
// import { PictureAsPdf, Image, Videocam, Apps, Event, QueueMusic, People, Feedback, Badge } from "@mui/icons-material"
import Footer from "../../components/Footer.js"
import Header from "../../components/Header.js"
import Website from "../../section/Website.js"
import Text from "../../section/Text.js"
// import Pdf from "../../section/Pdf.js"
import Whatsapp from '../../section/Whatsapp.js'
import EmailSection from '../../section/Email.js'
import WifiSection from '../../section/Wifi.js'
// import SocialMedia from "../../section/SocialMedia.js"
// import App from "../../section/Apps.js"
// import Feedbacks from "../../section/Feedback.js"
import Contact from "../../section/VCard.js"
// import Events from "../../section/Event.js"
import Location from "../../section/Location.js"
// import MP3 from "../../section/MP3.js"
// import Video from "../../section/Video.js"
// import Images from "../../section/Image.js"
// import ContactPlus from "../../section/VCardPlus.js"
import { useNavigate } from 'react-router-dom'
import type { AppDispatch } from '../../app/Store'
import { useDispatch } from 'react-redux'
import { activeTab } from '../../features/qrType/QrTypeSlice'

const qrTypes = [
  { key: 'website', icon: <Language fontSize="large" />, label: "Website" },
  { key: 'text', icon: <TextFields fontSize="large" />, label: "Text" },
  { key: 'whatsapp', icon: <WhatsApp fontSize="large" />, label: "WhatsApp" },
  { key: 'email', icon: <Email fontSize="large" />, label: "Email" },
  { key: 'wifi', icon: <Wifi fontSize="large" />, label: "WiFi" },
  { key: 'location', icon: <LocationOn fontSize="large" />, label: "Location" },
  { key: 'vcard', icon: <AccountBox fontSize="large" />, label: "vCard" },
  // { key: 'social', icon: <People fontSize="large" />, label: "Social Media" },
  // { key: 'apps', icon: <Apps fontSize="large" />, label: "Apps" },
  // { key: 'feedback', icon: <Feedback fontSize="large" />, label: "Feedback" },
  // { key: 'pdf', icon: <PictureAsPdf fontSize="large" />, label: "PDF" },
  // { key: 'images', icon: <Image fontSize="large" />, label: "Images" },
  // { key: 'video', icon: <Videocam fontSize="large" />, label: "Video" },
  // { key: 'mp3', icon: <QueueMusic fontSize="large" />, label: "MP3" },
  // { key: 'event', icon: <Event fontSize="large" />, label: "Event" },
  // { key: 'vcardplus', icon: <Badge fontSize="large" />, label: "vCard Plus" },
];

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleQrButton = (key: string) => {
    dispatch(activeTab(key))
    navigate('/new-qr');
  }

  return (
    <div className="flex flex-col w-screen h-screen overflow-y-auto">
      <Header/>

      <div className="grow py-8 md:py-16 lg:py-24 px-4 md:px-12 lg:px-20 flex flex-col gap-8 md:gap-12 lg:gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="mx-auto text-2xl md:text-4xl lg:text-6xl font-bold text-black text-center">Transform the Way You Connect with Customers Through <span className="text-pink-600">Next-Generation QR Codes</span></h2>
          <p className="mx-auto text-gray-500 md:text-lg lg:text-xl text-center">Whether it’s sharing a website, connecting to WiFi, opening a document, or launching an app — QweRty gives you the tools to create fully customizable QR codes that elevate your brand, improve customer engagement, and seamlessly bridge the gap between your physical and digital presence.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {qrTypes.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 p-4 shadow-sm hover:shadow-xl hover:scale-105 hover:border-pink-500 cursor-pointer transition duration-300" onClick={()=>handleQrButton(item.key)}>
              <div className="text-pink-500">{item.icon}</div>
              <p className="text-center text-gray-800">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Website />
      <Text />
      <Whatsapp />
      <EmailSection />
      <WifiSection />
      <Location />
      <Contact />
      {/* <SocialMedia />
      <App />
      <Feedbacks />
      <Pdf />
      <Images />
      <Video />
      <MP3 />
      <Events />
      <ContactPlus /> */}

      <Footer />
    </div>
  )
}

export default Hero