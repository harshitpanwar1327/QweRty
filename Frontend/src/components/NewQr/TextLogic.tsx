import React, { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface TextContent {
  textContent: string;
}

interface TextLogicProps {
  setContent: Dispatch<SetStateAction<TextContent>>;
}

const TextLogic: React.FC<TextLogicProps> = ({ setContent }) => {
  const [textContent, setTextContent] = useState<string>("");
  
  useEffect(() => {
    setContent({ textContent });
  }, [textContent, setContent]);

  return (
    <div className="flex flex-col gap-2">
      <label>Message</label>
      <textarea
        placeholder="Enter some text..."
        rows={5}
        className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        maxLength={2000}
        required
      />
      <div className={`text-sm ${textContent.length === 2000 ? "text-red-500" : "text-gray-500"}`}>
        {textContent.length}/2000 characters
      </div>
    </div>
  );
};

export default TextLogic;