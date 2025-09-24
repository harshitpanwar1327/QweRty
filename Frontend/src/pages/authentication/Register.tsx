import { useState, type ChangeEvent  } from 'react';
import { NavLink } from 'react-router-dom'
import { HashLoader  } from "react-spinners"
import GoogleIcon from '@mui/icons-material/Google'

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className='flex flex-col lg:flex-row items-center justify-around p-3 w-full'>
      {loading && (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
          <HashLoader color="#dc3753" />
        </div>
      )}
      
      <div className='flex flex-col justify-center gap-4 text-black w-full lg:w-1/3 p-8 lg:p-16'>
        <div className="flex items-center gap-2 items-start">
          <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
          <p className="font-bold text-2xl text-black">QweRty</p>
        </div>

      <form className = "flex flex-col justify-center gap-4">
        <div className='space-y-2 mb-2'>
          <h2 className="text-2xl font-bold">Create account!</h2>
          <p className='text-gray-600 text-sm'>It's free and only takes a few seconds.</p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" className="border border-gray-300 p-3 rounded-lg" value={email} onChange={(e: ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" className="border border-gray-300 p-3 rounded-lg" value={password} onChange={(e: ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} required/>
        </div>

        <button className = "font-semibold bg-pink-600 text-white py-2 rounded-full hover:scale-102 transition duration-300">Sign up now</button>
      </form>

      <span className="text-xs font-semibold text-gray-500">Already have an account? <NavLink to="/login" className="text-blue-500 hover:text-blue-700 font-bold">Log in</NavLink></span>

      <span className="text-xs p-2 self-center font-semibold text-gray-500">OR</span>

      <button className="px-4 h-[2.5rem] border border-blue-300 rounded-full cursor-pointer flex items-center justify-center gap-1 transition duration-300 hover:scale-102 bg-blue-700 text-white">
        <GoogleIcon sx={{fontSize: '18px'}}/> <span className='hidden md:block pl-1'>Sign in with Google</span>
      </button>

      </div>

      <img src="" alt="Login Image" className='lg:w-1/2 h-full rounded-r-lg rounded-l-4xl bg-pink-300'/>
    </div>
  )
}

export default Register