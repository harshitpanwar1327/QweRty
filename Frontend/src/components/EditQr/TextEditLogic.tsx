import React from "react";
import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { EditFormInputs } from "../../pages/portal/EditQR";

interface TextLogicProps {
  content?: EditFormInputs["content"];
  register: UseFormRegister<EditFormInputs>;
  errors?: FieldErrors<EditFormInputs>;
  watch: UseFormWatch<EditFormInputs>;
}

const TextEditLogic: React.FC<TextLogicProps> = ({ register, errors, watch }) => {
  const textContent = watch("content.textContent") || "";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-500">Message</label>
      <textarea
        placeholder="Enter some text..."
        rows={5}
        className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
        maxLength={2000}
        {...register("content.textContent", {
          required: "Text content is required",
        })}
      />
      <div className={`text-sm ${textContent.length === 2000 ? "text-red-500" : "text-gray-500"}`}>
        {textContent.length}/2000 characters
      </div>
      {errors?.content?.textContent && (<p className="text-red-500 text-sm">{errors.content?.textContent.message}</p>)}
    </div>
  );
};

export default TextEditLogic;