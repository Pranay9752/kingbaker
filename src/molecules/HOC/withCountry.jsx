
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import axios from "axios";
import PlacesAutocomplete from "react-places-autocomplete";

const countries = [
  { label: 'India', code: 'IN' },
  { label: 'United States', code: 'US' },
  { label: 'Canada', code: 'CA' },
  { label: 'Australia', code: 'AU' },
  // Add more countries as needed
];

const PincodeAutocomplete = () => {
  const [country, setCountry] = useState('IN'); // Default to India
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState('');
  const [addressDetails, setAddressDetails] = useState({});

  useEffect(() => {
    if (window.google) {
      const input = document.getElementById('autocomplete-input');
      const autocompleteInstance = new window.google.maps.places.Autocomplete(input, {
        types: ['geocode'],
        componentRestrictions: { country },
      });

      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace();
        const components = place.address_components;
        setAddress(place.formatted_address);
        setAddressDetails(extractAddressDetails(components));
      });

      setAutocomplete(autocompleteInstance);
    }
  }, [country]);

  // Extract pincode, area, city, and state from address components
  const extractAddressDetails = (addressComponents) => {
    let pincode = '';
    let area = '';
    let city = '';
    let state = '';

    addressComponents.forEach((component) => {
      const types = component.types;
      if (types.includes('postal_code')) {
        pincode = component.long_name;
      }
      if (types.includes('sublocality_level_1') || types.includes('locality')) {
        area = component.long_name;
      }
      if (types.includes('administrative_area_level_2')) {
        city = component.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        state = component.long_name;
      }
    });

    return { pincode, area, city, state };
  };

  return (
    <div className="pincode-autocomplete">
      {/* Country Dropdown */}
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="input-field mb-4"
      >
        {countries.map((countryOption) => (
          <option key={countryOption.code} value={countryOption.code}>
            {countryOption.label}
          </option>
        ))}
      </select>

      {/* Autocomplete Input Field */}
      <input
        id="autocomplete-input"
        type="text"
        placeholder="Enter Pincode or Address"
        className="input-field"
      />

      {/* Show Address Details */}
      {addressDetails.pincode && (
        <div className="address-details mt-4">
          <p><strong>Pincode:</strong> {addressDetails.pincode}</p>
          <p><strong>Area:</strong> {addressDetails.area}</p>
          <p><strong>City:</strong> {addressDetails.city}</p>
          <p><strong>State:</strong> {addressDetails.state}</p>
        </div>
      )}
    </div>
  );
};

const withCountry = (WrappedComponent) => {
  return (props) => {
    const [country, setCountry] = useState(Cookies.get("country") || "");
    const [loading, setLoading] = useState(true);
    const [isPincode, setIsPincode] = useState(false);

    useEffect(() => {
      const fetchCountry = async () => {
        if (!country) {
          try {
            // Fetch the user's country
            const ipResponse = await axios.get(
              "https://api.ipify.org?format=json"
            );
            const ip = ipResponse.data.ip;

            const locationResponse = await axios.get(
              `https://ipapi.co/${ip}/json/`
            );

            const fetchedCountry = {
              flag: `https://flagsapi.com/${locationResponse.data.country_code}/shiny/64.png`,
              code: locationResponse.data.country_code,
              name: locationResponse.data.country_name,
            };

            // Set the country in state and cookies
            setCountry(JSON.stringify(fetchedCountry));
            // setIsPincode(true);
            Cookies.set("country", JSON.stringify(fetchedCountry), {
              expires: 7,
            });
            Cookies.set("pincode", locationResponse.data.postal, {
              expires: 7,
            });
            Cookies.set("city", locationResponse.data.city, {
              expires: 7,
            });
            Cookies.set("region", locationResponse.data.region, {
              expires: 7,
            });
          
          } catch (error) {
            console.error("Error fetching the user country:", error);
          }
        }
        setLoading(false);
      };

      fetchCountry();
    }, [country]);

    if (isPincode) {
      return (
        <div>
          <PincodeAutocomplete />
        </div>
      );
    }
    if (loading) {
      return (
        <div className="flex-col gap-4 w-full h-[100vh] flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withCountry;
