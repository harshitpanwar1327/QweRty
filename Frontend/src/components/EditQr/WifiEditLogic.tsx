import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { EditFormInputs } from "../../pages/portal/EditQR";

interface WifiLogicProps {
  content?: EditFormInputs["content"];
  register: UseFormRegister<EditFormInputs>;
  errors?: FieldErrors<EditFormInputs>;
}

const WifiEditLogic: React.FC<WifiLogicProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Network name (SSID)</label>
        <input
          type="text"
          placeholder="E.g. HomeWifi"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          {...register("content.wifiSsid", {
            required: "Network SSID is required",
            maxLength: { value: 64, message: "SSID cannot exceed 64 characters" },
          })}
        />
        {errors?.content?.wifiSsid && <p className="text-red-500 text-sm">{errors.content?.wifiSsid.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Network password</label>
        <input
          type="password"
          placeholder="E.g. MyPassword"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          {...register("content.wifiPassword", {
            required: "Network password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
            maxLength: { value: 64, message: "Password cannot exceed 64 characters" },
          })}
        />
        {errors?.content?.wifiPassword && (<p className="text-red-500 text-sm">{errors.content?.wifiPassword.message}</p>)}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Type of encryption</label>
        <select
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          {...register("content.wifiEncryption", {
            required: "Please select an encryption type",
          })}
        >
          <option value="WEP">WEP</option>
          <option value="WPA">WPA</option>
          <option value="WPA2-EAP">WPA2-EAP</option>
          <option value="nopass">nopass</option>
        </select>
        {errors?.content?.wifiEncryption && (<p className="text-red-500 text-sm">{errors.content?.wifiEncryption.message}</p>)}
      </div>
    </div>
  );
};

export default WifiEditLogic;