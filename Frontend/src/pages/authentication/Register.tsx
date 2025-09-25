import { useState, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../util/Firebase.ts';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { HashLoader  } from "react-spinners"
import GoogleIcon from '@mui/icons-material/Google'

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('AuthToken', token);
      setTimeout(() => {
        setLoading(false);
        toast.success("Register successful");
        navigate("/hero");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error('Signup error:', error);
      if (error && typeof error === "object" && "code" in error) {
        const firebaseError = error as { code: string; message: string };
        toast.error(firebaseError.code);
      } else {
        toast.error("Failed to register! Please check your details and try again.");
      }
    }
  };

  return (
    <div className='flex flex-col lg:flex-row items-center justify-between p-3 w-full'>
      {loading && (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
          <HashLoader color="#dc3753" />
        </div>
      )}
      
      <div className='flex flex-col justify-center gap-4 text-black w-full h-full lg:w-1/2 p-8 md:p-16'>
        <div className="flex items-center gap-2 items-start">
          <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
          <p className="font-bold text-2xl text-black">QweRty</p>
        </div>

        <form className = "flex flex-col justify-center gap-4" onSubmit={handleRegister}>
          <div className='flex flex-col gap-2'>
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
          <button className="font-semibold bg-pink-600 text-white p-2 rounded-full hover:scale-102 transition duration-300">Sign up now</button>
        </form>

        <span className="text-xs font-semibold text-gray-500">Already have an account? <NavLink to="/login" className="text-blue-500 hover:text-blue-700 font-bold">Log in</NavLink></span>

        <span className="text-xs self-center font-semibold text-gray-500">OR</span>

        <button className="p-2 border border-blue-500 bg-blue-500 text-white rounded-full cursor-pointer flex items-center justify-center gap-2 transition duration-300 hover:scale-102">
          <GoogleIcon sx={{fontSize: '18px'}}/> <span className='hidden md:block'>Sign up with Google</span>
        </button>
      </div>

      <div className='hidden lg:block lg:w-1/2 h-full rounded-r-lg rounded-l-4xl bg-pink-300 flex flex-center items-center'>
        <img src="" alt="Login Image"/>
      </div>
    </div>
  )
}

export default Register