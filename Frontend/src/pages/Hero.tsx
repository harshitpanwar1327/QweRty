import Footer from "../components/Footer.js";
import NavigationBar from "../components/NavigationBar.js";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavigationBar/>
        
        <div className="flex-grow w-screen px-4 md:px-12 lg:px-20 pb-8">
          Hero
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Hero