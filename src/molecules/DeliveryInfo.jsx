import DeliveryDateSelector from "./DeliveryDateSelector";
import DeliveryLocation from "./DeliveryLocation";
import MessageInput from "./MessageInput";

const DeliveryInfo = () => (
    <div className="flex flex-col justify-start items-start  w-full bg-gray-100">
        <h3 className="font-medium">Deliver To</h3>
        <p className="text-right text-lg text-gray-500 font-bold w-full tracking-tighter">PIN: 401203</p>
        <DeliveryLocation country="IND" pincode="401203" location="Palghar, Maharashtra" />
        <h3 className="mt-3 mb-2 font-medium">Deliver On</h3>
        <DeliveryDateSelector />
        <MessageInput />

    </div>
);

export default DeliveryInfo;