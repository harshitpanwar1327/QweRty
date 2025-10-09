import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"

const Plans = () => {
  return (
    <div className="w-screen flex">
      <NavigationBar />
      
      <div className="grow flex flex-col gap-2 p-2 overflow-auto">
        <Menubar heading='Plans'/>

      </div>
    </div>
  )
}

export default Plans