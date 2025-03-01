// import React, { useEffect, useState, useCallback } from "react";
// import OrderCard from "../../../molecules/cards/OrderCard";
// import HeaderLayout from "../../../molecules/header/HeaderLayout";
// import DateRangeOneFilter from "../../../molecules/date/DatePicker";
// import { useGetOrdersMutation } from "../../../redux/apiSlices/admin/vendor";
// import { decryptData } from "../../../atom/utils/encryption";
// import { useParams } from "react-router-dom";
// import OrderDetailsCard from "./OrderDetail";

// function OrderList() {
//   const { type, ids } = useParams();
//   console.log("type, ids: ", type, ids);
//   const [selectedOrders, setSelectedOrder] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [orderDetailIndex, setOrderDetailIndex] = useState(null);

//   const [getOrders, { isLoading }] = useGetOrdersMutation();

//   // Memoized handleSelectedOrder to avoid re-creating it on every render
//   const handleSelectedOrder = useCallback(({ order_id, user_id }) => {
//     setSelectedOrder((prev) => {
//       if (!order_id) return prev;
//       if (prev.includes(order_id)) {
//         return prev.filter((item) => item !== order_id);
//       } else {
//         return [...prev, order_id];
//       }
//     });
//   }, []);

//   const handleDetailView = ({ index }) => setOrderDetailIndex(index);

//   useEffect(() => {
//     const getData = async (decryptedData) => {
//       try {
//         const response = await getOrders({ data: decryptedData }).unwrap();
//         setOrders(response?.orders ?? []);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     if (ids) {
//       const decryptedData = decryptData(ids);
//       getData(decryptedData);
//     }
//   }, [ids, getOrders]);

//   return (
//     <div>
//       <HeaderLayout
//         id={1}
//         logoSrc="https://i.ibb.co/LdtMrSfq/jojo-cart-logo-02.png"
//         logoAlt="King Baker Logo"
//         title="KING BAKER"
//       >
//         {orderDetailIndex ? (
//           <OrderDetailsCard orderData={orders[orderDetailIndex]} />
//         ) : (
//           <div className="flex flex-col justify-start items-start gap-4 w-full">
//             <div className="w-full">
//               <DateRangeOneFilter
//                 handleDateChange={(date) => console.log(date)}
//               />
//             </div>
//             <div className="flex flex-col w-full gap-2">
//               {Array.isArray(orders) &&
//                 orders.map((order, index) => (
//                   <OrderCard
//                     index={index}
//                     handleDetailView={handleDetailView}
//                     key={order.order_id} // Add key for better reconciliation
//                     handleSelectedOrder={handleSelectedOrder}
//                     isActive={selectedOrders.includes(order?.order_id ?? "")}
//                     order={order}
//                   />
//                 ))}
//             </div>
//           </div>
//         )}
//       </HeaderLayout>
//     </div>
//   );
// }

// export default OrderList;
import React, { useEffect, useState, useCallback } from "react";
import OrderCard from "../../../molecules/cards/OrderCard";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import DateRangeOneFilter from "../../../molecules/date/DatePicker";
import {
  useGetOrdersMutation,
  useUpdateOrderStatusMutation,
  useUpdatePrintStatusMutation,
} from "../../../redux/apiSlices/admin/vendor";
import { decryptData } from "../../../atom/utils/encryption";
import { useNavigate, useParams } from "react-router-dom";
import OrderDetailsCard from "./OrderDetail";
import BasicButton from "../../../atom/button/BasicButton";
import { toast } from "sonner";
import BrandingChallanPDF from "../pdfs/brandingChallan";
import ChallanPDF from "../pdfs/challanPDF";
import ReactPDF from "@react-pdf/renderer";
import ModalWrapper from "../../../molecules/wrappers/ModalWrapper";
import AllocateDeliveryBoy from "./AllocateDeliveryBoy";
import getCookie from "../../../atom/utils/getCookies";
import SEO from "../../../atom/seo/SEO";

