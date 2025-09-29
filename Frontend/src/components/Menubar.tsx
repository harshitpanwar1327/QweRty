import AccountCircleIcon from '@mui/icons-material/AccountCircle'

interface MenubarProps {
  heading: string;
}

const Menubar: React.FC<MenubarProps> = ({ heading }) => {
  const email = sessionStorage.getItem('email');

  return (
    <div className="w-full p-4 md:px-8 flex justify-between items-center shadow-md bg-white">
      <h2 className="font-semibold text-xl">{heading}</h2>

      <div className="flex items-center gap-2">
        <h3 className="text-sm">{email}</h3>
        <AccountCircleIcon sx={{fontSize: '32px'}}/>
      </div>
    </div>
  );
};

export default Menubar;