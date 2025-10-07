import { motion } from 'framer-motion'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import API from '../../util/API'
import axios from 'axios'
import { toast } from 'react-toastify'
import { HashLoader  } from "react-spinners"
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    name: "Free",
    quarterlyPrice: 0,
    annuallyPrice: 0,
    quarterlyMonthly: 0,
    annuallyMonthly: 0,
    features: [
      { text: "Generate up to 5 QR codes", included: true },
      { text: "Basic customization (color & shape)", included: true },
      { text: "Access to 7 QR types", included: true },
      { text: "Download in PNG format only", included: true },
      { text: "No scan analytics", included: true },
      { text: "Limited storage for uploaded files (10MB)", included: true },
      { text: "Remove QweRty branding", included: false },
      { text: "Priority support", included: false },
    ]
  },
  {
    name: "Pro",
    quarterlyPrice: 499,
    annuallyPrice: 1499,
    quarterlyMonthly: 166,
    annuallyMonthly: 125,
    features: [
      { text: "Generate up to 100 QR codes", included: true },
      { text: "Advanced customization (logo, frames, gradients)", included: true },
      { text: "Access to all 15 QR types", included: true },
      { text: "Download in PNG & SVG formats", included: true },
      { text: "Basic scan analytics (total scans & devices)", included: true },
      { text: "File storage up to 500MB", included: true },
      { text: "Remove QweRty branding", included: true },
      { text: "Priority support", included: false },
    ]
  },
  {
    name: "Business",
    quarterlyPrice: 999,
    annuallyPrice: 2999,
    quarterlyMonthly: 333,
    annuallyMonthly: 250,
    features: [
      { text: "Generate unlimited QR codes", included: true },
      { text: "Full customization suite with branding options", included: true },
      { text: "Access to all 15 QR types + future updates", included: true },
      { text: "Download in PNG, SVG, EPS, and PDF formats", included: true },
      { text: "Advanced scan analytics (time, location, device, trends)", included: true },
      { text: "Unlimited file storage", included: true },
      { text: "Remove QweRty branding", included: true },
      { text: "Priority & dedicated support", included: true },
    ]
  }
];

const Pricing = () => {
  const [duration, setDuration] = useState("quarterly");
  const uid = sessionStorage.getItem('userId');
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleUpgrade = async (plan_name: string) => {
    if(!isAuthenticated) {
      toast.info("Please login to upgrade your subscription!");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      return;
    }

    try {
      setLoading(true);
      await API.post('/subscription', {
        uid,
        plan_name,
        duration
      });
      toast.success("Subscription plan purchased successfully.");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error);
      } else {
        toast.error("Subscription plan purchase failed!");
      }
    }
  }
  
  return (
    <div className="flex flex-col gap-4 w-screen h-screen overflow-y-auto">
      {loading && (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
          <HashLoader color="#dc3753" />
        </div>
      )}

      <Header/>

      <div className='grow py-4 md:py-8 lg:py-16 px-4 md:px-12 lg:px-20 flex flex-col gap-8'>
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-center font-bold text-gray-900 uppercase">Flexible Plans For Every Need</h2>

        <div className="self-center flex items-center gap-1 bg-gray-100 rounded-md p-1">
          <button className={`px-6 py-2 text-sm font-semibold rounded-md flex items-center gap-4 ${duration === 'quarterly' ? 'bg-white': 'hover:bg-gray-200'}`} onClick={()=>setDuration('quarterly')}>Quarterly</button>
          <button className={`px-6 py-2 text-sm font-semibold rounded-md flex items-center gap-4 ${duration === 'annually' ? 'bg-white': 'hover:bg-gray-200'}`} onClick={()=>setDuration('annually')}>Annually</button>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 w-full">
          {plans.map((plan, index) => (
            <motion.div key={index} className={`flex flex-col justify-between gap-2 rounded-2xl shadow-lg p-6 border border-gray-200 bg-gray-100 hover:bg-white`} 
              whileHover={{ y: -5 }}
            >
              <h3 className="uppercase text-sm font-bold self-start px-1 rounded">{plan.name}</h3>
              <p className="text-5xl font-semibold">{duration==='quarterly' ? plan.quarterlyPrice: plan.annuallyPrice}</p>
              <p className="text-sm text-gray-600">₹ {duration==='quarterly' ? plan.quarterlyMonthly: plan.annuallyMonthly} per month</p>

              <button className={'my-4 p-2 rounded-lg font-semibold bg-gray-900 text-white hover:bg-[#f19509]'} onClick={()=>handleUpgrade(plan.name)}> Upgrade </button>

              <p className='font-semibold'>Features</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                      {feature.included ? (
                      <span className="text-green-500">✔</span>
                      ) : (
                      <span className="text-red-500">✖</span>
                      )}
                      {feature.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Pricing