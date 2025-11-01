import React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormInputs as BaseFormInputs } from "../../pages/portal/NewQR";

interface WhatsAppFormInputs extends BaseFormInputs {
  whatsappNumber?: string;
  whatsappMessage?: string;
}

interface WhatsappLogicProps {
  content: { whatsappNumber?: string; whatsappMessage?: string };
  setContent: Dispatch<SetStateAction<{ whatsappNumber?: string; whatsappMessage?: string }>>;
  register: UseFormRegister<WhatsAppFormInputs>;
  errors?: FieldErrors<WhatsAppFormInputs>;
}

const WhatsappLogic: React.FC<WhatsappLogicProps> = ({ content, setContent, register, errors }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Number</label>
        <input
          type="text"
          placeholder="E.g. +919876543210"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          {...register("whatsappNumber", {
            required: "WhatsApp number is required",
            pattern: {
              value: /^\+[1-9]\d{6,14}$/,
              message: "Enter a valid number with country code (e.g. +919876543210)",
            },
            onChange: (e) => setContent((prev) => ({ ...prev, whatsappNumber: e.target.value })),
          })}
        />
        {errors?.whatsappNumber && (<p className="text-red-500 text-sm">{errors.whatsappNumber.message}</p>)}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Message</label>
        <textarea
          placeholder="Enter a by default message..."
          rows={5}
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          maxLength={200}
          {...register("whatsappMessage", {
            onChange: (e) => setContent((prev) => ({ ...prev, whatsappMessage: e.target.value })),
          })}
        />
        <div className={`text-sm ${ content.whatsappMessage?.length === 200 ? "text-red-500" : "text-gray-500" }`}>
          {content.whatsappMessage?.length || 0}/200 characters
        </div>
        {errors?.whatsappMessage && (<p className="text-red-500 text-sm">{errors.whatsappMessage.message}</p>)}
      </div>
    </div>
  );
};

export default WhatsappLogic;