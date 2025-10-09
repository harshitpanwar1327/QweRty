import { useState, useEffect } from "react"
import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import API from '../../util/API'

const qrTabsArray: string[] = ["All", "Static", "Dynamic", "Favorites"];

interface IQRData {
  qr_id: number;
  user_id: number;
  name: string;
  qr_type: 'website' | 'text' | 'whatsApp' | 'email' | 'wiFi' | 'location' | 'vCard';
  content: object;
  design?: object;
  configuration?: object;
  qr: string;
  created_at: string;
  updated_at: string;
  state?: string;
}

const MyQRs = () => {
  const [qrTab, setQrTab] = useState<string>('All');
  const [qrData, setQrData] = useState<IQRData[]>([]);
  // const [search, setSearch] = useState<string>('');

  const user_id = localStorage.getItem("user_id");

  const fetchQr = async () => {
    try {
      const response = await API.get(`/new-qr/${user_id}`);
      console.log(response.data);
      
      setQrData(response.data.data);
    } catch (error) {
      console.log(error.response?.data?.message || error);
    }
  }

  useEffect(()=>{
    fetchQr();
  }, []);

  return (
    <div className="w-screen flex">
      <NavigationBar />
      
      <div className="grow flex flex-col gap-2 p-2 overflow-auto">
        <Menubar heading='MyQRs'/>

        <div className="grow bg-white rounded-md overflow-y-auto flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <div className="grid grid-cols-6 gap-2">
              {qrTabsArray.map((tab, index) => (
              <button type="button" key={index} onClick={()=>setQrTab(tab)} className={`px-5 py-3 text-sm rounded-md ${qrTab === tab ? "text-pink-500 bg-pink-100" : "text-gray-600 hover:text-pink-500 hover:bg-pink-100"} transition duration-300`}>{tab}</button>
              ))}
            </div>
          </div>
          
          <div className=" border border-gray-300 p-3 rounded space-y-6">
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3">
              <span className="text-gray-500">🔍</span>
              <input type="text" placeholder="Search..." className="w-full outline-none text-gray-700"/>
            </div>

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
  )
}

export default MyQRs