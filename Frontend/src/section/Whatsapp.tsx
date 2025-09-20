import website from '../assets/website.jpg'

const Whatsapp = () => {
  return (
    <div className="w-full min-h-[80vh] bg-gradient-to-r from-purple-500 via-purple-100 to-white flex justify-center items-center px-6 md:px-15 lg:px-28">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-7xl">
        
        <div className="flex justify-center">
          <img src={website} alt="QR Code Generator" className="w-full max-w-lg" />
        </div>

        <div className="flex flex-col justify-center max-w-md md:max-w-2xl lg:max-w-3xl text-center md:text-left mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Whatsapp</h2>
          <p className="text-gray-600 text-base sm:text-md md:text-lg lg:text-xl mb-6">With just one click, send directly to the address you choose on your page or application, to facilitate access and improve the experience of new users or clients.</p>
          <div className="flex justify-center md:justify-start">
            <button className="bg-blue-600 text-white text-base sm:text-lg px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-transform duration-200 hover:scale-105 w-[70%] sm:w-[50%] md:w-auto">Create QR code</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Whatsapp