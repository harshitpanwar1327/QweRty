import React, { useState } from "react";
import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { EditFormInputs } from "../../pages/portal/EditQR";

interface LocationLogicProps {
  content?: EditFormInputs["content"];
  register: UseFormRegister<EditFormInputs>;
  errors?: FieldErrors<EditFormInputs>;
  watch: UseFormWatch<EditFormInputs>;
}

const LocationEditLogic: React.FC<LocationLogicProps> = ({ register, errors, watch }) => {
  const locationTabs = ["Complete", "Coordinates"];
  const [locationTab, setLocationTab] = useState<string>("Complete");

  const locationStreet = watch("content.locationStreet") || "";
  const locationArea = watch("content.locationArea") || "";
  const locationCity = watch("content.locationCity") || "";
  const locationState = watch("content.locationState") || "";
  const locationCountry = watch("content.locationCountry") || "";
  const latitude = watch("content.latitude") || "";
  const longitude = watch("content.longitude") || "";

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-2">
        {locationTabs.map((tab) => (
          <button type="button" key={tab} onClick={() => setLocationTab(tab)} className={`py-3 text-sm rounded-md font-semibold ${locationTab === tab ? "text-pink-500 bg-pink-100" : "text-gray-600 hover:text-pink-500"} transition duration-300`} >
            {tab}
          </button>
        ))}
      </div>

      {locationTab === "Complete" && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="w-full md:w-2/3 flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">Street</label>
              <input type="text" placeholder="E.g. 403" 
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200" 
                {...register("content.locationStreet")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">Area</label>
              <input type="text" placeholder="E.g. Sector-3" 
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200" 
                {...register("content.locationArea", {
                  required: "Area is required",
                })}
              />
              {errors?.content?.locationArea && (<p className="text-red-500 text-sm">{errors.content?.locationArea.message}</p>)}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">Postal Code</label>
              <input type="text" placeholder="E.g. 122001" 
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                {...register("content.locationPostalCode", {
                  required: "Postal is required",
                  pattern: {
                    value: /^[0-9]{5,6}$/,
                    message: "Enter a valid postal code",
                  }
                })}
              />
              {errors?.content?.locationPostalCode && (<p className="text-red-500 text-sm">{errors.content?.locationPostalCode.message}</p>)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">City</label>
              <input type="text" placeholder="E.g. Gurugram" 
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                {...register("content.locationCity", {
                  required: "City is required"
                })}
              />
              {errors?.content?.locationCity && (<p className="text-red-500 text-sm">{errors.content?.locationCity.message}</p>)}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">State</label>
              <input type="text" placeholder="E.g. Haryana" 
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                {...register("content.locationState", {
                  required: "State is required"
                })}
              />
              {errors?.content?.locationState && (<p className="text-red-500 text-sm">{errors.content?.locationState.message}</p>)}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-500">Country</label>
            <input type="text" placeholder="E.g. India" 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              {...register("content.locationCountry", {
                required: "Country is required",
              })}
            />
            {errors?.content?.locationCountry && (<p className="text-red-500 text-sm">{errors.content?.locationCountry.message}</p>)}
          </div>
        </div>
      )}

      {locationTab === "Coordinates" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-500">Latitude</label>
            <input type="text" placeholder="E.g. 28.4595" 
              className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              {...register("content.latitude", {
                required: "Latitude is required"
              })} 
            />
            {errors?.content?.latitude && (<p className="text-red-500 text-sm">{errors.content?.latitude.message}</p>)}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-500">Longitude</label>
            <input type="text" placeholder="E.g. 77.0266" 
              className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              {...register("content.longitude", {
                required: "Longitude is required"
              })} 
            />
            {errors?.content?.longitude && (<p className="text-red-500 text-sm">{errors.content?.longitude.message}</p>)}
          </div>
        </div>
      )}

      {((locationTab === "Coordinates" && latitude && longitude) ||
        (locationTab === "Complete" && (locationStreet || locationCity))) && (
        <div className="mt-3">
          <iframe
            title="Location Preview"
            width="100%"
            height="250"
            className="rounded-xl border"
            src={
              locationTab === "Coordinates"
                ? `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`
                : `https://www.google.com/maps?q=${encodeURIComponent(`${locationStreet}, ${locationArea}, ${locationCity}, ${locationState}, ${locationCountry}`)}&output=embed`
            }
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default LocationEditLogic;