import React, { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import { cn } from "../../atom/utils/cn";

const LocationAutocomplete = ({ onLocationSelect, regionRestriction, className }) => {
  const [inputValue, setInputValue] = useState("");
  const autocompleteRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Wait for the Google Maps API to load
    const initAutocomplete = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        setTimeout(initAutocomplete, 100);
        return;
      }
      
      if (containerRef.current && !autocompleteRef.current) {
        // Initialize the PlaceAutocompleteElement
        const { PlaceAutocompleteElement } = window.google.maps.places;
        
        // Clear the container before adding the new element
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        
        // Create a custom input to mimic your original styling
        const inputElement = document.createElement('input');
        inputElement.className = cn("w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200", className);
        inputElement.placeholder = "Enter location or pincode";
        inputElement.value = inputValue;
        containerRef.current.appendChild(inputElement);
        
        // Set up autocomplete options
        const options = {
          types: ["geocode", "establishment"],
        };
        
        if (regionRestriction) {
          options.componentRestrictions = { country: regionRestriction };
        }
        
        // Create the autocomplete element
        autocompleteRef.current = new PlaceAutocompleteElement({
          inputElement,
          options
        });
        
        // Add event listener for place selection
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current.getPlace();
          handlePlaceSelect(place);
        });
        
        // Update input value in state when user types
        inputElement.addEventListener('input', (e) => {
          setInputValue(e.target.value);
        });
      }
    };
    
    // Load Google Maps script if not already loaded
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = initAutocomplete;
    } else {
      initAutocomplete();
    }
    
    return () => {
      // Clean up
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [className, regionRestriction]);
  
  const handlePlaceSelect = (place) => {
    if (!place || !place.address_components || !place.geometry) return;
    
    // Keep original variables
    let city = "";
    let pincode = "";
    let country = "";
    let countryCode = "";
    let state = "";
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();
    
    // Create a new field for all address components
    const allAddressComponents = {};
    
    place.address_components.forEach((component) => {
      // Fill the original fields as before
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
      
      // Store all address component types
      component.types.forEach(type => {
        allAddressComponents[type] = {
          long_name: component.long_name,
          short_name: component.short_name
        };
      });
    });
    
    // Original structure with added allAddressComponents
    const locationData = {
      city,
      state,
      pincode,
      country,
      countryCode,
      lat,
      lng,
      formatted_address: place.formatted_address,
      place_id: place.place_id,
      allAddressComponents
    };
    
    setInputValue(place.formatted_address); // Set input field with selected place
    onLocationSelect(locationData);
  };
  
  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
      <div 
        ref={containerRef} 
        className="w-full"
      ></div>
    </div>
  );
};

export default LocationAutocomplete;