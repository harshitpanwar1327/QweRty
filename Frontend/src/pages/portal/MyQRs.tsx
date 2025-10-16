import { useState, useRef, useEffect } from 'react'
import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import API from '../../util/API'
import axios from "axios"
import Filter from "../../modals/MyQrs/Filter"
import TablePagination from '@mui/material/TablePagination'
import { HashLoader } from "react-spinners"
import { motion, AnimatePresence } from 'framer-motion'
import ViewQr from '../../modals/MyQrs/ViewQr'
import { Language, AccountBox, WhatsApp, Email, Wifi, TextFields, LocationOn, MoreVert, DownloadRounded, DeleteRounded, FilterAlt, SortRounded, EditRounded, Delete } from "@mui/icons-material"
// import { PictureAsPdf, Image, Videocam, Apps, Event, QueueMusic, People, Feedback, Badge, Loop, PlayArrowRounded, PauseCircleOutline } from "@mui/icons-material"
// import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import DownloadQR from '../../modals/DownloadQR'
import { toast } from 'react-toastify'

interface QRData {
  qr_id: number;
  user_id: number;
  name: string;
  qr_type: 'website'|'text'|'whatsapp'|'email'|'wifi'|'location'|'vcard';
  content: object;
  design?: object;
  configuration?: object;
  qr: string;
  created_at: string;
  updated_at: string;
  state: string;
  total_scans: number;
}

const sortByOptions = ['Most Recent', 'Name', 'Most Scanned', 'Last Modified'];

const myQrOptions = [
  { icon: <DownloadRounded sx={{fontSize: '16px'}} />, label: "Download" },
  { icon: <EditRounded sx={{fontSize: '16px'}} />, label: "Edit" },
  { icon: <DeleteRounded sx={{fontSize: '16px'}} />, label: "Delete" }
]

const qrTypes = {
  website: { icon: <Language sx={{fontSize: '16px'}} />, label: "Website" },
  text: { icon: <TextFields sx={{fontSize: '16px'}} />, label: "Text" },
  whatsapp: { icon: <WhatsApp sx={{fontSize: '16px'}} />, label: "WhatsApp" },
  email: { icon: <Email sx={{fontSize: '16px'}} />, label: "Email" },
  wifi: { icon: <Wifi sx={{fontSize: '16px'}} />, label: "WiFi" },
  location: { icon: <LocationOn sx={{fontSize: '16px'}} />, label: "Location" },
  vcard: { icon: <AccountBox sx={{fontSize: '16px'}} />, label: "vCard" },
  // social: { icon: <People sx={{fontSize: '16px'}} />, label: "Social Media" },
  // apps: { icon: <Apps sx={{fontSize: '16px'}} />, label: "Apps" },
  // feedback: { icon: <Feedback sx={{fontSize: '16px'}} />, label: "Feedback" },
  // pdf: { icon: <PictureAsPdf sx={{fontSize: '16px'}} />, label: "PDF" },
  // images: { icon: <Image sx={{fontSize: '16px'}} />, label: "Images" },
  // video: { icon: <Videocam sx={{fontSize: '16px'}} />, label: "Video" },
  // mp3: { icon: <QueueMusic sx={{fontSize: '16px'}} />, label: "MP3" },
  // event: { icon: <Event sx={{fontSize: '16px'}} />, label: "Event" },
  // vcardplus: { icon: <Badge sx={{fontSize: '16px'}} />, label: "vCard Plus" },
};

interface FilterData {
  activeStatus: string[],
  selectedType: string[]
}

