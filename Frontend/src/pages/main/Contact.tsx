import {useRef, type FormEvent} from 'react'
import { Phone, Mail } from "lucide-react"
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'
import { ArrowRight } from "lucide-react"
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'

const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success("Email sent successfully");
          form.current?.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error("Email not sent!");
        },
      );
  };

  return (
      <div className="flex flex-col w-screen h-screen overflow-y-auto">
        <Header />

        <div className="grow py-4 md:py-8 lg:py-16 px-4 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className='w-full lg:w-1/2 flex flex-col gap-8'>
            <h2 className='text-5xl md:text-6xl font-semibold'>Let's get in touch</h2>
            <p className='text-justify'>We’d love to hear from you! Whether you have a question, feedback, or just want to say hi, drop us a message and we’ll respond quickly.</p>
            <hr className='text-black/50'/>
            <p className='flex items-center gap-3'><Phone className='w-5 h-5'/>+91 8595994381, +91 9311201990</p>
            <p className='flex items-center gap-3'><Mail className='w-5 h-5'/>codeweave.site@gmail.com</p>
          </div>

          <form className='w-full lg:w-1/2 bg-gray-300 p-8 rounded-2xl space-y-4' ref={form} onSubmit={sendEmail}>
            <div>
              <label className='block mb-2'>Name</label>
              <input type="text" placeholder='Jane Smith' className='w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-white' name='name' required/>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block mb-2'>Email</label>
                <input type="email" placeholder='example@example.com' className='w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-white' name='email' required/>
              </div>
              <div>
                <label className='block mb-2'>Phone (optional)</label>
                <input type="tel" placeholder='+123456789' className='w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-white' name='phone' required/>
              </div>
            </div>

            <div>
              <label className="block mb-2">Message</label>
              <textarea placeholder="I need..." rows={3} className="w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-white" name='message' required/>
            </div>

            <button className="flex items-center justify-between p-1 rounded-full font-semibold bg-black hover:bg-black/90 group w-full">
              <p className='text-white px-3 mx-auto'>Submit</p>
              <ArrowRight size={40} className='bg-white text-black rounded-full p-2 -rotate-45 group-hover:rotate-0 transition duration-300 ease-in-out'/>
            </button>
          </form>
        </div>

        <Footer />
      </div>
  )
}

export default Contact