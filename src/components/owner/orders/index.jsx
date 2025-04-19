import { useState } from "react";
import OwnerHeader from "../../../molecules/header/OwnerHeader";
import OrderCard from "../../../molecules/cards/OrderCard";
import OrderDetailsCard from "../../admin/order/OrderDetail";
import { useGetOrderOfVendorQuery } from "../../../redux/apiSlices/owner/order";
import ModalWrapper from "../../../molecules/wrappers/ModalWrapper";
import UpdateOrderModal from "./updateOrderModal";
import SEO from "../../../atom/seo/SEO";

const orders = [
  {
    order_id: "ORD0001",
    deliveryAddresses: [
      {
        recipientName: "Alice Johnson",
        recipientAddress: "123 Maple St, Springfield",
        recipientMobnumber: "+1-555-123-4567",
      },
    ],
    shipping: {
      method: "Standard Delivery",
      delivary_date: "2024-10-26T10:00:00Z",
      time: "10:00 AM - 2:00 PM",
      shipping_amount: 50,
    },
    user: [{ _id: "USER001", name: "Alice Johnson" }],
    productDetails: [
      {
        imageLink: ["https://example.com/images/product1.jpg"],
        title: "Flower Bouquet",
        description: "A beautiful bouquet of red roses.",
        prices: 500,
      },
    ],
    addOn: [
      {
        image: ["https://example.com/images/card.jpg"],
        title: "Greeting Card",
        description: "A personalized card.",
        price: 50,
        count: { count: 1 },
      },
    ],
  },
  {
    order_id: "ORD0002",
    deliveryAddresses: [
      {
        recipientName: "Bob Smith",
        recipientAddress: "456 Oak St, Metropolis",
        recipientMobnumber: "+1-555-987-6543",
      },
    ],
    shipping: {
      method: "Express Delivery",
      delivary_date: "2024-10-27T14:00:00Z",
      time: "2:00 PM - 4:00 PM",
      shipping_amount: 100,
    },
    user: [{ _id: "USER002", name: "Bob Smith" }],
    productDetails: [
      {
        imageLink: ["https://example.com/images/product2.jpg"],
        title: "Chocolate Gift Box",
        description: "Delicious assorted chocolates.",
        prices: 800,
      },
    ],
    addOn: [
      {
        image: ["https://example.com/images/teddy.jpg"],
        title: "Teddy Bear",
        description: "A soft and cuddly teddy bear.",
        price: 200,
        count: { count: 1 },
      },
    ],
  },
  {
    order_id: "ORD0003",
    deliveryAddresses: [
      {
        recipientName: "Charlie Evans",
        recipientAddress: "789 Pine St, Gotham",
        recipientMobnumber: "+1-555-444-3333",
      },
    ],
    shipping: {
      method: "Same Day Delivery",
      delivary_date: "2024-10-25T18:00:00Z",
      time: "6:00 PM - 8:00 PM",
      shipping_amount: 150,
    },
    user: [{ _id: "USER003", name: "Charlie Evans" }],
    productDetails: [
      {
        imageLink: ["https://example.com/images/product3.jpg"],
        title: "Fruit Basket",
        description: "A basket filled with fresh seasonal fruits.",
        prices: 700,
      },
    ],
    addOn: [
      {
        image: ["https://example.com/images/wine.jpg"],
        title: "Bottle of Wine",
        description: "A premium bottle of red wine.",
        price: 300,
        count: { count: 1 },
      },
    ],
  },
  {
    order_id: "ORD0004",
    deliveryAddresses: [
      {
        recipientName: "David White",
        recipientAddress: "321 Elm St, Star City",
        recipientMobnumber: "+1-555-222-1111",
      },
    ],
    shipping: {
      method: "Next Day Delivery",
      delivary_date: "2024-10-26T12:00:00Z",
      time: "12:00 PM - 4:00 PM",
      shipping_amount: 75,
    },
    user: [{ _id: "USER004", name: "David White" }],
    productDetails: [
      {
        imageLink: ["https://example.com/images/product4.jpg"],
        title: "Luxury Candle Set",
        description: "A set of aromatic candles.",
        prices: 1000,
      },
    ],
    addOn: [
      {
        image: ["https://example.com/images/incense.jpg"],
        title: "Incense Sticks",
        description: "A pack of calming incense sticks.",
        price: 100,
        count: { count: 2 },
      },
    ],
  },
  {
    order_id: "ORD0005",
    deliveryAddresses: [
      {
        recipientName: "Evelyn King",
        recipientAddress: "987 Willow St, Central City",
        recipientMobnumber: "+1-555-888-7777",
      },
    ],
    shipping: {
      method: "Standard Delivery",
      delivary_date: "2024-10-27T09:00:00Z",
      time: "9:00 AM - 11:00 AM",
      shipping_amount: 50,
    },
    user: [{ _id: "USER005", name: "Evelyn King" }],
    productDetails: [
      {
        imageLink: ["https://example.com/images/product5.jpg"],
        title: "Luxury Perfume Set",
        description: "A collection of luxury perfumes.",
        prices: 1500,
      },
    ],
    addOn: [],
  },
  {
    order_id: "ORD0006",
    deliveryAddresses: [
      {
        recipientName: "Frank Lee",
        recipientAddress: "543 Cedar St, Coast City",
        recipientMobnumber: "+1-555-666-5555",
      },
    ],
    shipping: {
      method: "Same Day Delivery",
      delivary_date: "2024-10-25T15:00:00Z",
      time: "3:00 PM - 5:00 PM",
      shipping_amount: 200,
    },
    user: [{ _id: "USER006", name: "Frank Lee" }],
    productDetails: [
      {
        imageLink: ["https://example.com/images/product6.jpg"],
        title: "Handcrafted Jewelry",
        description: "A unique handcrafted jewelry set.",
        prices: 2000,
      },
    ],
    addOn: [
      {
        image: ["https://example.com/images/card.jpg"],
        title: "Greeting Card",
        description: "A personalized card.",
        price: 50,
        count: { count: 1 },
      },
    ],
  },
  {
    order_id: "ORD0007",
    deliveryAddresses: [
      {
        recipientName: "Grace Harris",
        recipientAddress: "222 Maple St, Metropolis",
        recipientMobnumber: "+1-555-777-6666",
      },
    ],
    shipping: {
      method: "Express Delivery",
      delivary_date: "2024-10-26T14:00:00Z",
      time: "2:00 PM - 4:00 PM",
      shipping_amount: 100,
    },
    user: [{ _id: "USER007", name: "Grace Harris" }],
    productDetails: [
      {
        imageLink: ["https://example.com/images/product7.jpg"],
        title: "Gourmet Chocolate Box",
        description: "A box of premium gourmet chocolates.",
        prices: 800,
      },
    ],
    addOn: [
      {
        image: ["https://example.com/images/teddy.jpg"],
        title: "Teddy Bear",
        description: "A soft and cuddly teddy bear.",
        price: 200,
        count: { count: 1 },
      },
    ],
  },
  {
    order_id: "ORD0008",
    deliveryAddresses: [
      {
        recipientName: "Henry Brown",
        recipientAddress: "1234 Oak St, Gotham",
        recipientMobnumber: "+1-555-999-8888",
      },
    ],
    shipping: {
      method: "Next Day Delivery",
      delivary_date: "2024-10-26T16:00:00Z",
      time: "4:00 PM - 6:00 PM",
      shipping_amount: 75,
    },
    user: [{ _id: "USER008", name: "Henry Brown" }],
    productDetails: [
      {
        imageLink: ["https://example.com/images/product8.jpg"],
        title: "Artisanal Cheese Basket",
        description: "A selection of fine artisanal cheeses.",
        prices: 1200,
      },
    ],
    addOn: [],
  },
  {
    order_id: "ORD0009",
    deliveryAddresses: [
      {
        recipientName: "Isabella Green",
        recipientAddress: "567 Willow St, Springfield",
        recipientMobnumber: "+1-555-222-3333",
      },
    ],
    shipping: {
      method: "Same Day Delivery",
      delivary_date: "2024-10-25T19:00:00Z",
      time: "7:00 PM - 9:00 PM",
      shipping_amount: 150,
    },
    user: [{ _id: "USER009", name: "Isabella Green" }],
    productDetails: [
      {
        imageLink: ["https://example.com/images/product9.jpg"],
        title: "Spa Gift Set",
        description: "A luxurious spa gift set.",
        prices: 1300,
      },
    ],
    addOn: [],
  },
  {
    order_id: "ORD0010",
    deliveryAddresses: [
      {
        recipientName: "Jack Miller",
        recipientAddress: "999 Pine St, Central City",
        recipientMobnumber: "+1-555-444-5555",
      },
    ],
    shipping: {
      method: "Standard Delivery",
      delivary_date: "2024-10-27T11:00:00Z",
      time: "11:00 AM - 1:00 PM",
      shipping_amount: 50,
    },
    user: [{ _id: "USER010", name: "Jack Miller" }],
    productDetails: [
      {
        imageLink: ["https://example.com/images/product10.jpg"],
        title: "Handmade Soap Collection",
        description: "A collection of handmade organic soaps.",
        prices: 600,
      },
    ],
    addOn: [
      {
        image: ["https://example.com/images/card.jpg"],
        title: "Greeting Card",
        description: "A personalized card.",
        price: 50,
        count: { count: 1 },
      },
    ],
  },
];

