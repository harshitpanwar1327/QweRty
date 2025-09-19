import website from '../assets/website.jpg'

const Event = () => {
  return (
    <div className="w-full min-h-[80vh] bg-gradient-to-l from-emerald-800 via-emerald-100 to-white flex justify-center items-center px-6 md:px-15 lg:px-28">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-7xl">

        <div className="flex flex-col justify-center max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">Event</h2>
            <p className="text-gray-600 text-xl mb-8">Renew your customers' experience, using a QR code to share your business or company's social networks. Share access to Instagram, Facebook, Twitter, LinkedIn and many more networks.</p>
            <button className="bg-blue-600 text-white text-lg px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition w-[50%] mb-5 hover:scale-102">Create QR code</button>
        </div>

        <div className="flex justify-center">
          <img src={website} alt="QR Code Generator" className="w-full max-w-lg" />
        </div>

      </div>
    </div>
  )
}

export default Event