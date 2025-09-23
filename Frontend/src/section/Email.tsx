import website from '../assets/website.jpg'

const Email = () => {
  return (
    <div className="w-full min-h-[85vh] bg-[linear-gradient(-135deg,theme(colors.red.500),theme(colors.red.100),white)] flex justify-center items-center gap-8 py-8 md:py-16 lg:py-24 px-4 md:px-12 lg:px-20">

      <div className="w-1/2 flex flex-col justify-center gap-4 text-center md:text-left px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Email</h2>
        <p className="text-gray-600 md:text-lg lg:text-xl">Simplify communication with ready-to-compose emails. Pre-fill recipient addresses, so users can send inquiries or requests quickly without manually typing details.</p>
        <button className="self-start bg-blue-600 text-white text-lg px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-transform duration-300 hover:scale-105">Create QR code</button>
      </div>

      <img src={website} alt="img" className="w-1/3" />
    </div>
  )
}

export default Email