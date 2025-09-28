import p from '../assets/react.svg'

const Menubar = ({ heading }) => {
  return (
    <div className="w-full bg-white/20 py-4 px-4 md:px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-xl">{heading}</h2>
      </div>

      <div className="flex items-center gap-3">
        <h3 className="flex flex-col text-right text-gray-800 text-sm font-medium">ayushdedha23@gmail.com</h3>
        <img src={p} alt="Profile" className="w-[2.5rem] h-[2.5rem] rounded-full border border-gray-300"/>
      </div>
    </div>
  );
};

export default Menubar;
