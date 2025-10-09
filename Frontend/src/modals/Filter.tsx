

const Filter = ({setOpenFilterModal}) => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex justify-end items-center bg-[#0000005a] z-10' onClick={()=>setOpenFilterModal(false)}>
        <div className='relative w-1/3 bg-white p-6 rounded-md shadow-md m-2' onClick={(e)=>e.stopPropagation()}>
            <h2 className='font-semibold text-xl pb-5'>Filter results</h2>
            <hr className="text-gray-400"/>
            <h3 className='font-semibold text-md py-5'>QR code type</h3>
        </div>
    </div>
  )
}

export default Filter