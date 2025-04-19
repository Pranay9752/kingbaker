import React, { useState } from "react";
import { useGetOrderOfUserQuery } from "../../redux/apiSlices/account.jsx/accountSlice";
import getCookie from "../../atom/utils/getCookies";
import ModalWrapper from "../../molecules/wrappers/ModalWrapper";
import OrderDetailsCard from "../admin/order/OrderDetail";
import OrderCard from "../../molecules/cards/OrderCard";
import UpdateOrderModal from "../owner/orders/updateOrderModal";
import UserOrderCard from "./UserOrderCard";

function UserOrders() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orderDetailIndex, setOrderDetailIndex] = useState(null);
  const [showUpdatePanel, setShowUpdatePanel] = useState(false);
  const { data } = useGetOrderOfUserQuery({ user_id: getCookie("_id") });
  const handleSelectedOrder = (order) => {
    if (selectedOrders.includes(order.order_id)) {
      setSelectedOrders((prev) => prev.filter((id) => id !== order.order_id));
    } else {
      setSelectedOrders((prev) => [...prev, order.order_id]);
    }
  };

  const transformOrderData = (data) => {
    return {
      order_id: data?.order_id || null,
      deliveryAddresses: data?.deliveryAddresses?.map((address) => ({
        recipientName: address?.recipientName || null,
        recipientAddress: address?.recipientAddress || null,
        recipientMobnumber: address?.recipientMobnumber || null,
      })),
      addOn: data?.addOn?.map((addon) => ({
        title: addon?.title || null,
        description: addon?.description || null,
        price: addon?.price?.toString() || null,
        count: { count: addon?.count?.count || 0 },
        image: addon?.images || [],
      })),
      shipping: {
        delivary_date: "2024-10-31", // assuming a fixed date; replace as necessary
        method: data?.shipping.method || null,
        time: data?.shipping?.time || null,
        shipping_amount: data?.shipping?.shipping_amount.toString() || null,
      },
      user: [
        {
          _id: data?.vendor?._id || null,
          name: data?.vendor?.name || null,
          mobile: data?.vendor?.phone || null,
          email: data?.vendor?.email || null,
        },
      ],
      sender_details: { ...(data?.sender_details || {}) },
      productDetails: data?.productDetails?.map((product) => ({
        title: product?.title || null,
        description: product?.description || null,
        prices: product?.prices?.toString() || null,
        imageLink: product?.imageLink || [],
      })),
      timeDifference: data?.shipping?.time || null, // assuming a fixed value; replace as necessary
      allocationTime: "10:00 AM", // assuming a fixed time; replace as necessary
      acceptanceTime: "12:00 PM", // assuming a fixed time; replace as necessary
      personalizedImage: data?.images?.[0] || null,
      message: data?.message_on_product || null,
      specialInstructions: data?.special_request || null,
    };
  };

  const handleDetailView = ({ index }) => setOrderDetailIndex(index);

  const onUpdateClick = () => {
    setShowUpdatePanel(true);
  };

  return (
    <>
      <div className="w-full  p-4 rounded-lg overflow-y-auto h-[70vh]">
        {orderDetailIndex !== null ? (
          <OrderDetailsCard
            //   isUpdate
            isPrintChallan={false}
            onUpdateClick={onUpdateClick}
            onClose={() => setOrderDetailIndex(null)}
            order={
              transformOrderData({
                ...data?.data?.delivery_details?.[orderDetailIndex]?.mainItem,
                addOn: data?.data?.delivery_details?.[orderDetailIndex]?.addOn,
              }) ?? {}
            }
            //   darkMode
          />
        ) : (
          // <OrderDetailsCard order={orders[orderDetailIndex]} />
          data?.data?.delivery_details
            ?.map((order, index) => {
              return (
                <UserOrderCard
                  key={order.mainItem.order_id}
                  order={{ ...order?.mainItem, addOn: order?.addOn }}
                  isActive={selectedOrders.includes(order.mainItem.order_id)}
                  handleSelectedOrder={handleSelectedOrder}
                  handleDetailView={handleDetailView}
                  index={index}
                  // darkMode
                />
              );
            })
            ?.reverse() || <></>
        )}
      </div>
      <ModalWrapper
        maxHeight={"101vh"}
        className={`p-3 text-gray-300 `}
        backgroundColor={"#1a1f25"}
        isOpen={showUpdatePanel}
        onClose={() => setShowUpdatePanel(null)}
      >
        <UpdateOrderModal
          data={transformOrderData(data?.data?.[orderDetailIndex]) ?? {}}
          onClose={() => setShowUpdatePanel(null)}
        />
      </ModalWrapper>
    </>
  );
}

export default UserOrders;
