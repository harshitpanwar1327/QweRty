import { useState, useEffect, type ReactNode } from "react"
import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"
import { Language, WhatsApp, Email, LocationOn, PlayArrowRounded, ArrowBack } from "@mui/icons-material"
// import { People } from "@mui/icons-material"
import { Select, MenuItem } from "@mui/material"
import API from "../../util/API"
import axios from "axios"
import { toast } from "react-toastify"
import { HashLoader } from "react-spinners"
import type { AppDispatch, RootState } from '../../app/Store.js'
import { useSelector, useDispatch } from 'react-redux'
import { activeTab } from "../../features/qrType/QrTypeSlice.js"
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, useParams, useNavigate } from "react-router-dom"
import WebsiteEditLogic from "../../components/EditQr/WebsiteEditLogic.js"
import WhatsappEditLogic from "../../components/EditQr/WhatsappEditLogic.js"
import EmailEditLogic from "../../components/EditQr/EmailEditLogic.js"
import LocationEditLogic from "../../components/EditQr/LocationEditLogic.js"
import EmailImage from '../../assets/hero/Email.png'
import LocationImage from '../../assets/hero/Location.png'
import WebsiteImage from '../../assets/hero/Website.png'
import WhatsappImage from '../../assets/hero/Whatsapp.png'
import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"

interface QRTypeArray {
  key: string,
  icon: ReactNode,
  label: string
}

const qrTypes: QRTypeArray[] = [
  { key: "website", icon: <Language fontSize="medium" />, label: "Website" },
  { key: "whatsapp", icon: <WhatsApp fontSize="medium" />, label: "WhatsApp" },
  { key: "email", icon: <Email fontSize="medium" />, label: "Email" },
  { key: "location", icon: <LocationOn fontSize="medium" />, label: "Location" },
  // { key: "social", icon: <People fontSize="medium" />, label: "Social Media" },
  // { key: "apps", icon: <Apps fontSize="medium" />, label: "Apps" },
  // { key: "feedback", icon: <Feedback fontSize="medium" />, label: "Feedback" },
  // { key: "pdf", icon: <PictureAsPdf fontSize="medium" />, label: "PDF" },
  // { key: "images", icon: <Image fontSize="medium" />, label: "Images" },
  // { key: "video", icon: <Videocam fontSize="medium" />, label: "Video" },
  // { key: "mp3", icon: <QueueMusic fontSize="medium" />, label: "MP3" },
  // { key: "event", icon: <Event fontSize="medium" />, label: "Event" },
  // { key: "vcardplus", icon: <Badge fontSize="medium" />, label: "vCard Plus" },
];

const qrTypeImages: Record<string, string> = {
  website: WebsiteImage,
  whatsapp: WhatsappImage,
  email: EmailImage,
  location: LocationImage,
};

interface PhoneNumber {
  type: string;
  number: string;
}

interface ContentInputs {
  websiteContent?: string;
  textContent?: string;
  emailContent?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  locationTab?: string;
  locationStreet?: string;
  locationArea?: string;
  locationPostalCode?: string;
  locationCity?: string;
  locationState?: string;
  locationCountry?: string;
  latitude?: string;
  longitude?: string;
  wifiSsid?: string;
  wifiPassword?: string;
  wifiEncryption?: string;
  firstName?: string;
  lastName?: string;
  phones?: PhoneNumber[];
  email?: string;
  website?: string;
  company?: string;
  title?: string;
}

export interface EditFormInputs {
  qrName: string;
  fromDate: string;
  toDate: string;
  scanLimit?: number | null;
  password: string;
  confirmPassword: string;
  content: ContentInputs;
}

