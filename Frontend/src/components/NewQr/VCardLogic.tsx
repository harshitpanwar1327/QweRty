import React, { useState, useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import { PlayArrowRounded } from "@mui/icons-material"
import { AnimatePresence, motion } from "framer-motion"
import { AddRounded, DeleteRounded } from '@mui/icons-material'

interface PhoneNumber {
  type: string,
  number: string
}

interface VCardContent {
  firstName?: string,
  lastName?: string,
  phones?: PhoneNumber[],
  email?: string,
  website?: string,
  locationStreet?: string,
  locationPostalCode?: string,
  locationCity?: string,
  locationState?: string,
  locationCountry?: string,
  company?: string,
  title?: string
}

interface VCardLogicProps {
  content: VCardContent;
  setContent: Dispatch<SetStateAction<VCardContent>>;
}

const VCardLogic: React.FC<VCardLogicProps> = ({ content, setContent }) => {
  const [openName, setOpenName] = useState<boolean>(false);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openLocation, setOpenLocation] = useState<boolean>(false);
  const [openCompany, setOpenCompany] = useState<boolean>(false);

  // Name
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  // Contact Info
  const [phones, setPhones] = useState<PhoneNumber[]>([{
    type: 'Mobile',
    number: ''
  }]);
  const [email, setEmail] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  // Location
  const [locationStreet, setLocationStreet] = useState<string>("");
  const [locationPostalCode, setLocationPostalCode] = useState<string>("");
  const [locationCity, setLocationCity] = useState<string>("");
  const [locationState, setLocationState] = useState<string>("");
  const [locationCountry, setLocationCountry] = useState<string>("");

  //Company
  const [company, setCompany] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    setContent({ firstName, lastName, phones, email, website, locationStreet, locationPostalCode, locationCity, locationState, locationCountry, company, title });
  }, [firstName, lastName, phones, email, website, locationStreet, locationPostalCode, locationCity, locationState, locationCountry, company, title, setContent]);

  useEffect(() => {
    if (!content?.firstName) setFirstName('');
    if (!content?.lastName) setLastName('');
    if (!content?.phones) setPhones([]);
    if (!content?.email) setEmail('');
    if (!content?.website) setWebsite('');
    if (!content?.locationStreet) setLocationStreet('');
    if (!content?.locationPostalCode) setLocationPostalCode('');
    if (!content?.locationCity) setLocationCity('');
    if (!content?.locationState) setLocationState('');
    if (!content?.locationCountry) setLocationCountry('');
    if (!content?.company) setCompany('');
    if (!content?.title) setTitle('');
  }, [content]);

  const handleAddPhone = () => {
    setPhones([...phones, { type: 'Mobile', number: '' }]);
  }

  const handleRemovePhone = (index: number) => {
    setPhones(phones.filter((__, i) => i !== index));
  }

  return (
    <div className="flex flex-col">
      {/* Name */}
      <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => setOpenName(!openName)}>
        <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openName ? "rotate-90" : "rotate-0"}`} /> Name
      </div>
      <AnimatePresence mode="wait">
        {openName &&
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.5}}
          >
            <div className="grid grid-cols-2 gap-2 p-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">First Name</label>
                <input type="text" placeholder="E.g. John" className="p-2 border border-gray-300 rounded" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Last Name</label>
                <input type="text" placeholder="E.g. Smith" className="p-2 border border-gray-300 rounded" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Contact Info */}
      <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-t border-gray-200" onClick={() => setOpenInfo(!openInfo)}>
        <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openInfo ? "rotate-90" : "rotate-0"}`} /> Contact Info
      </div>
      <AnimatePresence mode="wait">
        {openInfo &&
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.5}}
          >
            <div className="flex flex-col gap-4 p-3">
              <div className="flex flex-col gap-2">
                <label className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Telephone</span>
                  <button type="button" className="flex items-center gap-2 text-sm font-semibold text-blue-500 border border-gray-200 py-1 px-3 rounded-full hover:bg-gray-100" onClick={handleAddPhone}><AddRounded sx={{fontSize: '16px'}} /> Add Phone</button>
                </label>
              </div>

              {phones.length > 0 &&
                <div className="flex flex-col gap-2">
                  {phones.map((phone, index) => (
                    <div className="flex items-start md:items-center gap-4 bg-gray-100 rounded-md p-2" key={index}>
                      <div className="grow flex items-center flex-wrap gap-2">
                        <select name="type" id="type" value={phone.type} className="p-2 border border-gray-300 rounded"
                          onChange={(e) => {
                            const updatedPhones = [...phones];
                            updatedPhones[index].type = e.target.value;
                            setPhones(updatedPhones);
                          }}
                        >
                          <option value="Mobile">Mobile</option>
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                        </select>
                        <input type="text" placeholder="E.g. +91 9876543210" className="grow p-2 border border-gray-300 rounded" value={phone.number} required 
                          onChange={(e) => {
                            const updatedPhones = [...phones];
                            updatedPhones[index].number = e.target.value;
                            setPhones(updatedPhones);
                          }}
                        />
                      </div>
                      <div className="text-blue-500 hover:text-blue-700 p-1 border border-gray-300 rounded-full flex justify-center items-center cursor-pointer" onClick={() => handleRemovePhone(index)}>
                        <DeleteRounded />
                      </div>
                    </div>
                  ))}
                </div>
              }

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Email</label>
                <input type="text" placeholder="E.g. example@gmail.com" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Personal Website</label>
                <input type="text" placeholder="E.g. www.example.com" className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Location */}
      <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-t border-gray-200" onClick={() => setOpenLocation(!openLocation)}>
        <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openLocation ? "rotate-90" : "rotate-0"}`} /> Location
      </div>
      <AnimatePresence mode="wait">
        {openLocation &&
          <motion.div className="flex flex-col"
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.5}}
          >
            <div className="flex flex-col gap-4 p-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-500">Street</label>
                  <input type="text" placeholder="E.g. 403" value={locationStreet} onChange={(e) => setLocationStreet(e.target.value)} className="p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-500">Postal Code</label>
                  <input type="text" placeholder="E.g. 122001" value={locationPostalCode} onChange={(e) => setLocationPostalCode(e.target.value)} className="p-2 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-500">City</label>
                  <input type="text" placeholder="E.g. Gurugram" value={locationCity} onChange={(e) => setLocationCity(e.target.value)} className="p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-500">State</label>
                  <input type="text" placeholder="E.g. Haryana" value={locationState} onChange={(e) => setLocationState(e.target.value)} className="p-2 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Country</label>
                <input type="text" placeholder="E.g. India" value={locationCountry} onChange={(e) => setLocationCountry(e.target.value)} className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" />
              </div>
            </div>

            {(locationStreet || locationCity) && (
              <div className="mt-3">
                <iframe
                  title="Location Preview"
                  width="100%"
                  height="250"
                  className="rounded-xl border"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(`${locationStreet}, ${locationCity}, ${locationState}, ${locationCountry}`)}&output=embed`}
                ></iframe>
              </div>
            )}
          </motion.div>
        }
      </AnimatePresence>

      {/* Company */}
      <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-t border-gray-200" onClick={() => setOpenCompany(!openCompany)}>
        <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openCompany ? "rotate-90" : "rotate-0"}`} /> Company
      </div>
      <AnimatePresence mode="wait">
        {openCompany &&
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.5}}
          >
            <div className="grid grid-cols-2 gap-2 p-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Company</label>
                <input type="text" placeholder="E.g. Company LLC" className="p-2 border border-gray-300 rounded" value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Title</label>
                <input type="text" placeholder="E.g. Your profession/position" className="p-2 border border-gray-300 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};

export default VCardLogic;