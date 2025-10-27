import YouTubeIcon from "@mui/icons-material/YouTube"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import FooterQr from '../assets/FooterQr.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[radial-gradient(circle_at_center,_#330e2f_0%,_#1e0b1f_100%)] text-white py-8 px-4 md:px-12 lg:px-20 mt-8 flex justify-between gap-10">
      <div className="w-full lg:w-2/3">
        <div className="flex flex-col md:flex-row gap-4 pb-8">
          <div className="self-start flex items-center justify-center py-2 px-3 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
          <div>
            <h2 className="font-bold text-xl">Start Generating QR Codes Today</h2>
            <p className="text-sm text-gray-300">Sign up for free and create your first QR code in under a minute.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-10 py-12 border-y border-gray-700">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">QweRty</h3>
              <Link to="/new-qr" className="!text-gray-400 hover:!text-white">QR Generator</Link>
              <Link to="/pricing" className="!text-gray-400 hover:!text-white">Plans and Pricings</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Company</h3>
              <Link to="/t&c" className="!text-gray-400 hover:!text-white">Terms and Conditions</Link>
              <Link to="/privacy-policy" className="!text-gray-400 hover:!text-white">Privacy Policy</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Help</h3>
              <Link to="/contact" className="!text-gray-400 hover:!text-white">Contact us</Link>
              <Link to="/faq" className="!text-gray-400 hover:!text-white">FAQ</Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm pt-8 text-gray-400">
          <p>2025 &copy; QR Code Generator</p>
          <div className="flex items-center gap-6">
            <a href="https://www.youtube.com/channel/UCdL7XtgIMC64BQ4SpZ8qWDA" target="_blank">
              <YouTubeIcon className="text-white/50 cursor-pointer !transition duration-300 hover:scale-105 hover:text-white"/>
            </a>
            <a href="https://www.instagram.com/codeweave1327/" target="_blank">
              <InstagramIcon className="text-white/50 cursor-pointer !transition duration-300 hover:scale-105 hover:text-white"/>
            </a>
            <a href="https://www.linkedin.com/company/codeweave1327/" target="_blank">
              <LinkedInIcon className="text-white/50 cursor-pointer !transition duration-300 hover:scale-105 hover:text-white"/>
            </a>
          </div>
        </div>
      </div>

      <img src={FooterQr} alt="Scan" className="hidden lg:block rounded-md"/>
    </div>
  )
}

export default Footer