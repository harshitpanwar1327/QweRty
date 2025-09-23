import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import FooterQr from '../assets/FooterQr.png'

const Footer = () => {
  return (
    <div className="bg-[radial-gradient(circle_at_center,_#330e2f_0%,_#1e0b1f_100%)] text-white py-8 px-4 md:px-12 lg:px-20 flex justify-between gap-10">
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
              <a href="#" target="_blank" className="!text-gray-400 hover:!text-white">QR Code Generator</a>
              <a href="#" target="_blank" className="!text-gray-400 hover:!text-white">Plans and prices</a>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Company</h3>
              <a href="#" target="_blank" className="!text-gray-400 hover:!text-white">Terms of Conditions</a>
              <a href="#" target="_blank" className="!text-gray-400 hover:!text-white">Privacy Policy</a>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Help</h3>
              <a href="#" target="_blank" className="!text-gray-400 hover:!text-white">Contact us</a>
              <a href="#" target="_blank" className="!text-gray-400 hover:!text-white">FAQ</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm pt-8 text-gray-400">
          <p>2025 &copy; QR Code Generator</p>
          <div className="flex items-center gap-6">
            <TwitterIcon className="cursor-pointer !transition duration-300 hover:scale-105 hover:text-white"/>
            <FacebookIcon className="cursor-pointer !transition duration-300 hover:scale-105 hover:text-white"/>
            <LinkedInIcon className="cursor-pointer !transition duration-300 hover:scale-105 hover:text-white"/>
          </div>
        </div>
      </div>

      <img src={FooterQr} alt="Scan" className="hidden lg:block rounded-md"/>
    </div>
  )
}

export default Footer