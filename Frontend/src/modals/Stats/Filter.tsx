import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Close, DeleteRounded } from "@mui/icons-material"
import API from '../../util/API'
import axios from 'axios'
import { HashLoader } from "react-spinners"

interface FilterData {
  qrCodes: string[],
  countries: string[],
  cities: string[],
  os: string[]
}

interface FilterProp {
  setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
  setFilter: React.Dispatch<React.SetStateAction<FilterData>>;
  currentFilter?: FilterData;
}

const Filter: React.FC<FilterProp> = ({ setOpenFilterModal, setFilter, currentFilter }) => {
  const [qrCodes, setQrCodes] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [os, setOs] = useState<string[]>([]);

  const [filterData, setFilterData] = useState<FilterData>({
    qrCodes: [],
    countries: [],
    cities: [],
    os: []
  })

  const uid = sessionStorage.getItem("userId");

  const [loading, setLoading] = useState<boolean>(false);

  const fetchFilterData = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/stats-filter/${uid}`);
      setFilterData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message || error);
      } else {
        console.log("QR generation failed!");
      }
    }
  }

  useEffect(()=>{
    fetchFilterData();
  }, []);

  useEffect(() => {
    if (currentFilter) {
      setQrCodes(currentFilter.qrCodes);
      setCountries(currentFilter.countries);
      setCities(currentFilter.cities);
      setOs(currentFilter.os);
    }
  }, [currentFilter]);

  const toggleQrCodes = (qr: string) => {
    setQrCodes((prev) => prev.includes(qr) ? prev.filter((q) => q !== qr) : [...prev, qr])
  }

  const toggleCountry = (country: string) => {
    setCountries((prev) => prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country])
  }

  const toggleCity = (city: string) => {
    setCities((prev) => prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city])
  }

  const toggleOs = (os: string) => {
    setOs((prev) => prev.includes(os) ? prev.filter((o) => o !== os) : [...prev, os])
  }

  const handleClearFilter = () => {
    setQrCodes([]);
    setCountries([]);
    setCities([]);
    setOs([]);
  }

  const handleResult = () => {
    setFilter({
      qrCodes: [...qrCodes],
      countries: [...countries],
      cities: [...cities],
      os: [...os],
    })
    setOpenFilterModal(false);
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen p-4 flex justify-end items-center bg-[#0000005a] z-10' onClick={()=>setOpenFilterModal(false)}>
      <motion.div className="w-full md:w-1/2 lg:w-1/3 max-h-[90vh] bg-white rounded-md shadow-md p-4 flex flex-col gap-4 overflow-auto relative" onClick={(e)=>e.stopPropagation()}
        initial={{opacity: 0, x: '100%'}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: '100%'}}
        transition={{duration: 0.3}}
      >
        {loading && (
          <div className='absolute top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
            <HashLoader color="#dc3753" />
          </div>
        )}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">Filter results</h2>
          <div className="flex justify-center items-center p-1 hover:bg-gray-100 rounded-full text-gray-500 cursor-pointer">
            <Close onClick={()=>setOpenFilterModal(false)}/>
          </div>
        </div>

        <hr className="text-gray-200"/>

        <h3 className='text-black font-semibold'>QR codes</h3>
        {filterData.qrCodes?.length > 0 &&
          <div className="flex flex-wrap gap-2">
            {filterData.qrCodes?.map((qr, index) => (
              <button key={index} onClick={()=>toggleQrCodes(qr)} className={`flex items-center gap-2 py-2 px-3 text-sm rounded-md border transition-all duration-300 ${qrCodes.includes(qr)? "bg-pink-50 border-pink-500 text-pink-600": "border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
                {qr}
              </button>
            ))}
          </div>
        }

        <hr className="text-gray-200"/>

        <h3 className='text-black font-semibold'>Countries</h3>
        {filterData.countries?.length > 0 &&
          <div className="flex flex-wrap gap-2">
            {filterData.countries?.map((country, index) => (
              <button key={index} onClick={()=>toggleCountry(country)} className={`flex items-center gap-2 py-2 px-3 text-sm rounded-md border transition-all duration-300 ${countries.includes(country)? "bg-pink-50 border-pink-500 text-pink-600": "border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
                {country}
              </button>
            ))}
          </div>
        }

        <hr className="text-gray-200"/>

        <h3 className='text-black font-semibold'>Cities</h3>
        {filterData.cities?.length > 0 &&
          <div className="flex flex-wrap gap-2">
            {filterData.cities?.map((city, index) => (
              <button key={index} onClick={()=>toggleCity(city)} className={`flex items-center gap-2 py-2 px-3 text-sm rounded-md border transition-all duration-300 ${cities.includes(city)? "bg-pink-50 border-pink-500 text-pink-600": "border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
                {city}
              </button>
            ))}
          </div>
        }

        <hr className="text-gray-200"/>

        <h3 className='text-black font-semibold'>Operating System</h3>
        {filterData.os?.length > 0 &&
          <div className="flex flex-wrap gap-2">
            {filterData.os?.map((system, index) => (
              <button key={index} onClick={()=>toggleOs(system)} className={`flex items-center gap-2 py-2 px-3 text-sm rounded-md border transition-all duration-300 ${os.includes(system)? "bg-pink-50 border-pink-500 text-pink-600": "border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
                {system}
              </button>
            ))}
          </div>
        }

        <hr className="text-gray-200"/>
                
        <div className="self-end flex items-center gap-4">
          {(qrCodes.length > 0 || countries.length > 0 || cities.length > 0 || os.length > 0) && (
            <button className="flex items-center gap-1 font-semibold text-blue-500 hover:text-blue-600  transition duration-300" onClick={handleClearFilter}><DeleteRounded /> Clear filters</button>
          )}
          <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 py-2 px-3 text-white font-semibold rounded-full" onClick={handleResult}>See results</button>
        </div>
      </motion.div>
    </div>
  )
}

export default Filter