const detailorder = {
  order_id: "ORD123456789",
  deliveryAddresses: [
    {
      recipientName: "John Doe",
      recipientAddress: "123 Main St, Springfield",
      recipientMobnumber: "9876543210",
    },
  ],
  addOn: [
    {
      title: "Extra Balloon Set",
      description: "A set of 5 colorful balloons",
      price: "50",
      count: { count: 2 },
      image: ["https://example.com/images/balloon.jpg"],
    },
    {
      title: "Gift Wrapping",
      description: "Beautifully wrapped gift",
      price: "30",
      count: { count: 1 },
      image: ["https://example.com/images/giftwrap.jpg"],
    },
  ],
  shipping: {
    delivary_date: "2024-10-31",
    method: "Express",
    time: "2-3 days",
    shipping_amount: "150",
  },
  user: [
    {
      _id: "user123",
      name: "Jane Doe",
      mobile: "9876543210",
      email: "jane.doe@example.com",
    },
  ],
  productDetails: [
    {
      title: "Floral Bouquet",
      description: "A beautiful bouquet of fresh flowers",
      prices: "500",
      imageLink: ["https://example.com/images/bouquet.jpg"],
    },
  ],
  timeDifference: "2 hours",
  allocationTime: "10:00 AM",
  acceptanceTime: "12:00 PM",
  personalizedImage: "https://example.com/images/personalized.jpg",
  message: "Happy Birthday! Wishing you all the best.",
  specialInstructions: "Leave at the front door if no one is home.",
};

