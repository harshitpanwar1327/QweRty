import { useEffect, useState } from 'react'
import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import { FilterAlt, QrCode, QrCodeScanner } from "@mui/icons-material"
import { motion, AnimatePresence } from 'motion/react'
import Filter from '../../modals/Stats/Filter'
import API from '../../util/API'
import axios from 'axios'
import { HashLoader } from "react-spinners"

interface Filter {
  qrCodes: string[],
  countries: string[],
  cities: string[],
  os: string[]
}

interface ScanStat {
  device_type?: string;
  country?: string;
  city?: string;
  scans: number;
}

interface StatsData {
  totalQrs: number;
  totalScans: number;
  os: ScanStat[];
  countries: ScanStat[];
  cities: ScanStat[];
}

const Stats = () => {
  const [openOs, setOpenOs] = useState<boolean>(false);
  const [openCountry, setOpenCountry] = useState<boolean>(false);
  const [openCity, setOpenCity] = useState<boolean>(false);

  const uid = sessionStorage.getItem('userId');

  const [date, setDate] = useState<string>('today');
  const [filter, setFilter] = useState<Filter>({
    qrCodes: [],
    countries: [],
    cities: [],
    os: []
  });
  const [statsData, setStatsData] = useState<StatsData>({
    totalQrs: 0,
    totalScans: 0,
    os: [],
    countries: [],
    cities: []
  });

  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await API.post(`/get-stats`, {
        uid,
        filter,
        date
      });
      setStatsData(response.data.data);
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
    fetchStats();
  }, [date, filter])

  return (
    <div className="w-screen flex">
      {loading && (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
          <HashLoader color="#dc3753" />
        </div>
      )}

      <NavigationBar />
      
      <div className="grow flex flex-col gap-2 p-2 overflow-auto">
        <Menubar heading='Stats'/>
        
        <div className='grow bg-white rounded-md flex flex-col gap-4 p-2 overflow-y-auto'>
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-2">
              <select name="date" id="date" className='py-1 px-3 text-gray-500 border border-gray-200 rounded' value={date} onChange={(e)=>setDate(e.target.value)}>
                <option value="today">Today</option>
                <option value="lastSevenDays">Last 7 days</option>
                <option value="lastThirtyDays">Last 30 days</option>
                <option value="lastNintyDays">Last 90 days</option>
                <option value="lifetime">Lifetime</option>
              </select>
              <button className="py-1 px-3 flex items-center gap-2 text-gray-500 border border-gray-200 rounded" onClick={()=>setOpenFilterModal(true)}><FilterAlt sx={{fontSize: '18px'}} />Filter</button>
            </div>

            {/* <button className='py-2 px-4 text-pink-500 text-sm font-semibold border border-gray-200 rounded-full hover:bg-gray-100 transition duration-300'>Export information</button> */}
          </div>

          <div className='grid grid-cols-4 gap-2 p-2 bg-gray-100 rounded-md'>
            <div className='flex flex-col items-center gap-2 bg-white rounded-md p-2'>
              <h2 className='text-4xl font-semibold'>{statsData.totalQrs}</h2>
              <p className='text-sm font-semibold text-gray-600 flex items-center gap-1'><QrCode sx={{fontSize: '16px'}} /> Total QR Codes</p>
            </div>
            <div className='flex flex-col items-center gap-2 bg-white rounded-md p-2'>
              <h2 className='text-4xl font-semibold'>{statsData.totalScans}</h2>
              <p className='text-sm font-semibold text-gray-600 flex items-center gap-1'><QrCodeScanner sx={{fontSize: '16px'}} /> Total Scans</p>
            </div>
          </div>

          <div className='overflow-y-auto space-y-4'>
            <div className='flex flex-col gap-2 border border-gray-200 rounded-md p-4 cursor-pointer overflow-x-auto' onClick={()=>setOpenOs(!openOs)}>
              <p className='font-semibold'>Scans by operating system</p>
              <AnimatePresence>
                {openOs &&
                  <motion.div onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className='grid grid-cols-[1fr_3fr_1fr_5fr_1fr] bg-gray-100 text-sm font-semibold text-gray-600 py-2 px-4 rounded'>
                      <p>#</p>
                      <p>Operating Syst.</p>
                      <p>Scans</p>
                      <p></p>
                      <p>%</p>
                    </div>
                    {statsData.os.map((type, index)=>(
                      <div className='grid grid-cols-[1fr_3fr_1fr_5fr_1fr] text-sm py-2 px-4' key={index}>
                        <p>{index+1}</p>
                        <p>{type?.device_type}</p>
                        <p>{type.scans}</p>
                        <div className='p-2'>
                          <div className={`w-full h-2 rounded bg-gray-50`}>
                            <div className={`h-2 rounded bg-blue-500 transition duration-300`} style={{ width: `${Math.ceil((type.scans / statsData.totalScans) * 100)}%` }}/>
                          </div>
                        </div>
                        <p>{((type.scans/statsData.totalScans)*100).toFixed(2)}%</p>
                      </div>
                    ))}
                  </motion.div>
                }
              </AnimatePresence>
            </div>

            <div className='flex flex-col gap-2 border border-gray-200 rounded-md p-4 cursor-pointer overflow-x-auto' onClick={()=>setOpenCountry(!openCountry)}>
              <p className='font-semibold'>Scans by country</p>
              <AnimatePresence>
                {openCountry &&
                  <motion.div onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className='grid grid-cols-[1fr_3fr_1fr_5fr_1fr] bg-gray-100 text-sm font-semibold text-gray-600 py-2 px-4 rounded'>
                      <p>#</p>
                      <p>Country</p>
                      <p>Scans</p>
                      <p></p>
                      <p>%</p>
                    </div>
                    {statsData.countries.map((country, index)=>(
                      <div className='grid grid-cols-[1fr_3fr_1fr_5fr_1fr] text-sm py-2 px-4' key={index}>
                        <p>{index+1}</p>
                        <p>{country?.country}</p>
                        <p>{country?.scans}</p>
                        <div className='p-2'>
                          <div className={`w-full h-2 rounded bg-gray-50`}>
                            <div className={`h-2 rounded bg-blue-500 transition duration-300`} style={{ width: `${Math.ceil((country.scans / statsData.totalScans) * 100)}%` }}/>
                          </div>
                        </div>
                        <p>{((country.scans/statsData.totalScans)*100).toFixed(2)}%</p>
                      </div>
                    ))}
                  </motion.div>
                }
              </AnimatePresence>
            </div>

            <div className='flex flex-col gap-2 border border-gray-200 rounded-md p-4 cursor-pointer overflow-x-auto' onClick={()=>setOpenCity(!openCity)}>
              <p className='font-semibold'>Scans by cities</p>
              <AnimatePresence>
                {openCity &&
                  <motion.div onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className='grid grid-cols-[1fr_3fr_1fr_5fr_1fr] bg-gray-100 text-sm font-semibold text-gray-600 py-2 px-4 rounded'>
                      <p>#</p>
                      <p>City</p>
                      <p>Scans</p>
                      <p></p>
                      <p>%</p>
                    </div>
                    {statsData.cities.map((city, index)=>(
                      <div className='grid grid-cols-[1fr_3fr_1fr_5fr_1fr] text-sm py-2 px-4' key={index}>
                        <p>{index+1}</p>
                        <p>{city?.city}</p>
                        <p>{city?.scans}</p>
                        <div className='p-2'>
                          <div className={`w-full h-2 rounded bg-gray-50`}>
                            <div className={`h-2 rounded bg-blue-500 transition duration-300`} style={{ width: `${Math.ceil((city.scans / statsData.totalScans) * 100)}%` }}/>
                          </div>
                        </div>
                        <p>{((city.scans/statsData.totalScans)*100).toFixed(2)}%</p>
                      </div>
                    ))}
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openFilterModal && <Filter setOpenFilterModal={setOpenFilterModal} setFilter={setFilter} currentFilter={filter} />}
      </AnimatePresence>
    </div>
  )
}

export default Stats