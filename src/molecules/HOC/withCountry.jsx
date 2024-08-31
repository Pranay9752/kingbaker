import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const withCountry = (WrappedComponent) => {
  return (props) => {
    const [country, setCountry] = useState(Cookies.get("country") || "");
    const [loading, setLoading] = useState(true);

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
