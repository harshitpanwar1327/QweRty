import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const faqs = [
  {
    question: "What is QweRty?",
    answer: "QweRty is a customizable QR code generator that lets you create, manage, and track QR codes for websites, WiFi, files, social media, apps, and more."
  },
  {
    question: "Is QweRty free to use?",
    answer: "Yes, QweRty offers a Free plan with basic features. For advanced customization, analytics, and unlimited QR codes, you can upgrade to Pro or Business plans."
  },
  {
    question: "Do my QR codes expire?",
    answer: "No. All QR codes generated using QweRty remain valid indefinitely. However, analytics and editing options may depend on your subscription plan."
  },
  {
    question: "Can I customize my QR codes?",
    answer: "Yes. You can add colors, gradients, logos, and frames to match your brand identity. Higher-tier plans unlock advanced customization options."
  },
  {
    question: "Which file formats are supported for download?",
    answer: "You can download QR codes in PNG format on the Free plan. Pro and Business plans also include SVG, PDF, and JPG formats for high-quality prints."
  },
  {
    question: "Does QweRty provide scan analytics?",
    answer: "Yes. Pro and Business users get access to scan data, like total scans."
  },
  {
    question: "Can I generate QR codes for files like PDFs, images, and videos?",
    answer: "Absolutely. QweRty allows you to link files such as PDFs, images, videos, and MP3s so that users can instantly access them with a scan."
  },
  {
    question: "Will my QR codes have QweRty branding?",
    answer: "Free plan QR codes include QweRty branding. Pro and Business plans allow you to remove branding and create fully white-labeled QR codes."
  },
  {
    question: "Do you support businesses or enterprises?",
    answer: "Yes. Our Business plan is designed for companies needing unlimited QR codes, advanced analytics, branding removal, and priority support. Enterprise plans are also available on request."
  },
  {
    question: "What if I need help while using QweRty?",
    answer: "We provide dedicated support via email and chat. Business plan users also get priority support for faster issue resolution."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-y-auto">
      <Header />

      <div className="py-15 px-4 md:px-12 lg:px-20 text-black flex flex-col gap-4">
        <p className="text-center text-gray-500">FAQ</p>
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-8">Everything you need to know</h2>
        <div className="flex flex-col gap-10">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 cursor-pointer" onClick={() => toggleFAQ(index)}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-500" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-800" />
                )}
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-gray-600"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default FAQ