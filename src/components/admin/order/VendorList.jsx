import React, { useState } from "react";
import OrderCard from "../../../molecules/cards/OrderCard";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import DateRangeOneFilter from "../../../molecules/date/DatePicker";

function VendorList() {
  const [selectedOrders, setSelectedOrder] = useState([]);
  const dummyOrder = [
    {
      orderNumber: 5622438801,
      total: 360,
      customerName: "Ashok Kumar",
      address:
        "274/27 Bhartiya Colony, Jansath Road, Muzaffarnagar, India, 251001",
      phone: "(M) 9837179264",
      deliveryType: "Express Delivery",
      date: "30-09-2024",
      time: "08:00:00 - 13:00:00 hrs",
      items: [
        {
          name: "Crunchy Butterscotch Cake",
          description: "Half Kg Eggless, Cream, 6 inches",
          price: 275,
          quantity: 1,
          image:
            "https://hulk.fnp.com/images/pr/x/v20240905144123/perfect-picture-personalised-frame_1.jpg",
        },
        {
          name: "Magic Relighting Candle",
          description: "Add-on item",
          price: 10,
          quantity: 1,
          image:
            "https://hulk.fnp.com/images/pr/x/v20240905144123/perfect-picture-personalised-frame_1.jpg",
        },
      ],
    },
    {
      orderNumber: 5622438802,
      total: 360,
      customerName: "Ashok Kumar",
      address:
        "274/27 Bhartiya Colony, Jansath Road, Muzaffarnagar, India, 251001",
      phone: "(M) 9837179264",
      deliveryType: "Express Delivery",
      date: "30-09-2024",
      time: "08:00:00 - 13:00:00 hrs",
      items: [
        {
          name: "Crunchy Butterscotch Cake",
          description: "Half Kg Eggless, Cream, 6 inches",
          price: 275,
          quantity: 1,
          image:
            "https://hulk.fnp.com/images/pr/x/v20240905144123/perfect-picture-personalised-frame_1.jpg",
        },
        {
          name: "Magic Relighting Candle",
          description: "Add-on item",
          price: 10,
          quantity: 1,
          image:
            "https://hulk.fnp.com/images/pr/x/v20240905144123/perfect-picture-personalised-frame_1.jpg",
        },
      ],
    },
    {
      orderNumber: 5622438803,
      total: 360,
      customerName: "Ashok Kumar",
      address:
        "274/27 Bhartiya Colony, Jansath Road, Muzaffarnagar, India, 251001",
      phone: "(M) 9837179264",
      deliveryType: "Express Delivery",
      date: "30-09-2024",
      time: "08:00:00 - 13:00:00 hrs",
      items: [
        {
          name: "Crunchy Butterscotch Cake",
          description: "Half Kg Eggless, Cream, 6 inches",
          price: 275,
          quantity: 1,
          image:
            "https://hulk.fnp.com/images/pr/x/v20240905144123/perfect-picture-personalised-frame_1.jpg",
        },
        {
          name: "Magic Relighting Candle",
          description: "Add-on item",
          price: 10,
          quantity: 1,
          image:
            "https://hulk.fnp.com/images/pr/x/v20240905144123/perfect-picture-personalised-frame_1.jpg",
        },
      ],
    },
    {
      orderNumber: 5622438804,
      total: 360,
      customerName: "Ashok Kumar",
      address:
        "274/27 Bhartiya Colony, Jansath Road, Muzaffarnagar, India, 251001",
      phone: "(M) 9837179264",
      deliveryType: "Express Delivery",
      date: "30-09-2024",
      time: "08:00:00 - 13:00:00 hrs",
      items: [
        {
          name: "Crunchy Butterscotch Cake",
          description: "Half Kg Eggless, Cream, 6 inches",
          price: 275,
          quantity: 1,
          image:
            "https://hulk.fnp.com/images/pr/x/v20240905144123/perfect-picture-personalised-frame_1.jpg",
        },
        {
          name: "Magic Relighting Candle",
          description: "Add-on item",
          price: 10,
          quantity: 1,
          image:
            "https://hulk.fnp.com/images/pr/x/v20240905144123/perfect-picture-personalised-frame_1.jpg",
        },
      ],
    },
    {
      orderNumber: 5622438805,
      total: 360,
      customerName: "Ashok Kumar",
      address:
        "274/27 Bhartiya Colony, Jansath Road, Muzaffarnagar, India, 251001",
      phone: "(M) 9837179264",
      deliveryType: "Express Delivery",
      date: "30-09-2024",
      time: "08:00:00 - 13:00:00 hrs",
      items: [
        {
          name: "Crunchy Butterscotch Cake",
          description: "Half Kg Eggless, Cream, 6 inches",
          price: 275,
          quantity: 1,
          image:
            "https://hulk.fnp.com/images/pr/x/v20240905144123/perfect-picture-personalised-frame_1.jpg",
        },
        {
          name: "Magic Relighting Candle",
          description: "Add-on item",
          price: 10,
          quantity: 1,
          image:
            "https://hulk.fnp.com/images/pr/x/v20240905144123/perfect-picture-personalised-frame_1.jpg",
        },
      ],
    },
  ];

  const handleSelectedOrder = ({ orderNumber }) => {
    setSelectedOrder((prev) => {
      if (!orderNumber) return prev;
      const newArr = [...prev];
      if (newArr.includes(orderNumber)) {
        return newArr.filter((item) => item !== orderNumber);
      } else {
        return [...newArr, orderNumber];
      }
    });
  };
  return (
    <div>
      <HeaderLayout
        id={1}
        logoSrc="https://i.ibb.co/NYGqQxs/Screenshot-20240915-192128-Drive.jpg"
        logoAlt="King Baker Logo"
        title="KING BAKER"
      >
        <div className="flex flex-col justify-start items-start gap-4 w-full">
          <div className="w-full">
            <DateRangeOneFilter
              handleDateChange={(date) => console.log(date)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            {dummyOrder?.map((order) => (
              <OrderCard
                handleSelectedOrder={handleSelectedOrder}
                isActive={
                  selectedOrders?.includes(order?.orderNumber ?? "") ?? false
                }
                order={order}
              />
            ))}
          </div>
        </div>
      </HeaderLayout>
    </div>
  );
}

export default VendorList;
