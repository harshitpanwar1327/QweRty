import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../util/Firebase.ts';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth"
import { HashLoader  } from "react-spinners"
import GoogleIcon from '@mui/icons-material/Google'
import API from '../../util/API.ts'
import SignupImage from '../../assets/SignupImage.jpg'
import { useForm, type SubmitHandler } from "react-hook-form"

interface RegisterInputs {
  name: string,
  email: string,
  password: string
}

const registerErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "This email is already registered. Try logging in instead.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Your password is too weak. Please use at least 6 characters.",
  "auth/network-request-failed": "Network error — please check your internet connection.",
  "auth/operation-not-allowed": "Email/password signup is not enabled. Contact support.",
  "auth/internal-error": "Something went wrong. Please try again later.",
};

const Register = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();
  
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister: SubmitHandler<RegisterInputs> = async (data: RegisterInputs) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const uid = userCredential.user.uid;
      const token = await userCredential.user.getIdToken();
      sessionStorage.setItem('userId', uid);
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('AuthToken', token);
      sessionStorage.setItem('email', data.email);
      await API.post('/user/register', { uid, name: data.name, email: data.email });
      setLoading(false);
      toast.success("Register successful");
      navigate("/new-qr");
    } catch (error) {
      setLoading(false);
      console.error('Signup error:', error);
      if (error && typeof error === "object" && "code" in error) {
        const firebaseError = error as { code: string; message: string };
        toast.error(registerErrorMessages[firebaseError.code] || "Registration failed. Please try again.");
      } else {
        toast.error("Failed to register! Please check your details and try again.");
      }
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const uid = userCredential.user.uid;
      const token = await userCredential.user.getIdToken();
      const email = userCredential.user.email ?? '';
      sessionStorage.setItem('userId', uid);
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('AuthToken', token);
      sessionStorage.setItem('email', email);

      const isNewUser = getAdditionalUserInfo(userCredential)?.isNewUser ?? false;
      if(isNewUser) await API.post('/user/register', { 
        uid,
        name: userCredential.user.displayName, 
        email: userCredential.user.email
      });
      setLoading(false);
      toast.success(isNewUser ? "Register successful" : "Login successful");
      navigate("/new-qr");
    } catch (error) {
      setLoading(false);
      console.error('Google login error:', error);
      if (error && typeof error === "object" && "code" in error) {
        const firebaseError = error as { code: string; message: string };
        toast.error(registerErrorMessages[firebaseError.code] || "Registration failed. Please try again.");
      } else {
        toast.error("Failed to login! Please try again.");
      }
    }
  }

  return (
    <div className='flex flex-col lg:flex-row items-center justify-between p-3 w-full'>
      {loading && (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md bg-black/25 z-100'>
          <HashLoader color="#dc3753" />
        </div>
      )}
      
      <div className='flex flex-col justify-center gap-4 text-black w-full h-full lg:w-2/5 p-8 md:p-16 overflow-y-auto'>
        <div className="flex items-center gap-2 items-start">
          <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
          <p className="font-bold text-2xl text-black">QweRty</p>
        </div>

        <form className = "flex flex-col justify-center gap-4" onSubmit={handleSubmit(handleRegister)}>
          <div className='flex flex-col gap-2'>
            <h2 className="text-2xl font-bold">Create account!</h2>
            <p className='text-gray-600 text-sm'>It's free and only takes a few seconds.</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className='text-sm font-semibold text-gray-500'>Name</label>
            <input type="text" id="name" placeholder="Enter your name" className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200" {...register("name", {required: "Name is required"})} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className='text-sm font-semibold text-gray-500'>Email</label>
            <input type="email" id="email" placeholder="Enter your email" className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              }
            })} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className='text-sm font-semibold text-gray-500'>Password</label>
            <input type="password" id="password" placeholder="Enter your password" className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200" {...register("password", {required: "Password is required"})} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button type='submit' className="font-semibold bg-pink-600 text-white p-2 rounded-full hover:scale-102 transition duration-300">Sign up now</button>
        </form>

        <span className="text-xs font-semibold text-gray-500">Already have an account? <NavLink to="/login" className="text-blue-500 hover:text-blue-700 font-bold">Log in</NavLink></span>

        <span className="text-xs self-center font-semibold text-gray-500">OR</span>

        <button className="p-2 border border-blue-500 bg-blue-500 text-white rounded-full cursor-pointer flex items-center justify-center gap-2 transition duration-300 hover:scale-102" onClick={handleGoogle}>
          <GoogleIcon sx={{fontSize: '18px'}}/> <span className='hidden md:block'>Sign up with Google</span>
        </button>
      </div>

      <img src={SignupImage} alt="Signup Image" className='hidden lg:block lg:w-3/5 h-full rounded-r-lg rounded-l-4xl flex flex-center items-center' />
    </div>
  )
}

export default Register