import React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormInputs as BaseFormInputs } from "../../pages/portal/NewQR";

interface WifiFormInputs extends BaseFormInputs {
  wifiSsid?: string;
  wifiPassword?: string;
  wifiEncryption?: string;
}

interface WifiLogicProps {
  setContent: Dispatch<SetStateAction<{ wifiSsid?: string; wifiPassword?: string; wifiEncryption?: string }>>;
  register: UseFormRegister<WifiFormInputs>;
  errors?: FieldErrors<WifiFormInputs>;
}

const WifiLogic: React.FC<WifiLogicProps> = ({ setContent, register, errors }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Network name (SSID)</label>
        <input
          type="text"
          placeholder="E.g. HomeWifi"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          {...register("wifiSsid", {
            required: "Network SSID is required",
            maxLength: { value: 64, message: "SSID cannot exceed 64 characters" },
            onChange: (e) => setContent((prev) => ({ ...prev, wifiSsid: e.target.value })),
          })}
        />
        {errors?.wifiSsid && <p className="text-red-500 text-sm">{errors.wifiSsid.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Network password</label>
        <input
          type="password"
          placeholder="E.g. MyPassword"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          {...register("wifiPassword", {
            required: "Network password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
            maxLength: { value: 64, message: "Password cannot exceed 64 characters" },
            onChange: (e) => setContent((prev) => ({ ...prev, wifiPassword: e.target.value })),
          })}
        />
        {errors?.wifiPassword && (<p className="text-red-500 text-sm">{errors.wifiPassword.message}</p>)}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Type of encryption</label>
        <select
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          {...register("wifiEncryption", {
            required: "Please select an encryption type",
            onChange: (e) => setContent((prev) => ({ ...prev, wifiEncryption: e.target.value })),
          })}
        >
          <option value="WEP">WEP</option>
          <option value="WPA">WPA</option>
          <option value="WPA2-EAP">WPA2-EAP</option>
          <option value="nopass">nopass</option>
        </select>
        {errors?.wifiEncryption && (<p className="text-red-500 text-sm">{errors.wifiEncryption.message}</p>)}
      </div>
    </div>
  );
};

export default WifiLogic;