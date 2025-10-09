const Filter = ({ setOpenFilterModal }) => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen p-4 flex justify-end items-center bg-[#0000005a] z-10' onClick={()=>setOpenFilterModal(false)}>
      <div className='w-full md:w-1/2 lg:w-1/3 flex flex-col gap-4 bg-white p-4 rounded-md shadow-md' onClick={(e)=>e.stopPropagation()}>
        <h2 className='font-semibold text-xl'>Filter results</h2>
        <hr className="text-gray-200"/>
        <h3 className='font-semibold'>QR code type</h3>
      </div>
    </div>
  )
}

export default Filter