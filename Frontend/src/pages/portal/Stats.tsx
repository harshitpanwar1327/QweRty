import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"

const Stats = () => {
  return (
    <>
    <NavigationBar />
    <div className="flex flex-col w-screen h-screen overflow-y-auto">
      <Menubar heading='Stats'/>

    </div>
    </>
  )
}

export default Stats