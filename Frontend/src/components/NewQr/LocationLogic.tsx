import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormInputs as BaseFormInputs } from "../../pages/portal/NewQR";

interface LocationFormInputs extends BaseFormInputs {
  locationTab?: string;
  locationStreet?: string;
  locationArea?: string;
  locationPostalCode?: string;
  locationCity?: string;
  locationState?: string;
  locationCountry?: string;
  latitude?: string;
  longitude?: string;
}

interface LocationLogicProps {
  content: { locationTab?: string; locationStreet?: string; locationArea?: string; locationPostalCode?: string; locationCity?: string; locationState?: string; locationCountry?: string; latitude?: string; longitude?: string; };
  setContent: Dispatch<SetStateAction<{ locationTab?: string; locationStreet?: string; locationArea?: string; locationPostalCode?: string; locationCity?: string; locationState?: string; locationCountry?: string; latitude?: string; longitude?: string; }>>;
  register: UseFormRegister<LocationFormInputs>;
  errors?: FieldErrors<LocationFormInputs>;
}

const LocationLogic: React.FC<LocationLogicProps> = ({ content, setContent, register, errors }) => {
  const locationTabs = ["Complete", "Coordinates"];
  const [locationTab, setLocationTab] = useState<string>(content.locationTab || "Complete");

  const handleTabChange = (tab: string) => {
    setLocationTab(tab);
    setContent((prev) => ({ ...prev, locationTab: tab }));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-2">
        {locationTabs.map((tab) => (
          <button type="button" key={tab} onClick={() => handleTabChange(tab)} className={`py-3 text-sm rounded-md font-semibold ${locationTab === tab ? "text-pink-500 bg-pink-100" : "text-gray-600 hover:text-pink-500"} transition duration-300`}>
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
                {...register("locationStreet", {
                  onChange: (e) => setContent((prev) => ({ ...prev, locationStreet: e.target.value })),
                })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">Area</label>
              <input type="text" placeholder="E.g. Sector-3" 
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                {...register("locationArea", {
                  required: "Area is required",
                  onChange: (e) => setContent((prev) => ({ ...prev, locationArea: e.target.value })),
                })}
              />
              {errors?.locationArea && (<p className="text-red-500 text-sm">{errors.locationArea.message}</p>)}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">Postal Code</label>
              <input type="text" placeholder="E.g. 122001" 
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200" 
                {...register("locationPostalCode", {
                  required: "Postal is required",
                  pattern: {
                    value: /^[0-9]{5,6}$/,
                    message: "Enter a valid postal code",
                  },
                  onChange: (e) => setContent((prev) => ({ ...prev, locationPostalCode: e.target.value })),
                })}
              />
              {errors?.locationPostalCode && (<p className="text-red-500 text-sm">{errors.locationPostalCode.message}</p>)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">City</label>
              <input type="text" placeholder="E.g. Gurugram" 
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                {...register("locationCity", {
                  required: "City is required",
                  onChange: (e) => setContent((prev) => ({ ...prev, locationCity: e.target.value })),
                })}
              />
              {errors?.locationCity && (<p className="text-red-500 text-sm">{errors.locationCity.message}</p>)}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">State</label>
              <input type="text" placeholder="E.g. Haryana" 
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                {...register("locationState", {
                  required: "State is required",
                  onChange: (e) => setContent((prev) => ({ ...prev, locationState: e.target.value })),
                })}
              />
              {errors?.locationState && (<p className="text-red-500 text-sm">{errors.locationState.message}</p>)}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-500">Country</label>
            <input type="text" placeholder="E.g. India" 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              {...register("locationCountry", {
                required: "Country is required",
                onChange: (e) => setContent((prev) => ({ ...prev, locationCountry: e.target.value })),
              })}
            />
            {errors?.locationCountry && (<p className="text-red-500 text-sm">{errors.locationCountry.message}</p>)}
          </div>
        </div>
      )}

      {locationTab === "Coordinates" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-500">Latitude</label>
            <input type="text" placeholder="E.g. 28.4595" 
              className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              {...register("latitude", {
                required: "Latitude is required",
                onChange: (e) => setContent((prev) => ({ ...prev, latitude: e.target.value })),
              })}
            />
            {errors?.latitude && (<p className="text-red-500 text-sm">{errors.latitude.message}</p>)}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-500">Longitude</label>
            <input type="text" placeholder="E.g. 77.0266" 
              className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              {...register("longitude", {
                required: "Longitude is required",
                onChange: (e) => setContent((prev) => ({ ...prev, longitude: e.target.value })),
              })}
            />
            {errors?.longitude && (<p className="text-red-500 text-sm">{errors.longitude.message}</p>)}
          </div>
        </div>
      )}

      {((locationTab === "Coordinates" && content.latitude && content.longitude) ||
        (locationTab === "Complete" && (content.locationStreet || content.locationCity))) && (
        <div className="mt-3">
          <iframe
            title="Location Preview"
            width="100%"
            height="250"
            className="rounded-xl border"
            src={
              locationTab === "Coordinates"
                ? `https://www.google.com/maps?q=${content.latitude},${content.longitude}&output=embed`
                : `https://www.google.com/maps?q=${encodeURIComponent(`${content.locationStreet}, ${content.locationArea}, ${content.locationCity}, ${content.locationState}, ${content.locationCountry}`)}&output=embed`
            }
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default LocationLogic;