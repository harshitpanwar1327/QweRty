import React from "react";
import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { EditFormInputs } from "../../pages/portal/EditQR";

interface WhatsappLogicProps {
  content?: EditFormInputs["content"];
  register: UseFormRegister<EditFormInputs>;
  errors?: FieldErrors<EditFormInputs>;
  watch: UseFormWatch<EditFormInputs>;
}

const WhatsappEditLogic: React.FC<WhatsappLogicProps> = ({ register, errors, watch }) => {
  const whatsappMessage = watch("content.whatsappMessage") || "";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Number</label>
        <input
          type="text"
          placeholder="E.g. +919876543210"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          {...register("content.whatsappNumber", {
            required: "WhatsApp number is required",
            pattern: {
              value: /^\+[1-9]\d{6,14}$/,
              message: "Enter a valid number with country code (e.g. +919876543210)",
            }
          })}
        />
        {errors?.content?.whatsappNumber && (<p className="text-red-500 text-sm">{errors.content?.whatsappNumber.message}</p>)}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Message</label>
        <textarea
          placeholder="Enter a by default message..."
          rows={5}
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          maxLength={200}
          {...register("content.whatsappMessage")}
        />
        <div className={`text-sm ${whatsappMessage.length === 200 ? "text-red-500" : "text-gray-500"}`}>
          {whatsappMessage.length}/200 characters
        </div>
      </div>
    </div>
  );
};

export default WhatsappEditLogic;