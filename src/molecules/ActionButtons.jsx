import OrderTimer from "./OrderTimer";
import BasicButton from "../atom/button/BasicButton"


const ActionButtons = () => (
    <div
        className="fixed bottom-0 left-0 right-0  bg-white border-t">
        <OrderTimer />
        <div className='flex'>
            <BasicButton className="flex-1 bg-white text-orange-500">ADD TO CART</BasicButton>
            <BasicButton className="flex-1 bg-orange-500 text-white">BUY NOW</BasicButton>
        </div>
    </div>
);

export default ActionButtons;