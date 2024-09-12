// import DeliveryDateSelector from "./DeliveryDateSelector";
// import DeliveryLocation from "./DeliveryLocation";
// import MessageInput from "./MessageInput";
// import getCookie from "../atom/utils/getCookies";
// import { memo, useMemo } from "react";
// import EggOptions from "./EggOption";
// const DeliveryInfo = memo(() => {
//   const region = useMemo(() => getCookie("region"), []);
//   const city = useMemo(() => getCookie("city"), []);
//   const pincode = useMemo(() => getCookie("pincode"), []);

//   const location = useMemo(() => `${city}, ${region}`, [city, region]);

//   return (
//     <>
//       <div className="md:hidden flex flex-col justify-start items-start w-full bg-gray-100">
//         <h3 className="font-medium">Deliver To</h3>
//         <p className="text-right text-lg text-gray-500 font-bold w-full tracking-tighter">
//           PIN: {pincode ?? "Unknown"}
//         </p>
//         <DeliveryLocation
//           country="IND"
//           pincode={pincode ?? ""}
//           location={location}
//         />
//         <h3 className="mt-3 mb-2 font-medium">Deliver On</h3>
//         <DeliveryDateSelector />
//         <MessageInput />
//       </div>
//       <div className="hidden md:grid grid-cols-2 gap-x-8 gap-y-3 mt-10">
//         <div>
//           <DeliveryLocation
//             country="IND"
//             pincode={pincode ?? ""}
//             location={location}
//           />
//         </div>
//         <DeliveryDateSelector />
//         <EggOptions />
//         <MessageInput />
//       </div>
//     </>
//   );
// });

// export default DeliveryInfo;
import React, { useMemo, memo } from "react";
import DeliveryLocation from "./DeliveryLocation";
import DeliveryDateSelector from "./DeliveryDateSelector";
import MessageInput from "./MessageInput";
import EggOptions from "./EggOption";
import getCookie from "../atom/utils/getCookies";

const DeliveryInfo = () => {
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
        <EggOptions className="hidden md:block" />
        <MessageInput />
      </div>
    </div>
  );
};

export default DeliveryInfo;
