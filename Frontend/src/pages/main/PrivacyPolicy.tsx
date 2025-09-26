import Footer from "../../components/Footer"
import Header from "../../components/Header"

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen overflow-y-auto">
      <Header />

      <div className="w-full bg-gradient-to-r from-gray-100 via-pink-100 to-pink-200 py-30 text-center flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h2>
        <p className="text-gray-600">Effective Date: 1 October, 2025</p>
      </div>

      <div className="px-6 md:px-12 py-12 text-gray-600 flex flex-col gap-8">
        <p>At QweRty (“we,” “our,” “us”), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, mobile apps, and services (collectively, the “Service”).</p>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">1. Information We Collect</h2>
          <p>When you use QweRty, we may collect the following information:</p>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>Account Information: Name, email address, password, and subscription details when you create an account.</li>
            <li>Payment Information: Billing address and payment method, processed securely via third-party providers (we do not store full payment details).</li>
            <li>QR Code Data: Content you generate or upload (e.g., links, PDFs, images, videos, audio files, contact information).</li>
            <li>Analytics Data: Number of scans.</li>
            <li>Technical Data: IP address, browser type, operating system, and usage patterns.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>Provide and improve our QR code generation and management services.</li>
            <li>Enable customization and analytics for your QR codes.</li>
            <li>Process payments and manage subscriptions.</li>
            <li>Communicate with you regarding service updates, promotions, or support.</li>
            <li>Ensure security, prevent fraud, and comply with legal requirements.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">3. Data Sharing & Disclosure</h2>
          <p>We do not sell your personal information. We may share your data only in the following cases:</p>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>Service Providers: With trusted third-party vendors for payment processing, analytics, and cloud storage.</li>
            <li>Legal Compliance: When required by law, regulation, or legal process.</li>
            <li>Business Transfers: In case of a merger, acquisition, or sale of assets, your data may be transferred.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">4. Cookies & Tracking Technologies</h2>
          <p>QweRty uses cookies and similar technologies to:</p>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>Remember user preferences.</li>
            <li>Improve website functionality and user experience.</li>
            <li>Track analytics and marketing performance.</li>
          </ul>
          <p>You can manage or disable cookies in your browser settings.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">5. Data Retention</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li>QR codes and linked content are stored for as long as your account is active.</li>
            <li>Analytics data is retained based on your subscription plan.</li>
            <li>We may retain certain information to comply with legal obligations.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">6. Data Security</h2>
          <p>We implement industry-standard measures (encryption, secure servers, limited access) to protect your data. However, no online service is 100% secure, and we cannot guarantee absolute security.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">7. Your Rights</h2>
          <p>Depending on your region (e.g., GDPR, CCPA), you may have the right to:</p>
          <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
            <li> Access, update, or delete your personal data.</li>
            <li>Restrict or object to data processing.</li>
            <li>Export your data in a portable format.</li>
            <li>Withdraw consent at any time.</li>
          </ul>
          <p>To exercise these rights, contact us at: <a href="mailto:codeweave@gmail.com">codeweave@gmail.com</a></p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">8. Children’s Privacy</h2>
          <p>QweRty is not directed to individuals under 13 years of age (or the age of digital consent in your country). We do not knowingly collect data from children.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">9. Changes to this Policy</h2>
          <p>We may update this Privacy Policy from time to time. If significant changes occur, we will notify you via email or app notification.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black">10. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please reach us at:</p>
          <p><strong>Email:</strong> <a href="mailto:codeweave@gmail.com">codeweave@gmail.com</a></p>
          <p><strong>Website: </strong><a href="https://www.codeweave.site" target="_blank" rel="noopener noreferrer">codeweave.site</a></p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy