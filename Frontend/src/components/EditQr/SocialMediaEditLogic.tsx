import React, { useState } from "react"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { EditFormInputs } from "../../pages/portal/EditQR"
import { InfoOutline, SpaceDashboard, KeyboardArrowRightRounded, PlayArrowRounded, DeleteRounded } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import * as Icons from '../../assets/socialMedia'

interface SocialMediaLogicProps {
  content?: EditFormInputs["content"];
  register: UseFormRegister<EditFormInputs>;
  errors?: FieldErrors<EditFormInputs>;
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

interface SocialPlatforms {
  icon: string,
  label: string
}

const socialPlatforms: SocialPlatforms[] = [
  { icon: Icons.Behance, label: "Behance" },
  { icon: Icons.Discord, label: "Discord" },
  { icon: Icons.Dribbble, label: "Dribbble" },
  { icon: Icons.Facebook, label: "Facebook" },
  { icon: Icons.Instagram, label: "Instagram" },
  { icon: Icons.LinkedIn, label: "LinkedIn" },
  { icon: Icons.Messenger, label: "Messenger" },
  { icon: Icons.OpenAI, label: "OpenAI" },
  { icon: Icons.Pinterest, label: "Pinterest" },
  { icon: Icons.Reddit, label: "Reddit" },
  { icon: Icons.Snapchat, label: "Snapchat" },
  { icon: Icons.Telegram, label: "Telegram" },
  { icon: Icons.Threads, label: "Threads" },
  { icon: Icons.TikTok, label: "TikTok" },
  { icon: Icons.Tumblr, label: "Tumblr" },
  { icon: Icons.Twitch, label: "Twitch" },
  { icon: Icons.Whatsapp, label: "Whatsapp" },
  { icon: Icons.X, label: "X" },
  { icon: Icons.YouTube, label: "YouTube" },
];

const SocialMediaEditLogic: React.FC<SocialMediaLogicProps> = ({ register, errors }) => {
  const [openInformation, setOpenInformation] = useState<boolean>(false);
  const [openContent, setOpenContent] = useState<boolean>(false);
  const [openNetworks, setOpenNetworks] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState<boolean>(false);

  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatforms[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handlePlatformSelect = (platform: SocialPlatforms) => {
    setSelectedPlatforms(prev =>
      prev.find(p => p.label === platform.label) ? prev : [...prev, platform]
    )
  };

  const handleInputChange = (platformName: string, value: string) => {
  };

  const handlePlatformDelete = (platformName: string) => {
    setSelectedPlatforms((prev) => prev.filter((p) => p.label !== platformName));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Basic Information */}
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
            <motion.div className="flex flex-col gap-4 overflow-hidden" onClick={(e) => e.stopPropagation()}
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: 'auto'}}
              exit={{opacity: 0, height: 0}}
              transition={{duration: 0.5}}
            >
              <div className="flex items-center gap-4 mt-6">
                <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                  Upload files
                  <VisuallyHiddenInput type="file" accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChange(file);
                    }}
                  />
                </Button>
                {previewUrl && (
                  <img src={previewUrl} alt="Logo Preview" className="w-12 h-12 rounded object-cover border border-gray-200" />
                )}
              </div>
              <div className="flex flex-col gap-1 p-1">
                <label className="text-sm font-semibold text-gray-500">Title</label>
                <input type="text" placeholder="E.g. Company name" 
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                  {...register("content.title", {
                    required: "Title is required"
                  })}
                />
                {errors?.content?.title && (<span className="text-red-500 text-xs">{errors.content.title?.message}</span>)}
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 border border-gray-200 rounded-md" onClick={() => setOpenContent(!openContent)}>
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="p-2 rounded bg-pink-100 text-pink-500">
            <SpaceDashboard />
          </div>
          <div className="grow flex flex-col gap-1">
            <h2 className="font-semibold">Content</h2>
            <p className="text-xs text-gray-500">All the details about your QR.</p>
          </div>
          <div className={`flex justify-center items-center p-1 rounded-full hover:bg-gray-100 border border-gray-200 text-pink-500 transition duration-500 ${openContent ? 'rotate-90' : ''}`}>
            <KeyboardArrowRightRounded />
          </div>
        </div>

        <AnimatePresence>
          {openContent &&
            <motion.div className="flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: 'auto'}}
              exit={{opacity: 0, height: 0}}
              transition={{duration: 0.5}}
            >
              {/* Social Networks */}
              <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 mt-6" onClick={() => setOpenNetworks(!openNetworks)}>
                <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openNetworks ? "rotate-90" : "rotate-0"}`} /> Social Networks
              </div>
              <AnimatePresence>
                {openNetworks &&
                  <motion.div className="overflow-hidden"
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.5}}
                  >
                    <div className="flex flex-wrap gap-2 m-3 p-3 border border-gray-200 rounded-md">
                      {socialPlatforms.map((platform: SocialPlatforms) => (
                        <div className="flex p-1 border border-gray-200 rounded cursor-pointer" key={platform.label} onClick={() => handlePlatformSelect(platform)}>
                          <img src={platform.icon} alt="icon" className="w-6 h-6" />
                        </div>
                      ))}
                    </div>

                    {selectedPlatforms.length > 0 &&
                      <div className="flex flex-col gap-2 p-3">
                        {selectedPlatforms.map((platform: SocialPlatforms, index) => (
                          <div className="flex flex-col gap-2 p-3 rounded-md bg-gray-100" key={index}>
                            <div className="flex justify-between items-center gap-4">
                              <img src={platform.icon} alt="icon" className="w-8 h-8" />
                              <DeleteRounded className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => handlePlatformDelete(platform.label)} />
                            </div>
                            <div className="flex flex-col gap-1">
                              <input type="text" placeholder="Enter your url or userId"
                                className="w-full p-2 border border-gray-300 rounded"
                                {...register(`content.socialLinks.${platform.label}`, {
                                  pattern: {
                                    value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/,
                                    message: "Enter a valid URL"
                                  },
                                  onChange: (e) => handleInputChange(platform.label, e.target.value)
                                })}
                              />
                              {errors?.content?.socialLinks?.[platform.label] && (<p className="text-red-500 text-sm">{errors.content.socialLinks?.[platform.label]?.message}</p>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    }
                  </motion.div>
                }
              </AnimatePresence>

              {/* Contact Info */}
              <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => setOpenContact(!openContact)}>
                <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openContact ? "rotate-90" : "rotate-0"}`} /> Contact info
              </div>
              <AnimatePresence>
                {openContact &&
                  <motion.div className="overflow-hidden"
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.5}}
                  >
                    <div className="flex flex-col gap-4 p-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-500">Telephone</label>
                        <input type="text" placeholder="E.g. +91 9876543210"
                          className="p-2 border border-gray-300 rounded"
                          {...register("content.contact.telephone", {
                            pattern: {
                              value: /^\+[1-9]\d{6,14}$/,
                              message: "Enter a valid number with country code (e.g. +919876543210)"
                            }
                          })}
                        />
                        {errors?.content?.contact?.telephone && (<p className="text-red-500 text-sm">{errors.content.contact.telephone.message}</p>)}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-500">Email</label>
                        <input type="text" placeholder="E.g. example@gmail.com"
                          className="p-2 border border-gray-300 rounded"
                          {...register("content.contact.email", {
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Enter a valid email address",
                            }
                          })}
                        />
                        {errors?.content?.contact?.email && (<p className="text-red-500 text-sm">{errors.content.contact.email.message}</p>)}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-500">Website</label>
                        <input type="text" placeholder="E.g. www.example.com" 
                          className="p-2 border border-gray-300 rounded"
                          {...register("content.contact.website", {
                            pattern: {
                              value: /^https:\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/,
                              message: "Enter a valid URL"
                            }
                          })}
                        />
                        {errors?.content?.contact?.website && (<p className="text-red-500 text-sm">{errors.content.contact.website.message}</p>)}
                      </div>
                    </div>
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

export default SocialMediaEditLogic