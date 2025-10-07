import React, { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface EmailContent {
  emailContent: string;
}

interface EmailLogicProps {
  setContent: Dispatch<SetStateAction<EmailContent>>;
}

const EmailLogic: React.FC<EmailLogicProps> = ({ setContent }) => {
  const [emailContent, setEmailContent] = useState<string>("");

  useEffect(() => {
    setContent({ emailContent });
  }, [emailContent, setContent]);

  return (
    <div className="flex flex-col gap-2">
      <label>Email</label>
      <input
        type="email"
        placeholder="E.g. myemail@gmail.com"
        className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        required
      />
    </div>
  );
};

export default EmailLogic;