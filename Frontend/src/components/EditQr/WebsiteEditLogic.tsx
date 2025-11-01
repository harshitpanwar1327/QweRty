import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { EditFormInputs } from "../../pages/portal/EditQR";

interface WebsiteLogicProps {
  content?: EditFormInputs["content"];
  register: UseFormRegister<EditFormInputs>;
  errors?: FieldErrors<EditFormInputs>;
}

const WebsiteEditLogic: React.FC<WebsiteLogicProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-500">Enter your Website</label>
      <input
        type="text"
        placeholder="E.g. https://www.myweb.com/"
        className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
        {...register("content.websiteContent", {
          required: "Website URL is required",
          pattern: {
            value: /^https:\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/,
            message: "Enter a valid URL"
          },
        })}
      />
      {errors?.content?.websiteContent && (<p className="text-red-500 text-sm">{errors.content?.websiteContent.message}</p>)}
    </div>
  );
};

export default WebsiteEditLogic;