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

const LocationEditLogic: React.FC<LocationLogicProps> = ({ content, setContent }) => {
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
    if (content?.locationStreet && content.locationStreet !== locationStreet) {
      setLocationStreet(content.locationStreet);
    }

    if (content?.locationArea && content.locationStreet !== locationArea) {
      setLocationArea(content.locationArea);
    }

    if (content?.locationPostalCode && content.locationPostalCode !== locationPostalCode) {
      setLocationPostalCode(content.locationPostalCode);
    }

    if (content?.locationCity && content.locationCity !== locationCity) {
      setLocationCity(content.locationCity);
    }

    if (content?.locationState && content.locationState !== locationState) {
      setLocationState(content.locationState);
    }

    if (content?.locationCountry && content.locationCountry !== locationCountry) {
      setLocationCountry(content.locationCountry);
    }

    if (content?.latitude && content.latitude !== latitude) {
      setLatitude(content.latitude);
    }

    if (content?.longitude && content.longitude !== longitude) {
      setLongitude(content.longitude);
    }
  }, [content]);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-2">
        {locationTabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setLocationTab(tab)}
            className={`py-3 text-sm rounded-md ${
              locationTab === tab
                ? "text-pink-500 bg-pink-100"
                : "text-gray-600 hover:text-pink-500 hover:bg-pink-100"
            } transition duration-300`}
          >
            {tab}
          </button>
        ))}
      </div>

      {locationTab === "Complete" && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="w-full md:w-2/3 flex flex-col gap-2">
              <label>Street</label>
              <input type="text" placeholder="E.g. 403" value={locationStreet} onChange={(e) => setLocationStreet(e.target.value)} className="p-2 border border-gray-300 rounded" />
            </div>
            <div className="flex flex-col gap-2">
              <label>Area</label>
              <input type="text" placeholder="E.g. Sector-3" value={locationArea} onChange={(e) => setLocationArea(e.target.value)} className="p-2 border border-gray-300 rounded" required />
            </div>
            <div className="flex flex-col gap-2">
              <label>Postal Code</label>
              <input type="text" placeholder="E.g. 122001" value={locationPostalCode} onChange={(e) => setLocationPostalCode(e.target.value)} className="p-2 border border-gray-300 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <label>City</label>
              <input type="text" placeholder="E.g. Gurugram" value={locationCity} onChange={(e) => setLocationCity(e.target.value)} className="p-2 border border-gray-300 rounded" required/>
            </div>
            <div className="flex flex-col gap-2">
              <label>State</label>
              <input type="text" placeholder="E.g. Haryana" value={locationState} onChange={(e) => setLocationState(e.target.value)} className="p-2 border border-gray-300 rounded" required/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Country</label>
            <input type="text" placeholder="E.g. India" value={locationCountry} onChange={(e) => setLocationCountry(e.target.value)} className="p-2 border border-gray-300 rounded" required/>
          </div>
        </div>
      )}

      {locationTab === "Coordinates" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Latitude</label>
            <input type="text" placeholder="E.g. 28.4595" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="w-full lg:w-2/3 p-2 border border-gray-300 rounded" required/>
          </div>
          <div className="flex flex-col gap-2">
            <label>Longitude</label>
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

export default LocationEditLogic;