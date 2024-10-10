import OrderTimer from "./OrderTimer";
import BasicButton from "../atom/button/BasicButton";
import { useState } from "react";
import BottomSheet from "../atom/popovers/BottomSheet";
import ProductAddOns from "../components/product_detail/modals/AddonModal";
import ModalWrapper from "./wrappers/ModalWrapper";
import { useGetAddOnQuery } from "../redux/apiSlices/ecom/productsApiSlice";

const ActionButtons = ({ productId }) => {
  const [isAddonOpen, setIsAddonOpen] = useState(false);
  const { data } = useGetAddOnQuery();
  const handleAddonChange = (e, value = null) => {
    setIsAddonOpen((prev) => (value ? value : !prev));
  };

  return (
    <>
      <div className=" fixed md:static bottom-0 left-0 right-0  bg -white border-t md:border-none">
        {/* <OrderTimer /> */}
        <div className="flex md:grid md:grid-cols-2 md:gap-x-8 md:mt-5">
          <BasicButton
            type={"button"}
            onClick={handleAddonChange}
            className="flex-1 bg-white text-orange-500 md:text-white md:bg-[#7D8035] md:rounded-lg  md:shadow"
          >
            <div className="text-lg font-extrabold flex gap-2 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>

              <span className="md:font-semibold">ADD TO CART</span>
            </div>{" "}
          </BasicButton>
          <BasicButton
            type={"button"}
            onClick={handleAddonChange}
            className="flex-1 bg-orange-500 text-white md:rounded-lg md:shadow"
          >
            <div className="text-lg font-extrabold flex gap-2 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="md:font-semibold">BUY NOW</span>
            </div>
          </BasicButton>
        </div>
      </div>
      {/* <BottomSheet
        maxHeight={"101vh"}
        className={"rounded-t-none top-0"}
        isOpen={isAddonOpen}
        onClose={(e) => handleAddonChange(e, false)}
      >
        <ProductAddOns closeModal={(e) => handleAddonChange(e, false)} />
      </BottomSheet> */}
      <ModalWrapper
        maxHeight={"101vh"}
        className={"rounded-t-none md:rounded-t-lg top-0"}
        isOpen={isAddonOpen}
        onClose={(e) => handleAddonChange(e, false)}
      >
        <ProductAddOns
          productId={productId}
          addons={data?.data ?? []}
          closeModal={(e) => handleAddonChange(e, false)}
        />
      </ModalWrapper>
    </>
  );
};

export default ActionButtons;
