import React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { EditFormInputs as BaseFormInputs } from "../../pages/portal/EditQR";

interface EmailFormInputs extends BaseFormInputs {
  emailContent?: string;
}

interface EmailLogicProps {
  setContent: Dispatch<SetStateAction<{ emailContent?: string }>>;
  register: UseFormRegister<EmailFormInputs>;
  errors?: FieldErrors<EmailFormInputs>;
}

const EmailLogic: React.FC<EmailLogicProps> = ({ setContent, register, errors }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-500">Email</label>
      <input
        type="email"
        placeholder="E.g. myemail@gmail.com"
        className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
        {...register("emailContent", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
          onChange: (e) => setContent({ emailContent: e.target.value })
        })}
      />
      {errors?.emailContent && (<p className="text-red-500 text-sm">{errors.emailContent.message}</p>)}
    </div>
  );
};

export default EmailLogic;