const OwnerOrders = ({}) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orderDetailIndex, setOrderDetailIndex] = useState(null);
  const [showUpdatePanel, setShowUpdatePanel] = useState(false);
  const { data } = useGetOrderOfVendorQuery();
  const handleSelectedOrder = (order) => {
    if (selectedOrders.includes(order.order_id)) {
      setSelectedOrders((prev) => prev.filter((id) => id !== order.order_id));
    } else {
      setSelectedOrders((prev) => [...prev, order.order_id]);
    }
  };

  const transformOrderData = (data) => {
    console.log("data: ", data?.sender_details || {});
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
      productDetails: data?.productDetails?.map((product) => ({
        title: product?.title || null,
        description: product?.description || null,
        prices: product?.prices?.toString() || null,
        imageLink: product?.imageLink || [],
      })),
      sender_details: { ...(data?.sender_details || {}) },
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
      <OwnerHeader isActive={"Orders"}>
        <SEO title={"Orders"} />

        <div className="w-full bg-black text-gray-300 p-4 rounded-lg">
          {orderDetailIndex !== null ? (
            <OrderDetailsCard
              isUpdate
              onUpdateClick={onUpdateClick}
              onClose={() => setOrderDetailIndex(null)}
              order={transformOrderData(data?.data?.[orderDetailIndex]) ?? {}}
              darkMode
            />
          ) : (
            // <OrderDetailsCard order={orders[orderDetailIndex]} />
            data?.data?.map((order, index) => (
              <OrderCard
                key={order.order_id}
                order={order}
                isActive={selectedOrders.includes(order.order_id)}
                handleSelectedOrder={handleSelectedOrder}
                handleDetailView={handleDetailView}
                index={index}
                darkMode
              />
            ))
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
      </OwnerHeader>
    </>
  );
};

export default OwnerOrders;
