import React, { useState, useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import { InfoOutline, SpaceDashboard, KeyboardArrowRightRounded, PlayArrowRounded } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Behance from '../../assets/socialMedia/Behance.png'
import Discord from '../../assets/socialMedia/Discord.png'
import Dribbble from '../../assets/socialMedia/Dribbble.png'
import Facebook from '../../assets/socialMedia/Facebook.png'
import Instagram from '../../assets/socialMedia/Instagram.png'
import LinkedIn from '../../assets/socialMedia/LinkedIn.png'
import Messenger from '../../assets/socialMedia/Messenger.png'
import OpenAI from '../../assets/socialMedia/OpenAI.png'
import Pinterest from '../../assets/socialMedia/Pinterest.png'
import Reddit from '../../assets/socialMedia/Reddit.png'
import Snapchat from '../../assets/socialMedia/Snapchat.png'
import Telegram from '../../assets/socialMedia/Telegram.png'
import Threads from '../../assets/socialMedia/Threads.png'
import TikTok from '../../assets/socialMedia/TikTok.png'
import Tumblr from '../../assets/socialMedia/Tumblr.png'
import Twitch from '../../assets/socialMedia/Twitch.png'
import Whatsapp from '../../assets/socialMedia/WhatApp.png'
import X from '../../assets/socialMedia/X.png'
import YouTube from '../../assets/socialMedia/YouTube.png'

interface SocialMediaContent {
  logo?: File,
  title?: string,
  telephone?: string,
  email?: string,
  website?: string
}

interface SocialMediaProps {
  content: SocialMediaContent;
  setContent: Dispatch<SetStateAction<SocialMediaContent>>;
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

const socialPlatforms = [
  { icon: Behance, label: "Behance" },
  { icon: Discord, label: "Discord" },
  { icon: Dribbble, label: "Dribbble" },
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: LinkedIn, label: "LinkedIn" },
  { icon: Messenger, label: "Messenger" },
  { icon: OpenAI, label: "OpenAI" },
  { icon: Pinterest, label: "Pinterest" },
  { icon: Reddit, label: "Reddit" },
  { icon: Snapchat, label: "Snapchat" },
  { icon: Telegram, label: "Telegram" },
  { icon: Threads, label: "Threads" },
  { icon: TikTok, label: "TikTok" },
  { icon: Tumblr, label: "Tumblr" },
  { icon: Twitch, label: "Twitch" },
  { icon: Whatsapp, label: "Whatsapp" },
  { icon: X, label: "X" },
  { icon: YouTube, label: "YouTube" },
];

const SocialMediaLogic: React.FC<SocialMediaProps> = ({ content, setContent}) => {
  const [openInformation, setOpenInformation] = useState<boolean>(false);
  const [openContent, setOpenContent] = useState<boolean>(false);
  const [openNetworks, setOpenNetworks] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState<boolean>(false);

  // Basic Information
  // const [logo, setLogo] = useState<File | null>(null);
  const [title, setTitle] = useState<string>();

  // Social Networks
  // const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  // const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  // Contact info
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  useEffect(() => {
    setContent({ telephone, email, website });
  }, [telephone, email, website, setContent]);
  
  useEffect(() => {
    if (!content?.telephone) setTelephone('')
    if (!content?.email) setEmail('')
    if (!content?.website) setWebsite('')
  }, [content]);

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
            <motion.div className="flex flex-col gap-4" onClick={(e) => e.stopPropagation()}
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: 'auto'}}
              exit={{opacity: 0, height: 0}}
              transition={{duration: 0.5}}
            >
              <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} className="self-start !mt-6">
                Upload files
                <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple required />
              </Button>
              <div className="flex flex-col gap-2">
                <label>Title</label>
                <input type="text" placeholder="E.g. Company name" value={title} onChange={(e)=>setTitle(e.target.value)} className="p-2 border border-gray-300 rounded" required />
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
            <motion.div className="flex flex-col" onClick={(e) => e.stopPropagation()}
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
                  <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.5}}
                  >
                    <div className="flex flex-wrap gap-2 m-3 p-3 border border-gray-200 rounded-md">
                      {socialPlatforms.map((platform) => (
                        <div className="flex p-1 border border-gray-200 rounded cursor-pointer">
                          <img src={platform.icon} alt="icon" className="w-6 h-6" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                }
              </AnimatePresence>

              {/* Contact Info */}
              <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => setOpenContact(!openContact)}>
                <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openContact ? "rotate-90" : "rotate-0"}`} /> Contact info
              </div>
              <AnimatePresence>
                {openContact &&
                  <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.5}}
                  >
                    <div className="flex flex-col gap-4 p-3">
                      <div className="flex flex-col gap-2">
                        <label>Telephone</label>
                        <input type="text" placeholder="E.g. +91 9876543210" value={telephone} onChange={(e)=>setTelephone(e.target.value)} className="p-2 border border-gray-300 rounded" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label>Email</label>
                        <input type="text" placeholder="E.g. example@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} className="p-2 border border-gray-300 rounded" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label>Website</label>
                        <input type="text" placeholder="E.g. www.example.com" value={website} onChange={(e)=>setWebsite(e.target.value)} className="p-2 border border-gray-300 rounded" />
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

export default SocialMediaLogic