import React, { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface LocationContent {
  locationTab?: string,
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
  content: LocationContent;
  setContent: Dispatch<SetStateAction<LocationContent>>;
}

const LocationLogic: React.FC<LocationLogicProps> = ({ content, setContent }) => {
  const locationTabs = ["Complete", "Coordinates"];
  const [locationTab, setLocationTab] = useState<string>("Complete");

  const [locationStreet, setLocationStreet] = useState<string>("");
  const [locationArea, setLocationArea] = useState<string>("");
  const [locationPostalCode, setLocationPostalCode] = useState<string>("");
  const [locationCity, setLocationCity] = useState<string>("");
  const [locationState, setLocationState] = useState<string>("");
  const [locationCountry, setLocationCountry] = useState<string>("");

  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  useEffect(() => {
    setContent({ locationTab, locationStreet, locationArea, locationPostalCode, locationCity, locationState, locationCountry, latitude, longitude });
  }, [locationTab, locationStreet, locationArea, locationPostalCode, locationCity, locationState, locationCountry, latitude, longitude, setContent]);

  useEffect(() => {
    if (!content?.locationStreet) setLocationStreet('');
    if (!content?.locationArea) setLocationArea('');
    if (!content?.locationPostalCode) setLocationPostalCode('');
    if (!content?.locationCity) setLocationCity('');
    if (!content?.locationState) setLocationState('');
    if (!content?.locationCountry) setLocationCountry('');
    if (!content?.latitude) setLatitude('');
    if (!content?.longitude && content.longitude !== longitude) setLongitude('');
  }, [content]);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-2">
        {locationTabs.map((tab) => (
          <button type="button" key={tab} onClick={() => setLocationTab(tab)} className={`py-3 text-sm rounded-md font-semibold ${locationTab === tab ? "text-pink-500 bg-pink-100" : "text-gray-600 hover:text-pink-500"} transition duration-300`}>
            {tab}
          </button>
        ))}
      </div>

      {locationTab === "Complete" && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="w-full md:w-2/3 flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">Street</label>
              <input type="text" placeholder="E.g. 403" value={locationStreet} onChange={(e) => setLocationStreet(e.target.value)} className="p-2 border border-gray-300 rounded" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">Area</label>
              <input type="text" placeholder="E.g. Sector-3" value={locationArea} onChange={(e) => setLocationArea(e.target.value)} className="p-2 border border-gray-300 rounded" required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">Postal Code</label>
              <input type="text" placeholder="E.g. 122001" value={locationPostalCode} onChange={(e) => setLocationPostalCode(e.target.value)} className="p-2 border border-gray-300 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">City</label>
              <input type="text" placeholder="E.g. Gurugram" value={locationCity} onChange={(e) => setLocationCity(e.target.value)} className="p-2 border border-gray-300 rounded" required/>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">State</label>
              <input type="text" placeholder="E.g. Haryana" value={locationState} onChange={(e) => setLocationState(e.target.value)} className="p-2 border border-gray-300 rounded" required/>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-500">Country</label>
            <input type="text" placeholder="E.g. India" value={locationCountry} onChange={(e) => setLocationCountry(e.target.value)} className="p-2 border border-gray-300 rounded" required/>
          </div>
        </div>
      )}

      {locationTab === "Coordinates" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-500">Latitude</label>
            <input type="text" placeholder="E.g. 28.4595" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" required/>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-500">Longitude</label>
            <input type="text" placeholder="E.g. 77.0266" value={longitude} onChange={(e) => setLongitude(e.target.value)} className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" required/>
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

export default LocationLogic;