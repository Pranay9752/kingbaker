import React, { useEffect, useState, useCallback } from "react";
import OrderCard from "../../../molecules/cards/OrderCard";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import DateRangeOneFilter from "../../../molecules/date/DatePicker";
import { useGetOrdersMutation } from "../../../redux/apiSlices/admin/vendor";
import { decryptData } from "../../../atom/utils/encryption";
import { useParams } from "react-router-dom";
import OrderDetailsCard from "./OrderDetail";

function OrderList() {
  const { ids } = useParams();
  const [selectedOrders, setSelectedOrder] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderDetailIndex, setOrderDetailIndex] = useState(null);

  const [getOrders, { isLoading }] = useGetOrdersMutation();

  // Memoized handleSelectedOrder to avoid re-creating it on every render
  const handleSelectedOrder = useCallback(({ order_id }) => {
    setSelectedOrder((prev) => {
      if (!order_id) return prev;
      if (prev.includes(order_id)) {
        return prev.filter((item) => item !== order_id);
      } else {
        return [...prev, order_id];
      }
    });
  }, []);

  const handleDetailView = ({ index }) => setOrderDetailIndex(index);

  useEffect(() => {
    const getData = async (decryptedData) => {
      try {
        const response = await getOrders({ data: decryptedData }).unwrap();
        setOrders(response?.orders ?? []);
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
        logoSrc="https://i.ibb.co/NYGqQxs/Screenshot-20240915-192128-Drive.jpg"
        logoAlt="King Baker Logo"
        title="KING BAKER"
      >
        {orderDetailIndex ? (
          <OrderDetailsCard orderData={orders[orderDetailIndex]} />
        ) : (
          <div className="flex flex-col justify-start items-start gap-4 w-full">
            <div className="w-full">
              <DateRangeOneFilter
                handleDateChange={(date) => console.log(date)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              {Array.isArray(orders) &&
                orders.map((order, index) => (
                  <OrderCard
                  index={index}
                  handleDetailView={handleDetailView}
                    key={order.order_id} // Add key for better reconciliation
                    handleSelectedOrder={handleSelectedOrder}
                    isActive={selectedOrders.includes(order?.order_id ?? "")}
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
