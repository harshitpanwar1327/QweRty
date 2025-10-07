import React, { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { PlayArrowRounded } from "@mui/icons-material";

interface VCardContent {
  openContactName: boolean;
  openContactInfo: boolean;
  openContactLocation: boolean;
  openContactCompany: boolean;
}

interface VCardLogicProps {
  setContent: Dispatch<SetStateAction<VCardContent>>;
}

const VCardLogic: React.FC<VCardLogicProps> = ({ setComponent }) => {
  const [openContactName, setOpenContactName] = useState<boolean>(false);
  const [openContactInfo, setOpenContactInfo] = useState<boolean>(false);
  const [openContactLocation, setOpenContactLocation] = useState<boolean>(false);
  const [openContactCompany, setOpenContactCompany] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => setOpenContactName(!openContactName)}>
        <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openContactName ? "rotate-90" : "rotate-0"}`} /> Name
      </div>

      <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-t border-gray-200" onClick={() => setOpenContactInfo(!openContactInfo)}>
        <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openContactInfo ? "rotate-90" : "rotate-0"}`} /> Contact Info
      </div>

      <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-t border-gray-200" onClick={() => setOpenContactLocation(!openContactLocation)}>
        <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openContactLocation ? "rotate-90" : "rotate-0"}`} /> Location
      </div>

      <div className="w-full p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 border-t border-gray-200" onClick={() => setOpenContactCompany(!openContactCompany)}>
        <PlayArrowRounded sx={{ fontSize: "16px", color: "gray" }} className={`!transition duration-300 ${openContactCompany ? "rotate-90" : "rotate-0"}`} /> Company
      </div>
    </div>
  );
};

export default VCardLogic;