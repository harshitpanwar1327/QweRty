import { useEffect, useState } from "react"
import API from "../../util/API"
import axios from "axios"
import { HashLoader } from "react-spinners"
import { useParams } from "react-router-dom"
import { CallRounded, EmailRounded, LanguageRounded } from '@mui/icons-material'
import * as Icons from '../../assets/socialMedia'

interface Contact {
  email?: string,
  telephone?: string,
  website?: string
}

interface SocialMediaData {
  socialLogo?: string,
  socialTitle?: string,
  socialContact?: Contact,
  socialLinks: Record<string, string>
}

const socialIcons: Record<string, string> = {
  behance: Icons.Behance,
  discord: Icons.Discord,
  dribbble: Icons.Dribbble,
  facebook: Icons.Facebook,
  instagram: Icons.Instagram,
  linkedin: Icons.LinkedIn,
  messenger: Icons.Messenger,
  openai: Icons.OpenAI,
  pinterest: Icons.Pinterest,
  reddit: Icons.Reddit,
  snapchat: Icons.Snapchat,
  telegram: Icons.Telegram,
  threads: Icons.Threads,
  tiktok: Icons.TikTok,
  tumblr: Icons.Tumblr,
  twitch: Icons.Twitch,
  whatsapp: Icons.Whatsapp,
  x: Icons.X,
  youtube: Icons.YouTube,
}

const SocialMedia = () => {
  const { id } = useParams();
  const [socialMediaData, setSocialMediaData] = useState<SocialMediaData>({
    socialLogo: '',
    socialTitle: '',
    socialContact: {
      email: '',
      telephone: '',
      website: ''
    },
    socialLinks: {}
  });

  const [loading, setLoading] = useState<boolean>(false);

  const fetchSocialMediaData = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/qrData/${id}`);
      console.log(response.data.data);
      setSocialMediaData(response.data.data);
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

  useEffect(() => {
    fetchSocialMediaData();
  }, []);

  return (
    <div className="w-screen h-screen bg-[#65AD9E] flex items-center justify-center overflow-y-auto">
      {loading && (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
          <HashLoader color="#dc3753" />
        </div>
      )}

      <div className="w-full md:w-1/2 lg:w-1/3 max-h-full flex flex-col items-center gap-8 p-8">
        {socialMediaData?.socialLogo &&
          <div className="rounded-full border-2 border-white w-40 h-40">
            <img src={socialMediaData.socialLogo} alt="Logo" className="w-full h-full" />
          </div>
        }

        {socialMediaData?.socialTitle &&
          <h2 className="text-2xl font-semibold text-white">{socialMediaData.socialTitle}</h2>
        }

        {Object.keys(socialMediaData?.socialLinks || {}).length > 0 && (
          <div className="w-full flex flex-col items-center gap-3">
            {Object.entries(socialMediaData?.socialLinks).map(([platform, url]) => (
              <a href={url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 bg-white p-2 rounded">
                <div className="bg-[#F0F7F5] p-2 rounded">
                  <img src={socialIcons[platform.toLowerCase()]} alt="Icon" className="w-6" />
                </div>
                <p className="text-sm text-gray-600">{platform}</p>
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center gap-8">
          {socialMediaData?.socialContact?.telephone &&
            <a href={`tel:${socialMediaData.socialContact.telephone}`} target="_blank">
              <CallRounded sx={{color: 'white'}}/>
            </a>
          }
          {socialMediaData?.socialContact?.email &&
            <a href={`mailto:${socialMediaData.socialContact.email}`} target="_blank">
              <EmailRounded sx={{color: 'white'}}/>
            </a>
          }
          {socialMediaData?.socialContact?.website &&
            <a href={socialMediaData.socialContact.website} target="_blank">
              <LanguageRounded sx={{color: 'white'}}/>
            </a>
          }
        </div>
      </div>
    </div>
  )
}

export default SocialMedia