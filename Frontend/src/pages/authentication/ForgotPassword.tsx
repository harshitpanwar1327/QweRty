import { useState } from 'react'
import { toast } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../util/Firebase'
import { HashLoader  } from "react-spinners"
import ForgotImage from '../../assets/ForgotImage.jpg'
import { useForm, type SubmitHandler } from 'react-hook-form'

interface ForgotInputs {
  email: string
}

const errorMessages: Record<string, string> = {
  "auth/invalid-email": "Please enter a valid email address."
};

const ForgotPassword = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInputs>();

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ForgotInputs> = async (data: ForgotInputs) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, data.email);
      toast.success('Password reset email sent.');
      setTimeout(() => navigate('/login'), 3000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Forgot password error:', error);
      if (error && typeof error === "object" && "code" in error) {
        const firebaseError = error as { code: string; message: string };
        toast.error(errorMessages[firebaseError.code] || "Something went wrong. Please try again.");
      } else {
        toast.error("Failed to change password! Please check your details and try again.");
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
      
      <div className='flex flex-col justify-center gap-4 text-black w-full h-full lg:w-2/5 p-8 md:p-16 overflow-y-auto'>
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-pink-500 text-white rounded-md text-lg font-bold">QR</div>
          <p className="font-bold text-2xl text-black">QweRty</p>
        </div>

        <form className = "flex flex-col justify-center gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2'>
            <h2 className="text-2xl font-bold">Recover Password</h2>
            <p className='text-gray-600 text-sm'>Enter the email with which you created your account and we will send you a code so you can recover your password.</p>
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
          <button type='submit' className="font-semibold bg-pink-600 text-white p-2 rounded-full hover:scale-102 transition duration-300">Send email</button>
        </form>

        <span className="text-center text-xs font-semibold text-gray-500">Don&apos;t have an account? <NavLink to="/register" className="text-blue-500 hover:text-blue-700 font-bold">Create an account</NavLink></span>
      </div>

      <img src={ForgotImage} alt="Forgot Image" className='hidden lg:block lg:w-3/5 h-full rounded-r-lg rounded-l-4xl flex flex-center items-center' />
    </div>
  )
}

export default ForgotPassword