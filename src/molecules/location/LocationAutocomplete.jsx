import React, { useState, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import { MapPin } from "lucide-react";
import { cn } from "../../atom/utils/cn";
const LocationAutocomplete = ({ onLocationSelect, regionRestriction, className }) => {
  const [inputValue, setInputValue] = useState("");

  const handlePlaceSelect = (place) => {
    console.log("place: ", place);
    if (!place || !place.address_components || !place.geometry) return;

    let city = "";
    let pincode = "";
    let country = "";
    let countryCode = "";
    let state = "";
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();

    place.address_components.forEach((component) => {
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("postal_code")) {
        pincode = component.long_name;
      }
      if (component.types.includes("country")) {
        country = component.long_name;
        countryCode = component.short_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.long_name;
      }
    });

    setInputValue(place.formatted_address); // Set input field with selected place
    onLocationSelect({ city, state, pincode, country, countryCode, lat, lng });
  };

  useEffect(() => {
    // Ensure dropdown stays on top
    const dropdown = document.querySelector(".pac-container");
    if (dropdown) {
      dropdown.style.zIndex = "9999"; // Ensure it appears above modal
      dropdown.style.position = "absolute";
    }
  }, [inputValue]);

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Autocomplete
        apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY}
        onPlaceSelected={handlePlaceSelect}
        options={{
          types: ["geocode"],
          componentRestrictions: regionRestriction ? { country: regionRestriction } : undefined,
        }}
        className={cn("w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200 ", className)}
        placeholder="Enter location or pincode"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default LocationAutocomplete;
