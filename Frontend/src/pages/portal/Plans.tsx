import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"

const Plans = () => {
  return (
    <>
    <NavigationBar />
    <div className="flex flex-col w-screen h-screen overflow-y-auto">
      <Menubar heading='Plans'/>

    </div>
    </>
  )
}

export default Plans