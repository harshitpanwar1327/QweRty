import LanguageIcon from "@mui/icons-material/Language";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <div className="bg-black text-white py-10">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-[2rem] h-[2rem] bg-blue-500 rounded-md flex items-center justify-center text-lg font-bold">QR</div>
          <div>
            <h2 className="font-bold text-lg">QweRty</h2>
            <p className="text-sm text-gray-300">Create your own QR codes and boost your business or idea</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 py-8">
        <div>
          <h3 className="font-semibold mb-3">QRFY</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#">QR Code Generator</a></li>
            <li><a href="#">Plans and prices</a></li>
            <li><a href="#">About us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#">Terms of Use and Contract</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookies Policy</a></li>
            <li><a href="#">GDPR</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#">QR Codes for</a></li>
            <li><a href="#">QR Codes on</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Help</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#">Contact us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">API Docs</a></li>
            <li><a href="#">Report abuse</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 text-sm text-gray-400">
        <p>2025 © QR Code Generator</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <span className="flex items-center gap-1 cursor-pointer">
            <LanguageIcon fontSize="small" />English
          </span>
          <span className="flex items-center gap-1 cursor-pointer">
            <AttachMoneyIcon fontSize="small" />Currency
          </span>
          <div className="flex gap-4 text-white">
            <TwitterIcon className="hover:cursor-pointer hover:scale-105 hover:text-blue-500"/>
            <FacebookIcon className="hover:cursor-pointer hover:scale-105 hover:text-blue-500" />
            <LinkedInIcon className="hover:cursor-pointer hover:scale-105 hover:text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer