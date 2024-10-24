import { useState } from "react";
import OwnerHeader from "../../../molecules/header/OwnerHeader";
import OrderCard from "../../../molecules/cards/OrderCard";

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
        imageLink: [
          "https://example.com/images/product1.jpg",
        ],
        title: "Flower Bouquet",
        description: "A beautiful bouquet of red roses.",
        prices: 500,
      },
    ],
    addOn: [
      {
        image: [
          "https://example.com/images/card.jpg",
        ],
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
        imageLink: [
          "https://example.com/images/product2.jpg",
        ],
        title: "Chocolate Gift Box",
        description: "Delicious assorted chocolates.",
        prices: 800,
      },
    ],
    addOn: [
      {
        image: [
          "https://example.com/images/teddy.jpg",
        ],
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
        imageLink: [
          "https://example.com/images/product3.jpg",
        ],
        title: "Fruit Basket",
        description: "A basket filled with fresh seasonal fruits.",
        prices: 700,
      },
    ],
    addOn: [
      {
        image: [
          "https://example.com/images/wine.jpg",
        ],
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
        imageLink: [
          "https://example.com/images/product4.jpg",
        ],
        title: "Luxury Candle Set",
        description: "A set of aromatic candles.",
        prices: 1000,
      },
    ],
    addOn: [
      {
        image: [
          "https://example.com/images/incense.jpg",
        ],
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
        imageLink: [
          "https://example.com/images/product5.jpg",
        ],
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
        imageLink: [
          "https://example.com/images/product6.jpg",
        ],
        title: "Handcrafted Jewelry",
        description: "A unique handcrafted jewelry set.",
        prices: 2000,
      },
    ],
    addOn: [
      {
        image: [
          "https://example.com/images/card.jpg",
        ],
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
        imageLink: [
          "https://example.com/images/product7.jpg",
        ],
        title: "Gourmet Chocolate Box",
        description: "A box of premium gourmet chocolates.",
        prices: 800,
      },
    ],
    addOn: [
      {
        image: [
          "https://example.com/images/teddy.jpg",
        ],
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
        imageLink: [
          "https://example.com/images/product8.jpg",
        ],
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
        imageLink: [
          "https://example.com/images/product9.jpg",
        ],
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
        imageLink: [
          "https://example.com/images/product10.jpg",
        ],
        title: "Handmade Soap Collection",
        description: "A collection of handmade organic soaps.",
        prices: 600,
      },
    ],
    addOn: [
      {
        image: [
          "https://example.com/images/card.jpg",
        ],
        title: "Greeting Card",
        description: "A personalized card.",
        price: 50,
        count: { count: 1 },
      },
    ],
  },
];




const OwnerOrders = ({ }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleSelectedOrder = (order) => {
    if (selectedOrders.includes(order.order_id)) {
      setSelectedOrders((prev) =>
        prev.filter((id) => id !== order.order_id)
      );
    } else {
      setSelectedOrders((prev) => [...prev, order.order_id]);
    }
  };

  const handleDetailView = ({ index }) => {
    console.log("Viewing details for order at index:", index);
  };
  return (
    <>

      <OwnerHeader isActive={"Orders"}>
        <div className="w-full bg-black text-gray-300 p-4 rounded-lg">



          {orders.map((order, index) => (
            <OrderCard
              key={order.order_id}
              order={order}
              isActive={selectedOrders.includes(order.order_id)}
              handleSelectedOrder={handleSelectedOrder}
              handleDetailView={handleDetailView}
              index={index}
              darkMode
            />
          ))}

        </div>
      </OwnerHeader>


    </>
  );
};



export default OwnerOrders;
