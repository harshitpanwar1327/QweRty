import React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormInputs as BaseFormInputs } from "../../pages/portal/NewQR";

interface WebsiteFormInputs extends BaseFormInputs {
  websiteContent?: string;
}

interface WebsiteLogicProps {
  setContent: Dispatch<SetStateAction<{ websiteContent?: string }>>;
  register: UseFormRegister<WebsiteFormInputs>;
  errors?: FieldErrors<WebsiteFormInputs>;
}

const WebsiteLogic: React.FC<WebsiteLogicProps> = ({ setContent, register, errors }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-500">Enter your Website</label>
      <input
        type="text"
        placeholder="E.g. https://www.myweb.com/"
        className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
        {...register("websiteContent", {
          required: "Website URL is required",
          pattern: {
            value: /^https:\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/,
            message: "Enter a valid URL"
          },
          onChange: (e) => setContent({ websiteContent: e.target.value })
        })}
      />
      {errors?.websiteContent && (<p className="text-red-500 text-sm">{errors.websiteContent.message}</p>)}
    </div>
  );
};

export default WebsiteLogic;