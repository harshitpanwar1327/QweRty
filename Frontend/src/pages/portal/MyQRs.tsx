import { useState, useEffect } from "react"
import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import API from '../../util/API'
import axios from "axios"
import { toast } from "react-toastify"
import { FilterAlt, SortRounded, ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material'

interface QRData {
  qr_id: number;
  user_id: number;
  name: string;
  qr_type: 'website' | 'text' | 'whatsApp' | 'email' | 'wifi' | 'location' | 'vcard';
  content: object;
  design?: object;
  configuration?: object;
  qr: string;
  created_at: string;
  updated_at: string;
  state: string;
}

const MyQRs = () => {
  const [qrData, setQrData] = useState<QRData[]>([]);
  const [search, setSearch] = useState<string>('');

  const uid = sessionStorage.getItem("userId");

  const fetchQr = async () => {
    try {
      const response = await API.get(`/new-qr/${uid}`);
      console.log(response.data);
      setQrData(response.data.data);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error);
      } else {
        toast.error("QR generation failed!");
      }
    }
  }

  useEffect(()=>{
    fetchQr();
  }, []);

  return (
    <div className="w-screen flex">
      <NavigationBar />
      
      <div className="grow flex flex-col gap-2 p-2 overflow-auto">
        <Menubar heading='My QR Codes'/>

        <div className="grow bg-white rounded-md flex flex-col gap-4 p-2 overflow-y-auto">
          <div className="flex gap-4 self-end">
            <button className="py-1 px-3 flex items-center gap-2 text-gray-500 border border-gray-200 rounded"><FilterAlt sx={{fontSize: '18px'}} /> Filter</button>
            <button className="py-1 px-3 flex items-center gap-2 text-gray-500 border border-gray-200 rounded"><SortRounded sx={{fontSize: '18px'}} /> Sort by: Name</button>
          </div>

          <div className="border border-gray-200 p-2 rounded flex flex-col gap-2 overflow-y-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-1 w-full md:w-1/3">
                <span className="text-gray-500">🔍</span>
                <input type="text" placeholder="Search..." className="w-full outline-none text-gray-700"/>
              </div>

              <div className="flex items-center gap-4 text-gray-500 text-xs font-bold">
                <p>1 of 1</p>
                <div>
                  <ChevronLeftRounded />
                  <ChevronRightRounded />
                </div>
                <select name="dataLimit" id="dataLimit" className="border border-gray-200 rounded-md px-3 py-1">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>

            <div className="grow overflow-y-auto">
              <table className="w-full text-left p-3">
                <thead className="bg-gray-100 text-gray-500 text-sm">
                  <tr>
                    <th className="p-3 w-[5rem]"><input type="checkbox" /></th>
                    <th className="p-3 font-medium">Name</th>
                    <th className="p-3 font-medium">QR Type</th>
                    <th className="p-3 font-medium">Created</th>
                    <th className="p-3 font-medium">Edited</th>
                    <th className="p-3 font-medium">State</th>
                    <th className="p-3 font-medium">Scans</th>
                    <th className="p-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {qrData.map((data,index)=>(
                    <tr key={index}>
                      <td className="p-3 w-[5rem]"><input type="checkbox" /></td>
                      <td className="p-3">{data.name}</td>
                      <td className="p-3">{data.qr_type}</td>
                      <td className="p-3">{new Date(data.created_at).toLocaleString()}</td>
                      <td className="p-3">{new Date(data.updated_at).toLocaleString()}</td>
                      <td className="p-3">State</td>
                      <td className="p-3">0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyQRs