import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import API from "../../util/API"
import axios from "axios"
import { HashLoader } from "react-spinners"
import AppleStore from '../../assets/apps/AppStoreButton.png'
import PlayStore from '../../assets/apps/PlayStoreButton.png'

interface AppData {
  appName?: string,
  appCompany?: string,
  appLogo?: string,
  appDescription?: string,
  appWebsite?: string,
  appLinks: Record<string, string>
}

const Apps = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [appData, setAppData] = useState<AppData>({
    appName: '',
    appCompany: '',
    appLogo: '',
    appDescription: '',
    appWebsite: '',
    appLinks: {}
  });

  const fetchAppData = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/qrData/${id}`);
      setAppData(response.data.data);
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
    fetchAppData();
  }, []);

  return (
    <div className="w-screen h-screen bg-[#6D3F97] flex items-end justify-center">
      {loading && (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
          <HashLoader color="#dc3753" />
        </div>
      )}

      <div className={`w-full h-9/10 bg-white flex flex-col items-center gap-4 p-4 ${appData?.appLogo ? 'pt-40': ''} rounded-t-2xl overflow-y-auto`}>
        {appData?.appLogo &&
          <div className="absolute top-10 rounded-lg bg-white shadow-md p-4 w-40 h-40">
            <img src={appData.appLogo} alt="Logo" className="w-full h-full" />
          </div>
        }

        {appData?.appCompany &&
          <h3 className="text-[#6D3F97] font-semibold">{appData.appCompany?.toLocaleUpperCase()}</h3>
        }

        {appData?.appName &&
          <h2 className="text-2xl font-semibold">{appData.appName}</h2>
        }

        {appData?.appDescription &&
          <p className="text-sm">{appData.appDescription}</p>
        }

        {Object.keys(appData?.appLinks || {}).length > 0 && (
          <div className="flex items-center gap-2">
            {Object.entries(appData?.appLinks).map(([platform, url], index) => (
              <a href={url} target="_blank" key={index}>
                <img src={platform === 'Apple' ? AppleStore: PlayStore} alt={platform} width={125} />
              </a>
            ))}
          </div>
        )}
        
        {appData?.appWebsite &&
          <a href={appData.appWebsite} target="_blank" className="!text-[#6D3F97] font-semibold">{appData.appWebsite.slice(8)}</a>
        }
      </div>
    </div>
  )
}

export default Apps