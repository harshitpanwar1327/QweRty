

const NavigationBar = () => {
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="mx-auto flex justify-between items-center py-4 px-8">
        
        <div className="flex items-center gap-2">
          <div className="w-[2rem] h-[2rem] bg-blue-500 text-white rounded-md flex items-center justify-center text-lg font-bold">QR</div>
          <span className="font-bold text-2xl text-black">QRFY</span>
        </div>

        <div className="flex gap-4">
          <button className="px-16 py-2 border border-gray-300 rounded-full text-blue-600 font-medium hover:bg-gray-100 transition hover:scale-102">Log In</button>
          <button className="px-8 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition hover:scale-102">Register</button>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar