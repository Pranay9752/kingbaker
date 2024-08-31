import OrderTimer from "./OrderTimer";
import BasicButton from "../atom/button/BasicButton";
import { useState } from "react";
import BottomSheet from "../atom/popovers/BottomSheet";
import ProductAddOns from "../components/product_detail/modals/AddonModal";

const ActionButtons = () => {
  const [isAddonOpen, setIsAddonOpen] = useState(false);

  const handleAddonChange = (e, value = null) => {
    setIsAddonOpen((prev) => (value ? value : !prev));
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0  bg-white border-t">
        {/* <OrderTimer /> */}
        <div className="flex">
          <BasicButton className="flex-1 bg-white text-orange-500">
            ADD TO CART
          </BasicButton>
          <BasicButton
            onClick={handleAddonChange}
            className="flex-1 bg-orange-500 text-white"
          >
            BUY NOW
          </BasicButton>
        </div>
      </div>
      <BottomSheet
        maxHeight={"101vh"}
        className={"rounded-t-none"}
        isOpen={isAddonOpen}
        onClose={(e) => handleAddonChange(e, false)}
      >
        <ProductAddOns closeModal={(e) => handleAddonChange(e, false)} />
      </BottomSheet>
    </>
  );
};

export default ActionButtons;
