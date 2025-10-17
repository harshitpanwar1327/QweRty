import { useState, type FormEvent } from 'react'
import { useParams, NavLink } from "react-router-dom"
import { Lock } from "lucide-react"
import API from '../../util/API'
import axios from 'axios'
import { toast } from 'react-toastify'
import { HashLoader } from "react-spinners"

const ConfigPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        setLoading(true);

        const res = await API.post(`/verify/${id}`, { password });

        if (res.data.incorrectPassword) {
        toast.error("Invalid password!");
        return;
        }

        if (res.data.success && res.data.redirectURL) {
        toast.success("QR verified successfully!");
        window.location.href = res.data.redirectURL;
        return;
        }

        toast.error(res.data.message || "Verification failed!");
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Server error");
        } else {
        toast.error("QR verification failed!");
        }
    } finally {
        setLoading(false);
    }
    };

  return (
    <div className='bg-pink-500 flex justify-center items-center w-screen h-screen'>
        {loading && (
            <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
                <HashLoader color="#dc3753" />
            </div>
        )}

        <div className='fixed top-0 left-0 w-full bg-white shadow-sm border-b border-gray-200 flex items-center gap-8 py-4 px-4 md:px-8'>
            <NavLink to={'/hero'} className="flex items-center gap-2 cursor-pointer">
                <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
                <p className="font-bold text-2xl text-black">QweRty</p>
            </NavLink>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-10 w-[90%] md:w-[450px] flex flex-col items-center gap-4 text-center">
            <Lock className="text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Password Required</h2>
            <p className="text-sm text-gray-600">This QR code is password protected. Please enter the correct password to access its content.</p>

            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2 outline-none"
                    required
                />

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-300">Continue</button>
            </form>
        </div>
    </div>
  )
}

export default ConfigPassword