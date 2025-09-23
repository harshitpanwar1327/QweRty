import { Language, PictureAsPdf, AccountBox, Image, Videocam, Apps, Event, QueueMusic, WhatsApp, Email, Wifi, People, Feedback, TextFields, LocationOn } from "@mui/icons-material"
import Footer from "../components/Footer.js"
import Header from "../components/Header.js"
import Website from "../section/Website.js"
import Text from "../section/Text.js"
import Pdf from "../section/Pdf.js"
import Whatsapp from '../section/Whatsapp.js'
import Emails from '../section/Email.js'
import Wifis from '../section/Wifi.js'
import SocialMedia from "../section/SocialMedia.js"
import App from "../section/Apps.js"
import Feedbacks from "../section/Feedback.js"
import Contact from "../section/vCard.js"
import Events from "../section/Event.js"
import Location from "../section/Location.js"
import MP3 from "../section/MP3.js"
import Video from "../section/Video.js"
import Images from "../section/Image.js"

const qrTypes = [
  { icon: <Language fontSize="large" />, label: "Website" },
  { icon: <TextFields fontSize="large" />, label: "Text" },
  { icon: <WhatsApp fontSize="large" />, label: "WhatsApp" },
  { icon: <Email fontSize="large" />, label: "Email" },
  { icon: <Wifi fontSize="large" />, label: "WiFi" },
  { icon: <People fontSize="large" />, label: "Social Media" },
  { icon: <Apps fontSize="large" />, label: "Apps" },
  { icon: <Feedback fontSize="large" />, label: "Feedback" },
  { icon: <PictureAsPdf fontSize="large" />, label: "PDF" },
  { icon: <Image fontSize="large" />, label: "Images" },
  { icon: <Videocam fontSize="large" />, label: "Video" },
  { icon: <QueueMusic fontSize="large" />, label: "MP3" },
  { icon: <LocationOn fontSize="large" />, label: "Location" },
  { icon: <Event fontSize="large" />, label: "Event" },
  { icon: <AccountBox fontSize="large" />, label: "vCard" },
];

const Hero = () => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-y-auto">
      <Header/>

      <div className="grow py-8 md:py-16 lg:py-24 px-4 md:px-12 lg:px-20 flex flex-col gap-8 md:gap-12 lg:gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="mx-auto text-2xl md:text-4xl lg:text-6xl font-bold text-black text-center">Transform the Way You Connect with Customers Through <span className="text-pink-600">Next-Generation QR Codes</span></h2>
          <p className="mx-auto text-gray-500 md:text-lg lg:text-xl text-center">Whether it’s sharing a website, connecting to WiFi, opening a document, or launching an app — QweRty gives you the tools to create fully customizable QR codes that elevate your brand, improve customer engagement, and seamlessly bridge the gap between your physical and digital presence.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {qrTypes.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 p-4 shadow-sm hover:shadow-xl hover:scale-105 hover:border-pink-500 cursor-pointer transition duration-300">
              <div className="text-pink-500">{item.icon}</div>
              <p className="text-center text-gray-800">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Website />
      <Text />
      <Whatsapp />
      <Emails />
      <Wifis />
      <SocialMedia />
      <App />
      <Feedbacks />
      <Pdf />
      <Images />
      <Video />
      <MP3 />
      <Location />
      <Events />
      <Contact />

      <Footer />
    </div>
  )
}

export default Hero