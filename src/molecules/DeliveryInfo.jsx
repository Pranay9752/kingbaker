import React, { useMemo, memo } from "react";
import DeliveryLocation from "./DeliveryLocation";
import DeliveryDateSelector from "./DeliveryDateSelector";
import MessageInput from "./MessageInput";
import EggOptions from "./EggOption";
import getCookie from "../atom/utils/getCookies";
import CustomizeButton from "../components/product_detail/CustomizeButton";

const DeliveryInfo = ({ data }) => {
  console.log("data: ", data?.is_message);
  const region = useMemo(() => getCookie("region"), []);
  const city = useMemo(() => getCookie("city"), []);
  const pincode = useMemo(() => getCookie("pincode"), []);
  const location = useMemo(() => `${city}, ${region}`, [city, region]);

  return (
    <div className="w-full">
      <div className="md:hidden flex flex-col justify-start items-start bg-gray-100">
        <h3 className="font-medium">Deliver To</h3>
        <p className="text-right text-lg text-gray-500 font-bold w-full tracking-tighter">
          PIN: {pincode ?? "Unknown"}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 md:mt-10">
        <div>
          <DeliveryLocation
            country="IND"
            pincode={pincode ?? ""}
            location={location}
          />
        </div>
        <DeliveryDateSelector />
        {data?.is_veg && <EggOptions className="hidden md:flex" />}
        {data?.is_image && <CustomizeButton className="hidden md:flex" />}
        {data?.is_message && <MessageInput />}
      </div>
    </div>
  );
};

export default DeliveryInfo;
