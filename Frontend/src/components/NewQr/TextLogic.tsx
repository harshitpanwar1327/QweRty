import React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

interface FormInputs {
  qrName: string;
  fromDate: string;
  toDate: string;
  scanLimit: number | null;
  password: string;
  confirmPassword: string;
  textContent?: string;
}

interface TextLogicProps {
  content: { textContent?: string };
  setContent: Dispatch<SetStateAction<{ textContent?: string }>>;
  register: UseFormRegister<FormInputs>;
  errors?: FieldErrors<FormInputs>;
}

const TextLogic: React.FC<TextLogicProps> = ({ content, setContent, register, errors }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-500">Message</label>
      <textarea
        placeholder="Enter some text..."
        rows={5}
        className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
        maxLength={2000}
        {...register("textContent", {
          required: "Text content is required",
          onChange: (e) => setContent({ textContent: e.target.value })
        })}
      />
      <div className={`text-sm ${content.textContent?.length === 2000 ? "text-red-500" : "text-gray-500"}`}>
        {content.textContent?.length || 0}/2000 characters
      </div>
      {errors?.textContent && (<p className="text-red-500 text-sm">{errors.textContent.message}</p>)}
    </div>
  );
};

export default TextLogic;