const MyQRs = () => {
  const [qrData, setQrData] = useState<QRData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Most Recent');
  const [filterData, setFilterData] = useState<FilterData>({
    activeStatus: [],
    selectedType: []
  });

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openViewQrModal, setOpenViewQrModal] = useState<boolean>(false);
  const [openDownloadModal, setOpenDownloadModal] = useState<boolean>(false);
  const [selectedQr, setselectedQr] = useState<QRData>({
    qr_id: 0,
    user_id: 0,
    name: '',
    qr_type: 'website',
    content: {},
    design: {},
    configuration: {},
    qr: '',
    created_at: '',
    updated_at: '',
    state: '',
    total_scans: 0,
  });

  const [activeOptionRow, setActiveOptionRow] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAllRows, setSelectAllRows] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);

  const uid = sessionStorage.getItem("userId");

  const sortByRef = useRef<HTMLDivElement>(null);
  const activeOptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortByRef.current && !sortByRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      } 
      if (activeOptionRef.current && !activeOptionRef.current.contains(event.target as Node)) {
        setActiveOptionRow(null);
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
      const response = await API.post(`/get-qr`, {
        search,
        sortBy,
        filterData,
        uid,
        page,
        rowsPerPage
      });
      setQrData(response.data.data);
      setTotalData(response.data.total);
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
  }, [search, sortBy, filterData, page, rowsPerPage]);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if(selectAllRows){
      setSelectedRows([]);
    }else{
      setSelectedRows(qrData.map((data)=>data.qr_id));
    }
    setSelectAllRows(!selectAllRows);
  };

  const handleSelectedRows = ()=>{
    setSelectedRows([]);
    setSelectAllRows(false);
  }

  const handleQr = (data: QRData)=>{
    setOpenViewQrModal(true);
    setselectedQr(data);
  }

  const handleOption = (index: number, data: QRData) => {
    setActiveOptionRow(null);

    if(index===0) {
      handleDownload(data);
    } else if(index===1) {
      handleEdit();
    } else if(index===2) {
      handleDelete([data.qr_id]);
    } else {
      console.log('Invalid index.');
    }
  }

  const handleDownload = (data: QRData) => {
    setOpenDownloadModal(true);
    setselectedQr(data);
  }

  const handleEdit = () => {
    toast.info('This feature is coming soon.');
  }

  const handleDelete = async (ids: number[]) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false,
        allowEscapeKey: false
      });
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        setLoading(true);
        await API.delete(`/qr`, {
          data: { ids }
        });
        fetchQr();
        setLoading(false);
        Swal.fire({
          title: "Deleted!",
          text: "QR has been deleted.",
          icon: "success"
        });
      }
    } catch (error: unknown) {
      setLoading(false);
      console.log(error);
      if (axios.isAxiosError(error)) {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "QR not deleted!",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Unexpected error occurred!",
          icon: "error",
        });
      }
    }
  };

  // const handleStatus = async (ids: number[]) => {
  //   try {
  //     setLoading(true);
  //     await API.put('/qr-status', {
  //       data: { ids }
  //     });
  //     fetchQr();
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     if (axios.isAxiosError(error)) {
  //       toast.error(error.response?.data?.message || "QR not deleted!");
  //     } else {
  //       toast.error("Unexpected error occurred!");
  //     }
  //   }
  // }

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
                    {sortByOptions.map((option, index) => (
                      <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500" key={index}
                      onClick={()=>{
                        setShowDropdown(false);
                        setSortBy(option);
                      }}>
                        {option}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grow border border-gray-200 p-2 rounded flex flex-col gap-2 overflow-y-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 w-full md:w-1/3">
                <span className="text-gray-500">🔍</span>
                <input type="text" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full outline-none text-gray-700"/>
              </div>

              <TablePagination
                className="rounded-md"
                component="div"
                count={totalData}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>

            <div className="grow overflow-auto">
              <table className="w-full text-left p-3">
                <thead className="bg-gray-100 text-gray-500 text-sm">
                  <tr>
                    <th className='p-3'><input type="checkbox" checked={selectAllRows} onChange={handleSelectAll}/></th>
                    <th className='pr-15 md:p-0'></th>
                    <th className="p-3">Name</th>
                    <th className="p-3">QR Type</th>
                    <th className="p-3">Created</th>
                    <th className="p-3">Edited</th>
                    <th className="p-3">State</th>
                    <th className="p-3">Scans</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {qrData.length > 0 ? (
                    qrData.map((data)=>(
                      <tr key={data.qr_id}>
                        <td className="p-3">
                          <input type="checkbox" checked={selectedRows.includes(data.qr_id)} onChange={()=>handleRowSelect(data.qr_id)}/>
                        </td>
                        <td className='p-3 pr-0' onClick={()=>handleQr(data)}>
                          <img src={data.qr} alt="Qr" className='w-12 h-12 object-contain cursor-pointer border border-gray-200 rounded'/>
                        </td>
                        <td className="p-3">{data.name}</td>
                        <td className="p-3">
                          <div className='flex justify-center items-center gap-1 py-1 px-2 bg-pink-100 text-pink-500 rounded'>
                            {qrTypes[data.qr_type]?.icon}
                            <p className='text-sm font-semibold'>{qrTypes[data.qr_type]?.label}</p>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                          {new Date(data.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                          {new Date(data.updated_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-3">
                          <p className={`text-sm font-semibold text-white px-2 py-1 rounded flex justify-center items-center ${data.state==='Active'? 'bg-[#46CB48]': data.state==='Pause'? 'bg-blue-500': 'bg-[#FE8E3E]'}`}>{data.state}</p>
                        </td>
                        <td className="p-3 font-semibold">{data.total_scans}</td>
                        <td className='p-3'>
                          <div className='relative' ref={activeOptionRef}>
                            <MoreVert className='cursor-pointer' onClick={()=>setActiveOptionRow(activeOptionRow===data.qr_id ? null: data.qr_id)}/>
                            
                            <AnimatePresence>
                              {activeOptionRow===data.qr_id && (
                                <motion.div className="absolute right-6 top-0 bg-white border border-gray-200 shadow-lg rounded-lg z-10"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {myQrOptions.map((option, index) => (
                                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500 flex items-center gap-2" key={index} onClick={()=>handleOption(index, data)}>
                                      {option.icon}
                                      <span>{option.label}</span>
                                    </p>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-3" colSpan={8}>
                        <p className='text-center text-sm font-semibold text-gray-500'>No QR available</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selectedRows.length > 0 && (
          <div className="w-full bg-white rounded-b-md flex justify-between items-center p-2 border-t border-gray-200">
            <button className="text-blue-500 font-semibold px-4 py-2 rounded-full hover:bg-blue-50 transition duration-500" onClick={() => handleSelectedRows()}>Cancel</button>

            <div className="flex items-center gap-4">
              <button className="text-blue-500 font-semibold px-4 py-2 rounded-full hover:bg-blue-50 transition duration-500 flex items-center gap-2 border border-gray-200" onClick={()=>handleDelete(selectedRows)}><Delete /> Delete</button>
              {/* <button className="text-blue-500 font-semibold px-4 py-2 rounded-full hover:bg-blue-50 transition duration-500 flex items-center gap-2 border border-gray-200" onClick={()=>handleStatus(selectedRows)}><PauseCircleOutline /> Pause</button> */}
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <p className="text-sm"><strong>{selectedRows.length}</strong> Selected</p>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {openFilterModal && <Filter setOpenFilterModal={setOpenFilterModal} setFilterData={setFilterData}/>}
      </AnimatePresence>
      <AnimatePresence>
        {openViewQrModal && <ViewQr setOpenViewQrModal={setOpenViewQrModal} selectedQr={selectedQr}/>}
      </AnimatePresence>
      <AnimatePresence>
        {openDownloadModal && <DownloadQR setOpenDownloadModal={setOpenDownloadModal} qrPreview={selectedQr.qr} qrName={selectedQr.name} />}
      </AnimatePresence>
    </div>
  )
}

export default MyQRs