import DeliveryDateSelector from "./DeliveryDateSelector";
import DeliveryLocation from "./DeliveryLocation";
import MessageInput from "./MessageInput";
import getCookie from "../atom/utils/getCookies"
import { memo, useMemo } from "react";
const DeliveryInfo = memo(() => {

  
    const region = useMemo(() => getCookie("region"), []);
    const city = useMemo(() => getCookie("city"), []);
    const pincode = useMemo(() => getCookie("pincode"), []);
  
    const location = useMemo(() => `${city}, ${region}`, [city, region]);
  
    return (
      <div className="flex flex-col justify-start items-start w-full bg-gray-100">
        <h3 className="font-medium">Deliver To</h3>
        <p className="text-right text-lg text-gray-500 font-bold w-full tracking-tighter">
          PIN: {pincode ?? "Unknown"}
        </p>
        <DeliveryLocation
          country="IND"
          pincode={pincode ?? ""}
          location={location}
        />
        <h3 className="mt-3 mb-2 font-medium">Deliver On</h3>
        <DeliveryDateSelector />
        <MessageInput />
      </div>
    );
  });
  
  export default DeliveryInfo;