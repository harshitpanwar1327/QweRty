import React, { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface WebsiteContent {
  websiteContent?: string
}

interface WebsiteLogicProps {
  content: WebsiteContent;
  setContent: Dispatch<SetStateAction<WebsiteContent>>;
}

const WebsiteLogic: React.FC<WebsiteLogicProps> = ({ content, setContent }) => {
  const [websiteContent, setWebsiteContent] = useState<string>("");

  useEffect(() => {
    setContent({ websiteContent });
  }, [websiteContent, setContent]);

  useEffect(() => {
    if (!content?.websiteContent) setWebsiteContent('');
  }, [content]);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-500">Enter your Website</label>
      <input
        type="text"
        placeholder="E.g. https://www.myweb.com/"
        className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
        value={websiteContent}
        onChange={(e) => setWebsiteContent(e.target.value)}
        required
      />
    </div>
  );
};

export default WebsiteLogic;