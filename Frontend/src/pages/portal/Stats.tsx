import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"

const Stats = () => {
  return (
    <div className="w-screen flex">
      <NavigationBar />
      
      <div className="grow flex flex-col gap-2 p-2 overflow-auto">
        <Menubar heading='Stats'/>

      </div>
    </div>
  )
}

export default Stats