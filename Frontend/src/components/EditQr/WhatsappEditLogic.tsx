import React, { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface WhatsappContent {
  whatsappNumber?: string;
  whatsappMessage?: string;
}

interface WhatsappLogicProps {
  content: WhatsappContent;
  setContent: Dispatch<SetStateAction<WhatsappContent>>;
}

const WhatsappEditLogic: React.FC<WhatsappLogicProps> = ({ content, setContent }) => {
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [whatsappMessage, setWhatsappMessage] = useState<string>("");
    
  useEffect(() => {
    setContent({ whatsappNumber, whatsappMessage });
  }, [whatsappNumber, whatsappMessage, setContent]);

  useEffect(() => {
    if (content?.whatsappNumber && content.whatsappNumber !== whatsappNumber) {
      setWhatsappNumber(content.whatsappNumber);
    }

    if (content?.whatsappMessage && content.whatsappMessage !== whatsappMessage) {
      setWhatsappMessage(content.whatsappMessage);
    }
  }, [content]);
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label>Number</label>
        <input
          type="text"
          placeholder="E.g. +919876543210"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Message</label>
        <textarea
          placeholder="Enter a by default message..."
          rows={5}
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
          value={whatsappMessage}
          onChange={(e) => setWhatsappMessage(e.target.value)}
          maxLength={200}
        />
        <div className={`text-sm ${whatsappMessage.length === 200 ? "text-red-500" : "text-gray-500"}`}>
          {whatsappMessage.length}/200 characters
        </div>
      </div>
    </div>
  );
};

export default WhatsappEditLogic;