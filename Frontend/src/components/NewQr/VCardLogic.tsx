import React, { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { PlayArrowRounded } from "@mui/icons-material"
import { AnimatePresence, motion } from "framer-motion"
import { AddRounded, DeleteRounded } from '@mui/icons-material'
import { type UseFormRegister, type FieldErrors, useFieldArray, type Control } from "react-hook-form";
import type { FormInputs as BaseFormInputs } from "../../pages/portal/NewQR";

interface PhoneNumber {
  type: string,
  number: string
}

interface VCardFormInputs extends BaseFormInputs {
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
  content: { firstName?: string, lastName?: string, phones?: PhoneNumber[], email?: string,website?: string, locationStreet?: string, locationPostalCode?: string, locationCity?: string, locationState?: string, locationCountry?: string, company?: string, title?: string };
  setContent: Dispatch<SetStateAction<{ firstName?: string, lastName?: string, phones?: PhoneNumber[], email?: string,website?: string, locationStreet?: string, locationPostalCode?: string, locationCity?: string, locationState?: string, locationCountry?: string, company?: string, title?: string }>>;
  register: UseFormRegister<VCardFormInputs>;
  errors?: FieldErrors<VCardFormInputs>;
  control?: Control<VCardFormInputs>;
}

const VCardLogic: React.FC<VCardLogicProps> = ({ content, setContent, register, errors, control }) => {
  const [openName, setOpenName] = useState<boolean>(false);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openLocation, setOpenLocation] = useState<boolean>(false);
  const [openCompany, setOpenCompany] = useState<boolean>(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
  });

  const handleAddPhone = () => append({ type: "Mobile", number: "" });
  const handleRemovePhone = (index: number) => remove(index);

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
                <input type="text" placeholder="E.g. John" 
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                  {...register("firstName", {
                    required: "First name is required",
                    onChange: (e) => setContent((prev) => ({ ...prev, firstName: e.target.value }))
                  })}
                />
                {errors?.firstName && (<p className="text-red-500 text-sm">{errors.firstName.message}</p>)}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Last Name</label>
                <input type="text" placeholder="E.g. Smith" 
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                  {...register("lastName", {
                    onChange: (e) => setContent((prev) => ({ ...prev, lastName: e.target.value }))
                  })}
                />
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

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-3 bg-gray-100 rounded-md p-2 overflow-x-auto">
                  <select
                    {...register(`phones.${index}.type` as const, {
                      onChange: (e) => {
                        const newPhones = [...(content.phones || [])];
                        newPhones[index] = { ...newPhones[index], type: e.target.value };
                        setContent((prev) => ({ ...prev, phones: newPhones }));
                      }
                    })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                    defaultValue={field.type || "Mobile"}
                  >
                    <option value="Mobile">Mobile</option>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                  </select>

                  <input
                    {...register(`phones.${index}.number` as const, { 
                      required: "Phone number is required",
                      onChange: (e) => {
                        const newPhones = [...(content.phones || [])];
                        newPhones[index] = { ...newPhones[index], number: e.target.value };
                        setContent((prev) => ({ ...prev, phones: newPhones }));
                      }
                    })}
                    type="text"
                    placeholder="E.g. +91 9876543210"
                    className="grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                  />

                  <div className="flex justify-center items-center text-blue-500 hover:text-blue-700 p-1 border border-gray-300 rounded-full cursor-pointer" onClick={() => handleRemovePhone(index)}>
                    <DeleteRounded sx={{ fontSize: 18 }} />
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Email</label>
                <input type="text" placeholder="E.g. example@gmail.com" 
                  className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                    onChange: (e) => setContent((prev) => ({ ...prev, email: e.target.value }))
                  })}
                />
                {errors?.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Personal Website</label>
                <input type="text" placeholder="E.g. www.example.com" 
                  className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                  {...register("website", {
                    pattern: {
                      value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/,
                      message: "Enter a valid URL"
                    },
                    onChange: (e) => setContent((prev) => ({ ...prev, website: e.target.value }))
                  })}
                />
                {errors?.website && (<p className="text-red-500 text-sm">{errors.website.message}</p>)}
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
                  <input type="text" placeholder="E.g. 403" 
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                    {...register("locationStreet", {
                      onChange: (e) => setContent((prev) => ({ ...prev, locationStreet: e.target.value })),
                    })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-500">Postal Code</label>
                  <input type="text" placeholder="E.g. 122001" 
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                    {...register("locationPostalCode", {
                      pattern: {
                        value: /^[0-9]{5,6}$/,
                        message: "Enter a valid postal code",
                      },
                      onChange: (e) => setContent((prev) => ({ ...prev, locationPostalCode: e.target.value })),
                    })}
                  />
                  {errors?.locationPostalCode && (<p className="text-red-500 text-sm">{errors.locationPostalCode.message}</p>)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-500">City</label>
                  <input type="text" placeholder="E.g. Gurugram"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                    {...register("locationCity", {
                      onChange: (e) => setContent((prev) => ({ ...prev, locationCity: e.target.value })),
                    })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-500">State</label>
                  <input type="text" placeholder="E.g. Haryana" 
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200" 
                    {...register("locationState", {
                      onChange: (e) => setContent((prev) => ({ ...prev, locationState: e.target.value })),
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Country</label>
                <input type="text" placeholder="E.g. India" 
                  className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                  {...register("locationCountry", {
                    onChange: (e) => setContent((prev) => ({ ...prev, locationCountry: e.target.value })),
                  })}
                />
              </div>
            </div>

            {(content.locationStreet || content.locationCity) && (
              <div className="my-3">
                <iframe
                  title="Location Preview"
                  width="100%"
                  height="250"
                  className="rounded-xl border"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(`${content.locationStreet}, ${content.locationCity}, ${content.locationState}, ${content.locationCountry}`)}&output=embed`}
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
                <input type="text" placeholder="E.g. Company LLC" 
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                  {...register("company", {
                    onChange: (e) => setContent((prev) => ({ ...prev, company: e.target.value }))
                  })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-500">Title</label>
                <input type="text" placeholder="E.g. Your profession/position" 
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                  {...register("title", {
                    onChange: (e) => setContent((prev) => ({ ...prev, title: e.target.value }))
                  })}
                />
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};

export default VCardLogic;