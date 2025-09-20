import { Language, PictureAsPdf, AccountBox, Image, Videocam, MenuBook, Apps, Event, QueueMusic, WhatsApp, Email, Wifi, People, Feedback } from "@mui/icons-material"
import Footer from "../components/Footer.js"
import NavigationBar from "../components/NavigationBar.js"
import Website from "../section/Website.js"
import Pdf from "../section/Pdf.js"
import Whatsapp from '../section/Whatsapp.js'
import Emails from '../section/Email.js'
import Wifis from '../section/Wifi.js'
import SocialMedia from "../section/SocialMedia.js"
import App from "../section/Apps.js"
import Feedbacks from "../section/Feedback.js"
import VisitingCard from "../section/VisitingCard.js"
import Events from "../section/Event.js"
import Menu from "../section/Menu.js"
import MP3 from "../section/MP3.js"
import Video from "../section/Video.js"
import Images from "../section/Image.js"

const qrTypes = [
  { icon: <Language fontSize="large" />, label: "Website" },
  { icon: <PictureAsPdf fontSize="large" />, label: "PDF" },
  { icon: <WhatsApp fontSize="large" />, label: "WhatsApp" },
  { icon: <Email fontSize="large" />, label: "Email" },
  { icon: <Wifi fontSize="large" />, label: "WiFi" },
  { icon: <People fontSize="large" />, label: "Social Media" },
  { icon: <Apps fontSize="large" />, label: "Apps" },
  { icon: <Feedback fontSize="large" />, label: "Feedback" },
  { icon: <AccountBox fontSize="large" />, label: "Visiting Card" },
  { icon: <Event fontSize="large" />, label: "Event" },
  { icon: <MenuBook fontSize="large" />, label: "Menu" },
  { icon: <Image fontSize="large" />, label: "Images" },
  { icon: <Videocam fontSize="large" />, label: "Video" },
  { icon: <QueueMusic fontSize="large" />, label: "MP3" },
];

const Hero = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <NavigationBar/>
        
        <div className="flex-grow w-screen md:py-10 lg:py-14 py-6 px-4 md:px-12 lg:px-20 bg-white">
          <h2 className="max-w-5xl mx-auto text-5xl md:text-6xl font-bold text-black mb-4 text-center">Choose the type of <span className="text-blue-600">QR code</span> you need to improve your business</h2>
          <p className="text-gray-500 max-w-3xl text-lg mx-auto mb-18 text-center">
            The variety of types of customizable QR codes will allow you to renew your print and digital media,
            improve the customer experience and integrate links to any type of content.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto mb-5">
            {qrTypes.map((item, index) => (
              <div key={index} className="border border-gray-300 rounded-xl flex flex-col items-center justify-center py-6 px-4 shadow-sm hover:shadow-xl hover:scale-105 hover:border-blue-600 cursor-pointer transition">
                <div className="text-blue-600 mb-2">{item.icon}</div>
                <p className="font-medium text-gray-800">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <Website />
        <Pdf />
        <Whatsapp />
        <Emails />
        <Wifis />
        <SocialMedia />
        <App />
        <Feedbacks />
        <VisitingCard />
        <Events />
        <Menu />
        <Images />
        <Video />
        <MP3 />
        
        <Footer />
      </div>
    </>
  )
}

export default Hero