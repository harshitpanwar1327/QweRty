import Footer from "../../components/Footer"
import Header from "../../components/Header"

const TandC = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen overflow-y-auto">
      <Header />

      <div className="w-full bg-gradient-to-r from-gray-100 via-pink-100 to-pink-200 py-30 text-center flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Terms and Conditions</h2>
        <p className="text-gray-600">Effective Date: 1 October, 2025</p>
      </div>

      <div className="px-6 md:px-12 py-12 text-gray-600 flex flex-col gap-8">
        <p>Welcome to QweRty (“we,” “our,” “us”). By accessing or using our website, services, and applications (collectively, the “Service”), you (“you,” “user,” “customer”) agree to comply with and be bound by these Terms & Conditions. Please read them carefully.</p>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">1. Acceptance of Terms</h2>
          <p>By creating an account, generating QR codes, or otherwise using QweRty, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, you may not use our services.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">2. Eligibility</h2>
          <p>You must be at least 13 years old (or the age of digital consent in your country) to use QweRty. By using our Service, you confirm that you meet this requirement.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">3. Use of Service</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>You may generate QR codes for personal, business, or educational use.</li>
            <li>You agree not to use QweRty for illegal, harmful, or fraudulent purposes.</li>
            <li>You are solely responsible for the content you link through your QR codes (e.g., websites, files, media).</li>
            <li>We reserve the right to suspend or terminate accounts found violating these terms.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">4. Plans & Payments</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>QweRty offers Free, Pro, and Business subscription plans.</li>
            <li>Paid subscriptions are billed on a quarterly or annual basis as per your selection.</li>
            <li>All fees are non-refundable except as required by applicable law.</li>
            <li>We may update pricing or features, with prior notice to subscribers.</li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">5. QR Codes & Branding</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>Free plan QR codes may include QweRty branding.</li>
            <li>Pro and Business plans allow removal of branding.</li>
            <li>QR codes generated remain valid indefinitely, but analytics and editing features depend on your plan.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">6. Customization & Analytics</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>Available customization features depend on your subscription plan.</li>
            <li>Analytics provided (scans) are estimates and should not be considered 100% accurate.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">7. Data & Privacy</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>We respect your privacy and handle your data in accordance with our Privacy Policy.</li>
            <li>You are responsible for ensuring that the data you share through QR codes (e.g., files, media, contact info) complies with all applicable laws.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">8. Intellectual Property</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>The QweRty platform, design, and technology are owned by us and protected by intellectual property laws.</li>
            <li>You retain ownership of the content you upload or link through our Service.</li>
            <li>You may not copy, modify, or redistribute QweRty's software without our permission.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">9. Limitations of Liability</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>QweRty is provided “as is” without warranties of any kind.</li>
            <li>We are not responsible for damages, losses, or claims arising from the use of QR codes, linked content, or service interruptions.</li>
            <li>Users are responsible for verifying that their QR codes function as intended.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">10. Termination of Service</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>You may cancel your subscription anytime from your account dashboard.</li>
            <li>We reserve the right to suspend or terminate your access if you misuse the Service or violate these Terms.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">11. Changes to Terms</h2>
          <p>We may update these Terms & Conditions periodically. Continued use of the Service after changes are posted constitutes acceptance of the revised terms.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">12. Contact Us</h2>
          <p>For questions about these Terms, please contact us at: </p>
          <p><strong>Email:</strong> <a href="mailto:codeweave@gmail.com">codeweave@gmail.com</a></p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TandC