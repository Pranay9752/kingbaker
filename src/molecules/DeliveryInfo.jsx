import React, { useMemo, memo, useEffect } from "react";
import DeliveryLocation from "./DeliveryLocation";
import DeliveryDateSelector from "./DeliveryDateSelector";
import MessageInput from "./MessageInput";
import EggOptions from "./EggOption";
import getCookie from "../atom/utils/getCookies";
import CustomizeButton from "../components/product_detail/CustomizeButton";
import { useNavigate, useParams } from "react-router-dom";
import BasicButton from "../atom/button/BasicButton";

const DeliveryInfo = ({ data }) => {
  const { productId } = useParams();
  const region = useMemo(() => getCookie("region"), []);
  const city = useMemo(() => getCookie("city"), []);
  const pincode = useMemo(() => getCookie("pincode"), []);
  const location = useMemo(() => `${city}, ${region}`, [city, region]);

  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="md:hidden flex flex-col justify-start items-start bg-gray-100">
        <h3 className="font-medium">Deliver To</h3>
        <p className="text-right text-lg text-gray-500 font-bold w-full tracking-tighter">
          PIN: {pincode ?? "Unknown"}
        </p>
      </div>
      {productId == "cake3" ? (
        <BasicButton
          className={`bg-orange-400 w-full rounded-lg md:w-fit px-4 text-white focus:scale-90 hover:bg-orange-700 ease-in duration-150`}
          onClick={() => navigate(-1)}
        >
          The product not availabe in pincode
        </BasicButton>
      ) : (
        <div className="grid md:grid-cols-2 md:gap-x-8 gap-y-3 md:mt-10">
          <div className="w-[96vw] md:w-auto">
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
      )}
    </div>
  );
};

export default DeliveryInfo;
