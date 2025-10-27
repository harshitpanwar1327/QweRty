import React, { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface EmailContent {
  emailContent?: string;
}

interface EmailLogicProps {
  content: EmailContent;
  setContent: Dispatch<SetStateAction<EmailContent>>;
}

const EmailEditLogic: React.FC<EmailLogicProps> = ({ content, setContent }) => {
  const [emailContent, setEmailContent] = useState<string>("");
  
  useEffect(() => {
    setContent({ emailContent });
  }, [emailContent, setContent]);

  useEffect(() => {
    if (content?.emailContent && content.emailContent !== emailContent) {
      setEmailContent(content.emailContent);
    }
  }, [content]);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-500">Email</label>
      <input
        type="email"
        placeholder="E.g. myemail@gmail.com"
        className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        required
      />
    </div>
  )
}

export default EmailEditLogic