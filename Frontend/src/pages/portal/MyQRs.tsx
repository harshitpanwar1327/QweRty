import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"

const MyQRs = () => {
  return (
    <>
    <NavigationBar />
    <div className="flex flex-col w-screen h-screen overflow-y-auto">
      <Menubar heading='MyQRs'/>

    </div>
    </>
  )
}

export default MyQRs