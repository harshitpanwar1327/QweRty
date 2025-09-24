import React, {useRef} from 'react'
import { Phone, Mail } from "lucide-react"
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'
import { ArrowRight } from "lucide-react"
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { Element } from 'react-scroll'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success("Email sent successfully");
          form.current.reset();
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

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-16 text-white">
          <div className='flex flex-col gap-8'>
            <h2 className='text-5xl md:text-6xl font-semibold md:w-1/2'>Let's get in touch</h2>
            <p className='text-justify'>Whether you have a question, a project in mind, or just want to say hello, we’d love to hear from you. 
            Our team is always ready to discuss new opportunities, provide support, and explore how we can work together to bring your ideas to life. Feel free to reach out through the form or the contact details below.</p>
            <hr className='text-white/50'/>
            <p className='flex items-center gap-3'><Phone className='w-5 h-5'/>+91 8595994381, +91 9311201990</p>
            <p className='flex items-center gap-3'><Mail className='w-5 h-5'/>codeweave.site@gmail.com</p>
          </div>

          <form className='bg-neutral-900 p-8 rounded-2xl space-y-4' ref={form} onSubmit={sendEmail}>
            <div>
              <label className='block mb-2'>Name</label>
              <input type="text" placeholder='Jane Smith' className='w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-1 focus:ring-white' name='name'/>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block mb-2'>Email</label>
                <input type="email" placeholder='example@example.com' className='w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-1 focus:ring-white' name='email'/>
              </div>
              <div>
                <label className='block mb-2'>Phone (optional)</label>
                <input type="tel" placeholder='+123456789' className='w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-1 focus:ring-white' name='phone'/>
              </div>
            </div>

            <div>
              <label className="block mb-2">Message</label>
              <textarea placeholder="I need..." rows="3" className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-1 focus:ring-white" name='message'/>
            </div>

            <button className="flex items-center justify-between bg-white p-1 rounded-full font-semibold hover:bg-gray-200 group w-full">
              <p className='text-black px-3 mx-auto'>Submit</p>
              <ArrowRight size={40} className='bg-black text-white rounded-full p-2 -rotate-45 group-hover:rotate-0 transition duration-300 ease-in-out'/>
            </button>
          </form>
        </div>

        <Footer />
      </div>
  )
}

export default Contact