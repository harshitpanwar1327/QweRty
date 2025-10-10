import { useState, useRef, useEffect } from 'react'
import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import API from '../../util/API'
import axios from "axios"
import { FilterAlt, SortRounded } from '@mui/icons-material'
import Filter from "../../modals/MyQrs/Filter"
import TablePagination from '@mui/material/TablePagination'
import { HashLoader  } from "react-spinners"
import { motion, AnimatePresence } from 'framer-motion'

interface QRData {
  qr_id: number;
  user_id: number;
  name: string;
  qr_type: 'website'|'text'|'whatsApp'|'email'|'wifi'|'location'|'vcard';
  content: object;
  design?: object;
  configuration?: object;
  qr: string;
  created_at: string;
  updated_at: string;
  state: string;
  total_scans: number;
}

const MyQRs = () => {
  const [qrData, setQrData] = useState<QRData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Most Recent');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [loading, setLoading] = useState<boolean>(false);

  const uid = sessionStorage.getItem("userId");

  const sortByRef = useRef<HTMLDivElement>(null);

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if(selectAll){
      setSelectedRows([]);
    }else{
      setSelectedRows(qrData.map((data)=>data.qr_id));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortByRef.current && !sortByRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchQr = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/qr-codes/${uid}`);
      setQrData(response.data.data);
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
    fetchQr();
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-screen flex">
      {loading && (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
          <HashLoader color="#dc3753" />
        </div>
      )}

      <NavigationBar />
      
      <div className="grow flex flex-col gap-2 p-2 overflow-auto">
        <Menubar heading='My QR Codes'/>

        <div className="grow bg-white rounded-md flex flex-col gap-4 p-2 overflow-y-auto">
          <div className="flex gap-4 self-end relative">
            <button className="py-1 px-3 flex items-center gap-2 text-gray-500 border border-gray-200 rounded" onClick={()=>setOpenFilterModal(true)}><FilterAlt sx={{fontSize: '18px'}} />Filter</button>

            <div className="relative" ref={sortByRef}>
              <button className="py-1 px-3 flex items-center gap-2 text-gray-500 border border-gray-200 rounded" onClick={()=>setShowDropdown(!showDropdown)}>
                <SortRounded sx={{ fontSize: '18px' }} />Sort by: {sortBy}
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div className="absolute bg-white right-0 mt-2 border border-gray-200 shadow-lg rounded-lg z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500"
                    onClick={()=>{
                      setShowDropdown(false);
                      setSortBy('Most Recent');
                    }}>
                      Most Recent
                    </p>
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500"
                    onClick={()=>{
                      setShowDropdown(false);
                      setSortBy('Name');
                    }}>
                      Name
                    </p>
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500"
                    onClick={()=>{
                      setShowDropdown(false);
                      setSortBy('Most Scanned');
                    }}>
                      Most Scanned
                    </p>
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500"
                    onClick={()=>{
                      setShowDropdown(false);
                      setSortBy('Last Modified');
                    }}>
                      Last Modified
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="border border-gray-200 p-2 rounded flex flex-col gap-2 overflow-y-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 w-full md:w-1/3">
                <span className="text-gray-500">🔍</span>
                <input type="text" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full outline-none text-gray-700"/>
              </div>

              <TablePagination
                className="rounded-md"
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>

            <div className="grow overflow-y-auto">
              <table className="w-full text-left p-3">
                <thead className="bg-gray-100 text-gray-500 text-sm">
                  <tr>
                    <th className="p-3 w-[5rem]"><input type="checkbox" checked={selectAll} onChange={handleSelectAll}/></th>
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
                      <td className="p-3 w-[5rem]"><input type="checkbox" checked={selectedRows.includes(data.qr_id)} onChange={()=>handleRowSelect(data.qr_id)}/></td>
                      <td className="p-3">{data.name}</td>
                      <td className="p-3">{data.qr_type}</td>
                      <td className="p-3">{new Date(data.created_at).toLocaleString()}</td>
                      <td className="p-3">{new Date(data.updated_at).toLocaleString()}</td>
                      <td className="p-3">{data.state}</td>
                      <td className="p-3">{data.total_scans}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {openFilterModal && <Filter setOpenFilterModal={setOpenFilterModal}/>}
    </div>
  )
}

export default MyQRs