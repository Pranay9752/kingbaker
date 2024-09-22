import { useNavigate } from "react-router-dom";
import { useGetCartItemQuery } from "../../redux/apiSlices/ecom/checkoutApiSlice";
import getCookie from "../../atom/utils/getCookies";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInit } from "../../redux/slices/ecom/orderSlice";
import OrderDeliveryDetails from "../product_detail/OrderDeliveryDetails";

const AddToCartModal = () => {
  const { data, isLoading, isError } = useGetCartItemQuery();
  console.log(data);

  const cartData = useSelector(state => state.order)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const totalAddons = useMemo(() => {
    const totalAddons = cartData?.reduce((prev, curr) => {
      return prev + curr?.addons?.length ?? 0
    }, 0)
    return totalAddons

  }, [cartData])
  const totalPrice = useMemo(() => {
    const totalAddons = cartData?.reduce((prev, curr) => {
      const itemPrice = curr?.mainItem?.price ?? 0
      let addonPrice = 0
      curr?.addons?.forEach(element => {
        addonPrice = addonPrice + element.price
      });

      return prev + itemPrice + addonPrice
    }, 0)
    return totalAddons
  }, [cartData])


  const transformData = (data) => {
    const tData = data.map((item, index) => {
      console.log(item)
      const main = item?.mainItem ?? {}
      const addons = item?.addOn ?? []
      return {
        mainItem: {
          ...main,
          id: main._id,
          name: "Decorated Chocolate Truffle Cake Half Kg",
          price: 575,
          quantity: 1,
          image:
            "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
        },
        addons: addons?.map((addon) => ({
          id: "ADDON1",
          name: "2 Pc Cadbury Fruit N Nut 36 Gm",
          price: 239,
          quantity: 1,
          image:
            "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
        })),
        deliveryDetails: {

          method: main?.shipping?.method,
          date: main?.shipping?.delivary_date,
          timeSlot: main?.shipping?.time,
          fee: main?.shipping?.shipping_amount ?? 0,
        },
        occasion: null,
        messageCard: "",
        messageOnCake: "",
      }
    })

    return tData

  }

  useEffect(() => {
    if (data) {
      const transformedData = transformData(data?.data?.delivery_details)

      dispatch(addInit(transformedData))
    }
  }, [data])
  return (
    <div className="absolute bg-white rounded-lg shadow-lg w-96 p-4 -translate-x-[calc(100%-30px)]">
      <div className="flex justify-between items-center mb-4 text-gray-800">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="font-semibold text-lg ">My Cart({cartData?.length ?? 0})</span>
        </div>

      </div>

      <div className={`"flex flex-col items-center gap-3`}>
        {
          cartData.length > 0 ? <>
            <div className="max-h-[50vh] overflow-y-auto hide-scrollbar">
              {
                cartData.map((cartItem, index) => {

                  return <div className="relative">
                    <OrderDeliveryDetails
                      className={"border-none shadow-none "}
                      key={cartItem?.mainItem?.id}
                      index={index}
                      addons={cartItem?.addons ?? []}
                      deliveryDetails={cartItem?.deliveryDetails ?? {}}
                      addresses={data?.delivary_address ?? []}
                      mainItem={cartItem?.mainItem ?? {}}
                      occasion={cartItem?.occasion ?? null}
                      isCart={true}
                      dense={true}
                      handleOccation={() => { }}
                    />
                    <div className="absolute bg-[#7D8035] rounded-br-lg py-1 px-1.5 text-xs text-white font-semibold left-0 top-0">
                      {index + 1}
                    </div>
                    <div className="border" />

                  </div>
                })
              }
            </div>
            <div className=" text-gray-700 grid grid-cols-2 w-full mb-4">
              <p className="text-gray-500  ">Base Items: <span className="font-bold">{cartData?.length ?? 0}</span></p>
              <p className="text-lg text-gray-500 font-mwdium text-right">Total: <span className="font-bold">₹ {totalPrice ?? 0}</span></p>
              <p className="text-gray-500  ">Total Addons: <span className="font-bold">{totalAddons ?? 0}</span></p>
            </div>
            <button
              type="button"

              onClick={() => navigate('/checkout/details')}
              className="w-full bg-orange-500 text-white py-2 rounded-md mb-3 font-semibold"
            >
              Procced To Checkout
            </button>
          </> : <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-9 text-green-500"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </div>
            {getCookie("isAuth") === "true" ? (
              <>
                <h2 className="text-xl font-semibold mb-2 text-green-700 text-center">
                  No Item Found!
                </h2>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2 text-green-700 text-center">
                  Missing Cart Item?
                </h2>
                <p className="text-sm text-center text-gray-600">
                  Login to see items you added previously
                </p>
              </>
            )}
          </>
        }

      </div>
      {getCookie("isAuth") !== "true" && (
        <>
          <button
            type="button"

            onClick={() => navigate('/account/login')}
            className="w-full bg-orange-500 text-white py-2 rounded-md mb-3 font-semibold"
          >
            LOGIN
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full text-orange-500 py-2 rounded-md border border-orange-500 font-semibold"
          >
            CONTINUE SHOPPING
          </button>
        </>
      )}
    </div>
  );
};

export default AddToCartModal;
