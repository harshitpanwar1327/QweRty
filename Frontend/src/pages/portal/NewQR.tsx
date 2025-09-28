import NavigationBar from "../../components/NavigationBar"
import Menubar from "../../components/Menubar"

const NewQR = () => {
  return (
    <>
    <NavigationBar />
    <div className="flex flex-col w-screen h-screen overflow-y-auto">
      <Menubar heading='NewQR'/>

    </div>
    </>
  )
}

export default NewQR