import React, { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { FormInputs as BaseFormInputs } from "../../pages/portal/NewQR"
import { motion, AnimatePresence } from 'framer-motion'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import PlayStore from '../../assets/apps/PlayStore.png'
import AppleStore from '../../assets/apps/Apple.png'
import { DeleteRounded, InfoOutline, KeyboardArrowRightRounded, PlayArrowRounded } from "@mui/icons-material"
import { CloudUploadIcon } from "lucide-react"

interface AppsFormInputs extends BaseFormInputs {
  appName?: string,
  appCompany?: string,
  appLogo?: File | null,
  appDescription?: string,
  appWebsite?: string,
  appLinks?: Record<string, string>
}

interface AppsLogicProps {
  setContent: Dispatch<SetStateAction<{ appName?: string, appCompany?: string, appLogo?: File | null, appDescription?: string, appWebsite?: string, appLinks?: Record<string, string> }>>;
  register: UseFormRegister<AppsFormInputs>;
  errors?: FieldErrors<AppsFormInputs>;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface AppPlatforms {
  icon: string,
  label: string
}

const appPlatforms: AppPlatforms[] = [
  { icon: PlayStore, label: "Play Store" },
  { icon: AppleStore, label: "Apple" }
];

const AppsLogic: React.FC<AppsLogicProps> = ({ setContent, register, errors }) => {
  // Basic Information
  const [openInformation, setOpenInformation] = useState<boolean>(false);
  const [openAppInfo, setOpenAppInfo] = useState<boolean>(false);
  const [openAppLink, setOpenAppLink] = useState<boolean>(false);

  const [selectedPlatforms, setSelectedPlatforms] = useState<AppPlatforms[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setContent(prev => ({ ...prev, appLogo: file }))
  };

  const handlePlatformSelect = (platform: AppPlatforms) => {
    setSelectedPlatforms(prev =>
      prev.find(p => p.label === platform.label) ? prev : [...prev, platform]
    )
  };

  const handleInputChange = (platformName: string, value: string) => {
    setContent(prev => ({ ...prev,
      appLinks: { ...prev.appLinks, [platformName]: value }
    }));
  };

  const handlePlatformDelete = (platformName: string) => {
    setSelectedPlatforms((prev) => prev.filter((p) => p.label !== platformName));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col p-4 border border-gray-200 rounded-md" onClick={() => setOpenInformation(!openInformation)}>
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="p-2 rounded bg-pink-100 text-pink-500">
            <InfoOutline />
          </div>
          <div className="grow flex flex-col gap-1">
            <h2 className="font-semibold">Basic Information</h2>
            <p className="text-xs text-gray-500">Add essential information.</p>
          </div>
          <div className={`flex justify-center items-center p-1 rounded-full hover:bg-gray-100 border border-gray-200 text-pink-500 transition duration-500 ${openInformation ? 'rotate-90' : ''}`}>
            <KeyboardArrowRightRounded />
          </div>
        </div>

        <AnimatePresence>
          {openInformation &&
            <motion.div className="flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: 'auto'}}
              exit={{opacity: 0, height: 0}}
              transition={{duration: 0.5}}
            >
              <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 mt-6" onClick={() => setOpenAppInfo(!openAppInfo)}>
                <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openAppInfo ? "rotate-90" : "rotate-0"}`} /> App information
              </div>
              <AnimatePresence>
                {openAppInfo &&
                  <motion.div className="overflow-hidden"
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.5}}
                  >
                    <div className="flex flex-col gap-4 p-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-500">App name</label>
                        <input type="text" placeholder="E.g. Myapp" 
                          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                          {...register("appName", {
                            required: "App name is required",
                            onChange: (e) => setContent((prev) => ({ ...prev, appName: e.target.value }))
                          })}
                        />
                        {errors?.appName && (<span className="text-red-500 text-xs">{errors.appName?.message}</span>)}
                      </div>

                      <div className="flex items-center gap-4">
                        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                          Upload files
                          <VisuallyHiddenInput type="file" accept="image/*"
                            onChange={e => {
                              const file = e.target.files?.[0]
                              if (file) handleFileChange(file)
                            }}
                          />
                        </Button>
                        {previewUrl && (
                          <img src={previewUrl} alt="Logo Preview" className="w-12 h-12 rounded object-cover border border-gray-200" />
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-500">Title</label>
                        <input type="text" placeholder="E.g. CodeWeave" 
                          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                          {...register("appCompany", {
                            onChange: (e) => setContent((prev) => ({ ...prev, appCompany: e.target.value }))
                          })}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-500">Description</label>
                        <input type="text" placeholder="E.g. Gaming App" 
                          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                          {...register("appDescription", {
                            onChange: (e) => setContent((prev) => ({ ...prev, appDescription: e.target.value }))
                          })}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-500">Website</label>
                        <input type="text" placeholder="E.g. https://myapp.com" 
                          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                          {...register("appWebsite", {
                            onChange: (e) => setContent((prev) => ({ ...prev, appWebsite: e.target.value }))
                          })}
                        />
                      </div>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>

              <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => setOpenAppLink(!openAppLink)}>
                <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openAppLink ? "rotate-90" : "rotate-0"}`} /> Links to the different platforms
              </div>
              <AnimatePresence>
                {openAppLink &&
                  <motion.div className="flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.5}}
                  >
                    <div className="flex flex-wrap gap-2 m-3 p-3 border border-gray-200 rounded-md">
                      {appPlatforms.map((platform: AppPlatforms) => (
                        <div className="flex p-1 border border-gray-200 rounded cursor-pointer" key={platform.label} onClick={() => handlePlatformSelect(platform)}>
                          <img src={platform.icon} alt="icon" className="w-6 h-6" />
                        </div>
                      ))}
                    </div>

                    {selectedPlatforms.length > 0 &&
                      <div className="flex flex-col gap-2 p-3">
                        {selectedPlatforms.map((platform: AppPlatforms, index) => (
                          <div className="flex flex-col gap-2 p-3 rounded-md bg-gray-100" key={index}>
                            <div className="flex justify-between items-center gap-4">
                              <img src={platform.icon} alt="icon" className="w-8 h-8" />
                              <DeleteRounded className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => handlePlatformDelete(platform.label)} />
                            </div>
                            <div className="flex flex-col gap-1">
                              <input type="text" placeholder="Enter url"
                                className="w-full p-2 border border-gray-300 rounded"
                                {...register(`appLinks.${platform.label}`, {
                                  pattern: {
                                    value: /^(https:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/,
                                    message: "Enter a valid URL"
                                  },
                                  onChange: (e) => handleInputChange(platform.label, e.target.value)
                                })}
                              />
                              {errors?.appLinks?.[platform.label] && (<p className="text-red-500 text-sm">{errors.appLinks?.[platform.label]?.message}</p>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    }
                  </motion.div>
                }
              </AnimatePresence>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AppsLogic