function OrderList() {
  const { type, day, ids } = useParams();
  const navigate = useNavigate();
  const [selectedOrders, setSelectedOrder] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderDetailIndex, setOrderDetailIndex] = useState(null);
  const [allocateDelivery, setAllocateDelivery] = useState(false);
  console.log("allocateDelivery: ", allocateDelivery);

  const [getOrders, { isLoading }] = useGetOrdersMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [updatePrintStatus] = useUpdatePrintStatusMutation();

  const handleAccept = async () => {
    try {
      await Promise.all(
        selectedOrders?.map((item) => {
          return updateOrderStatus({
            order_id: item?.order_id,
            user_id: item?.user_id,
            vendor_id: getCookie("_id"),
          });
        })
      );

      window.location.href = "/admin/dashboard";
      toast.success("All Selected Orders Accepted");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const printChallan = async () => {
    if (selectedOrders?.length == 0) return;
    try {
      await Promise.all(
        selectedOrders?.map((item) => {
          updatePrintStatus({
            order_ids: [item?.order_id],
            user_id: item?.user_id,
            vendor_id: getCookie("_id"),
          });
        })
      );

      const order_ids = selectedOrders?.map((item) => item?.order_id);

      const filteredOrders = orders?.filter((item) =>
        order_ids?.includes(item.order_id)
      );
      console.log("filteredOrders: ", filteredOrders);

      const blob = await ReactPDF.pdf(
        // <BrandingChallanPDF data={filteredOrders} />
        <ChallanPDF data={filteredOrders} />
      ).toBlob();
      {
        /* <ChallanPDF data={filteredOrders} /> */
      }

      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Branding CHALLAN.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.location.href = "/admin/dashboard";
      toast.success("All Selected Orders Accepted");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const printBrandingChallan = () => {};

  // Updated handleSelectedOrder to store both order_id and user_id
  const handleSelectedOrder = useCallback(({ order_id, user_id }) => {
    setSelectedOrder((prev) => {
      if (!order_id) return prev;
      const existingOrderIndex = prev.findIndex(
        (item) => item.order_id === order_id
      );
      if (existingOrderIndex !== -1) {
        return prev.filter((_, index) => index !== existingOrderIndex);
      } else {
        return [...prev, { order_id, user_id }];
      }
    });
  }, []);

  const handleDetailView = ({ index }) => setOrderDetailIndex(index);

  useEffect(() => {
    const getData = async (decryptedData) => {
      try {
        const response = await getOrders({ data: decryptedData }).unwrap();
        setOrders(response ?? []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (ids) {
      const decryptedData = decryptData(ids);
      getData(decryptedData);
    }
  }, [ids, getOrders]);

  return (
    <div>
      <HeaderLayout
        id={1}
        logoSrc="https://i.ibb.co/LdtMrSfq/jojo-cart-logo-02.png"
        logoAlt="King Baker Logo"
        title="KING BAKER"
      >
        <SEO title={"Orders"} />

        {orderDetailIndex !== null ? (
          <OrderDetailsCard
            order={orders[orderDetailIndex]}
            onClose={() => setOrderDetailIndex(null)}
          />
        ) : (
          <div className="flex flex-col justify-start items-start gap-4 w-full">
            <div className="w-full flex gap-3">
              {/* <DateRangeOneFilter
                handleDateChange={(date) => console.log(date)}
              /> */}
              {type == "allocated" && (
                <BasicButton
                  className={`border border-gray-800 px-2 py-1 text-xs rounded-lg bg-pgreen`}
                  onClick={handleAccept}
                >
                  Accept Order
                </BasicButton>
              )}
              {type != "allocated" && (
                <>
                  <BasicButton
                    className={`border border-gray-800 px-2 py-1 text-xs rounded-lg bg-pgreen`}
                    onClick={() => setAllocateDelivery(true)}
                  >
                    Allocate To Delivery
                  </BasicButton>
                  <BasicButton
                    className={`border border-gray-800 px-2 py-1 text-xs rounded-lg bg-pgreen`}
                    onClick={printChallan}
                  >
                    Print Challan
                  </BasicButton>
                  {/* <BasicButton
                    className={`border border-gray-800 px-2 py-1 text-xs rounded-lg bg-pgreen`}
                    onClick={printBrandingChallan}
                  >
                    Print Branding Challan
                  </BasicButton> */}
                </>
              )}
            </div>
            <ModalWrapper
              isOpen={allocateDelivery}
              height={"50vh"}
              onClose={() => setAllocateDelivery(true)}
            >
              <AllocateDeliveryBoy
                onClose={() => setAllocateDelivery(true)}
                selectedOrders={selectedOrders?.map((item) => item?.order_id)}
              />
            </ModalWrapper>
            <div className="flex flex-col w-full gap-2">
              {Array.isArray(orders) &&
                orders.map((order, index) => (
                  <OrderCard
                    index={index}
                    handleDetailView={handleDetailView}
                    key={order.order_id}
                    handleSelectedOrder={handleSelectedOrder}
                    isActive={selectedOrders.some(
                      (item) => item.order_id === order?.order_id
                    )}
                    order={order}
                  />
                ))}
            </div>
          </div>
        )}
      </HeaderLayout>
    </div>
  );
}

export default OrderList;
