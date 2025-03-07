import React, { useState } from "react";
import LocationAutocomplete from "./LocationAutocomplete";
import setCookie from "../../atom/utils/setCookies";
import { X } from "lucide-react";

const LocationPopover = ({ onClose }) => {
  const [open, setOpen] = useState(true);
  const [region, setRegion] = useState("within");
  const [locationData, setLocationData] = useState(null);

  const storeLocation = async () => {
    if (!locationData?.pincode) return;
    try {
      const fetchedCountry = {
        flag: `https://flagsapi.com/${locationData.countryCode}/shiny/64.png`,
        code: locationData.countryCode,
        name: locationData.country,
      };

      setCookie("country", JSON.stringify(fetchedCountry));
      setCookie("pincode", locationData.pincode);
      setCookie("city", locationData.city);
      setCookie("region", locationData.state);
      // setCookie("lat", 19.4166761);
      // setCookie("lng", 72.79837049999999);
      setCookie("lat", locationData.lat);
      setCookie("lng", locationData.lng);
      location.reload();
    } catch (error) {
      console.error("Error fetching the user country:", error);
    }
  };

  return (
    <div className="fixed text-gray-800 z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">
            Let's Personalize Your Experience!
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Find the perfect gifts for you or your loved ones – it's like magic!
          </p>
        </div>

        {/* Radio Buttons */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="region"
              value="within"
              checked={region === "within"}
              onChange={(e) => setRegion(e.target.value)}
              className="w-4 h-4 text-orange-300 border-gray-300 focus:ring-orange-200"
            />
            <span>Within India</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="region"
              value="outside"
              checked={region === "outside"}
              onChange={(e) => setRegion(e.target.value)}
              className="w-4 h-4 text-orange-300 border-gray-300 focus:ring-orange-200"
            />
            <span>Outside India</span>
          </label>
        </div>

        {/* Location Autocomplete Input */}
        <LocationAutocomplete
          apiKey="YOUR_GOOGLE_API_KEY"
          onLocationSelect={setLocationData}
          regionRestriction={region === "within" ? "IN" : undefined}
        />



        {/* Continue Button */}
        <button
          onClick={storeLocation}
          className="w-full mt-6 py-2 bg-orange-200 hover:bg-orange-300 text-black rounded-md font-medium transition-colors"
        >
          CONTINUE SHOPPING
        </button>

        {
          onClose ? <button className="absolute top-3 right-3" type="button" onClick={onClose}><X className="" /></button> : <></>
        }
      </div>
    </div>
  );
};

export default LocationPopover;