const EditQR = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<EditFormInputs>({
    defaultValues: {
      qrName: '',
      fromDate: '',
      toDate: '',
      scanLimit: undefined,
      password: '',
      confirmPassword: '',
      content: {
        websiteContent: '',
        textContent: '',
        emailContent: '',
        whatsappNumber: '',
        whatsappMessage: '',
        locationTab: '',
        locationStreet: '',
        locationArea: '',
        locationPostalCode: '',
        locationCity: '',
        locationState: '',
        locationCountry: '',
        latitude: '',
        longitude: '',
        wifiSsid: '',
        wifiPassword: '',
        wifiEncryption: '',
        firstName: '',
        lastName: '',
        phones: [{ type: 'Mobile', number: '' }],
        email: '',
        website: '',
        company: '',
        title: '',
      }
    }
  });

  const { id } = useParams();

  const fromDateValue = watch("fromDate");
  const scanLimitValue = watch("scanLimit");

  const qrType = useSelector((state: RootState) => state.qrType.type);
  const dispatch = useDispatch<AppDispatch>();

  const [openTimeScheduling, setOpenTimeScheduling] = useState<boolean>(false);
  const [openScanLimit, setOpenScanLimit] = useState<boolean>(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const today = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchQrDetails = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/qr-details/${id}`);
      const qrDetails = response.data.data[0];

      dispatch(activeTab(qrDetails?.qr_type ?? 'website'));

      setValue('qrName', qrDetails?.name);
      setValue('fromDate', qrDetails?.configuration?.from_date || '');
      setValue('toDate', qrDetails?.configuration?.to_date || '');
      setValue('scanLimit', qrDetails?.configuration?.scan_limit || null);
      setValue('password', qrDetails?.configuration?.password || '');
      setValue('confirmPassword', qrDetails?.configuration?.password || '');
      setValue('content', qrDetails?.content || {});

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
    fetchQrDetails();
  }, [])

  const handleEditQr = async (data: EditFormInputs) => {
    try {
      setLoading(true);
      await API.put('/qr', {
        qr_id: id,
        name: data.qrName,
        qr_type: qrType,
        content: data.content,
        configuration: {
          from_date: data.fromDate,
          to_date: data.toDate,
          scan_limit: data.scanLimit,
          password: data.password,
        }
      });
      navigate('/my-qr');
      toast.success("QR updated succesfully.");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error);
      } else {
        toast.error("QR update failed!");
      }
    }
  }

  const renderQRContent = () => {
    switch (qrType) {
      case "website":
        return <WebsiteEditLogic register={register} errors={errors} />;
      case "whatsapp":
        return <WhatsappEditLogic register={register} errors={errors} watch={watch} />;
      case "email":
        return <EmailEditLogic register={register} errors={errors} />;
      case "location":
        return <LocationEditLogic register={register} errors={errors} watch={watch} />;
      default:
        return null;
    }
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
        <Menubar heading='Edit QR'/>

        <form className="grow bg-white rounded-md overflow-y-auto flex flex-col md:flex-row gap-8 p-2" onSubmit={handleSubmit(handleEditQr)}>
          <div className="w-full md:w-2/3 flex flex-col gap-8 md:p-6 md:overflow-y-auto">
            <AnimatePresence>
              {["text", "wifi", "vcard"].includes(qrType) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-md"
                >
                  <strong>Note:</strong> The selected QR type is <span className="font-medium capitalize">{qrType}</span>. 
                  These are <strong>static QR codes</strong> — analytics and tracking features are not available for them.
                </motion.div>
              )}
            </AnimatePresence>

            <NavLink to={'/my-qr'} className="flex items-center gap-1 !underline"><ArrowBack sx={{fontSize: '16px'}}/>Back</NavLink>

            {/* QR Type Selection */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">1</span> Select the QR type</h3>
              <Select value={qrType} className="w-full lg:w-2/3" required
                onChange={(e) => dispatch(activeTab(e.target.value))}
              >
                {qrTypes.map((data, index) => (
                  <MenuItem value={data.key} key={index}>
                    <span className="flex items-center gap-2 text-pink-500">
                      {data.icon}
                      {data.label}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </div>

            <hr className="text-gray-300"/>

            {/* Name Selection */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">2</span> Name your QR</h3>
              <input type="text" placeholder="Enter name" 
                className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                {...register("qrName", { required: "QR name is required" })}
              />
              {errors.qrName && <p className="text-red-500 text-sm">{errors.qrName.message}</p>}
            </div>

            <hr className="text-gray-300"/>

            {/* Content Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">3</span> Complete the content</h3>
              {renderQRContent()}
            </div>

            {!['text', 'wifi', 'vcard'].includes(qrType) &&
              <>
                <hr className="text-gray-300"/>

                {/* Customization Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold flex items-center gap-2"><span className="bg-black text-white rounded-md px-2">4</span> Customize your QR</h3>
                  <div>
                    <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => setOpenTimeScheduling(!openTimeScheduling)}>
                      <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openTimeScheduling ? "rotate-90" : "rotate-0"}`} /> Time Scheduling
                    </div>
                    <AnimatePresence>
                      {openTimeScheduling &&
                        <motion.div
                          initial={{opacity: 0, height: 0}}
                          animate={{opacity: 1, height: 'auto'}}
                          exit={{opacity: 0, height: 0}}
                          transition={{duration: 0.5}}
                        >
                          <div className="flex flex-col gap-3 p-3">
                            <p className="text-sm text-gray-600">Control when your QR code will be active. Set a start and end date to automatically enable or disable access. Useful for time-limited campaigns, events, or offers.</p>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <input type="date" id="fromDate" min={today}
                                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                                  {...register("fromDate", {
                                    validate: (value) => {
                                      const toDate = watch("toDate");
                                      if (!value && toDate) return "Please select From Date";
                                      return true;
                                    },
                                  })}
                                />
                                {errors.fromDate && (<p className="text-red-500 text-sm mt-1">{errors.fromDate.message}</p>)}
                              </div>
                              <div>
                                <input type="date" id="toDate" min={fromDateValue || today}
                                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                                  {...register("toDate", {
                                    validate: (value) => {
                                      const fromDate = watch("fromDate");
                                      if (!value && fromDate) return "Please select From Date";
                                      return true;
                                    },
                                  })}
                                />
                                {errors.toDate && (<p className="text-red-500 text-sm mt-1">{errors.toDate.message}</p>)}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      }
                    </AnimatePresence>
                    <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-t border-gray-200" onClick={() => setOpenScanLimit(!openScanLimit)}>
                      <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openScanLimit ? "rotate-90" : "rotate-0"}`} /> Scan Limit
                    </div>
                    <AnimatePresence>
                      {openScanLimit &&
                        <motion.div
                          initial={{opacity: 0, height: 0}}
                          animate={{opacity: 1, height: 'auto'}}
                          exit={{opacity: 0, height: 0}}
                          transition={{duration: 0.5}}
                        >
                          <div className="flex flex-col gap-3 p-3">
                            <p className="text-sm text-gray-600">Restrict the number of times your QR code can be scanned. Once the limit is reached, users will no longer be able to access the linked content. Perfect for exclusive offers, limited trials, or controlled access.</p>
                            <div>
                              <input type="number" id="scanLimit" min={scanLimitValue || 0}
                                placeholder="Limit number of scans" 
                                className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                                {...register("scanLimit", {
                                  validate: (value) => {
                                    if (value === null) return true;
                                    return Number(value) > 0 || "Scan limit must be greater than 0";
                                  },
                                })}
                              />
                              {errors.scanLimit && <p className="text-red-500 text-sm mt-1">{errors.scanLimit.message}</p>}
                            </div>
                          </div>
                        </motion.div>
                      }
                    </AnimatePresence>
                    <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-t border-gray-200" onClick={() => setOpenPassword(!openPassword)}>
                      <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openPassword ? "rotate-90" : "rotate-0"}`} /> Password
                    </div>
                    <AnimatePresence>
                      {openPassword &&
                        <motion.div
                          initial={{opacity: 0, height: 0}}
                          animate={{opacity: 1, height: 'auto'}}
                          exit={{opacity: 0, height: 0}}
                          transition={{duration: 0.5}}
                        >
                          <div className="flex flex-col gap-3 p-3">
                            <p className="text-sm text-gray-600">Protect your QR code with a password. Users will need to enter the correct password before they can view or access the linked content. Ideal for private documents, internal links, or sensitive materials.</p>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <input type="password" id="password" 
                                  placeholder="Set a password"
                                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                                  {...register("password", {
                                    validate: (value) => {
                                      if (!value) return true;
                                      if (value.length < 6) return "Password must be at least 6 characters";
                                      return true;
                                    }
                                  })}
                                />
                                {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
                              </div>
                              <div>
                                <input type="text" id="confirmPassword"
                                  placeholder="Confirm password"
                                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                                  {...register("confirmPassword", {
                                    validate: (value) => {
                                      const password = watch("password");
                                      if (!value && !password) return true;
                                      if (!value && password) return "Please confirm your password";
                                      if (value !== password) return "Passwords do not match";
                                      return true;
                                    }
                                  })}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      }
                    </AnimatePresence>
                  </div>
                </div>
              </>
            }

            <button type="submit" className="self-start flex items-center bg-black p-1 rounded-full hover:bg-black/85 group">
              <p className='text-sm text-white px-3'>Update QR</p>
              <ArrowRight size={32} className='bg-white rounded-full p-2 -rotate-45 group-hover:rotate-0 transition duration-300 ease-in-out'/>
            </button>
          </div>

          <div className="w-full md:w-1/3 flex items-center justify-center">
            {qrType && (
              <motion.img
                key={qrType}
                src={qrTypeImages[qrType] || WebsiteImage}
                alt={qrType}
                className="max-w-full max-h-[600px] object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditQR