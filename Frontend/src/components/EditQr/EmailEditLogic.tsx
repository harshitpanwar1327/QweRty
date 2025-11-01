import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { EditFormInputs } from "../../pages/portal/EditQR";

interface EmailLogicProps {
  content?: EditFormInputs["content"];
  register: UseFormRegister<EditFormInputs>;
  errors?: FieldErrors<EditFormInputs>;
}

const EmailEditLogic: React.FC<EmailLogicProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-500">Email</label>
      <input
        type="email"
        placeholder="E.g. myemail@gmail.com"
        className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
        {...register("content.emailContent", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          }
        })}
      />
      {errors?.content?.emailContent && (<p className="text-red-500 text-sm">{errors.content?.emailContent.message}</p>)}
    </div>
  )
}

export default EmailEditLogic