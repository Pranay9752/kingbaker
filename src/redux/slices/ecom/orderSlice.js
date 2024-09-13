import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    mainItem: {
      id: "GIFT1",
      name: "Decorated Chocolate Truffle Cake Half Kg",
      price: 575,
      quantity: 1,
      image:
        "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
    },
    addons: [
      {
        id: "ADDON1",
        name: "2 Pc Cadbury Fruit N Nut 36 Gm",
        price: 239,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
      {
        id: "ADDON2",
        name: "Birthday Wishes Topper",
        price: 99,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
      {
        id: "ADDON3",
        name: "Fathers Day Greeting Card",
        price: 99,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
    ],
    deliveryDetails: {
      date: "10 Oct",
      timeSlot: "1:00 PM - 2:00 PM Hrs",
      fee: 99,
    },
    occasion: null,
    messageCard: "",
    messageOnCake: "",
  },
  {
    mainItem: {
      id: "GIFT2",
      name: "Decorated Chocolate Truffle Cake Half Kg",
      price: 575,
      quantity: 1,
      image:
        "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
    },
    addons: [
      {
        id: "ADDON21",
        name: "2 Pc Cadbury Fruit N Nut 36 Gm",
        price: 239,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
      {
        id: "ADDON22",
        name: "Birthday Wishes Topper",
        price: 99,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
      {
        id: "ADDON23",
        name: "Fathers Day Greeting Card",
        price: 99,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
    ],
    deliveryDetails: {
      date: "10 Oct",
      timeSlot: "1:00 PM - 2:00 PM Hrs",
      fee: 99,
    },
    occasion: null,
    messageCard: "",
    messageOnCake: "",
  },
  {
    mainItem: {
      id: "GIFT3",
      name: "Decorated Chocolate Truffle Cake Half Kg",
      price: 575,
      quantity: 1,
      image:
        "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
    },
    addons: [
      {
        id: "ADDON31",
        name: "2 Pc Cadbury Fruit N Nut 36 Gm",
        price: 239,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
      {
        id: "ADDON32",
        name: "Birthday Wishes Topper",
        price: 99,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
      {
        id: "ADDON33",
        name: "Fathers Day Greeting Card",
        price: 99,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
    ],
    deliveryDetails: {
      date: "10 Oct",
      timeSlot: "1:00 PM - 2:00 PM Hrs",
      fee: 99,
    },
    occasion: null,
    messageCard: "",
    messageOnCake: "",
  },
  {
    mainItem: {
      id: "GIFT4",
      name: "Decorated Chocolate Truffle Cake Half Kg",
      price: 575,
      quantity: 1,
      image:
        "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
    },
    addons: [
      {
        id: "ADDON1",
        name: "2 Pc Cadbury Fruit N Nut 36 Gm",
        price: 239,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
      {
        id: "ADDON2",
        name: "Birthday Wishes Topper",
        price: 99,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
      {
        id: "ADDON3",
        name: "Fathers Day Greeting Card",
        price: 99,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
    ],
    deliveryDetails: {
      date: "10 Oct",
      timeSlot: "1:00 PM - 2:00 PM Hrs",
      fee: 99,
    },
    occasion: null,
    messageCard: "",
    messageOnCake: "",
  },
  {
    mainItem: {
      id: "GIFT5",
      name: "Decorated Chocolate Truffle Cake Half Kg",
      price: 575,
      quantity: 1,
      image:
        "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
    },
    addons: [
      {
        id: "ADDON1",
        name: "2 Pc Cadbury Fruit N Nut 36 Gm",
        price: 239,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
      {
        id: "ADDON2",
        name: "Birthday Wishes Topper",
        price: 99,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
      {
        id: "ADDON3",
        name: "Fathers Day Greeting Card",
        price: 99,
        quantity: 1,
        image:
          "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
      },
    ],
    deliveryDetails: {
      date: "10 Oct",
      timeSlot: "1:00 PM - 2:00 PM Hrs",
      fee: 99,
    },
    occasion: null,
    messageCard: "",
    messageOnCake: "",
  },
];

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateMainItem: (state, action) => {
      state.mainItem = { ...state.mainItem, ...action.payload };
    },
    deleteOrder: (state, action) => {
      const { id } = action.payload;
      const newState = [...state];

      return newState.filter((item) => item?.mainItem?.id != id);
    },
    updateAddonQuantity: (state, action) => {
      const { id, change, orderIndex } = action.payload;
      const addon = state[orderIndex].addons.find((addon) => addon.id === id);
      if (addon) {
        addon.quantity = Math.max(0, addon.quantity + change);
      }
    },
    deleteAddon: (state, action) => {
      const { id, orderIndex } = action.payload;
      state[orderIndex].addons = state[orderIndex].addons.filter(
        (addon) => addon.id !== id
      );
    },
    addAddon: (state, action) => {
      state.addons.push(action.payload);
    },
    updateDeliveryDetails: (state, action) => {
      state.deliveryDetails = { ...state.deliveryDetails, ...action.payload };
    },
    addOccasion: (state, action) => {
      const { occationIndex, data } = action.payload;

      const newOrder = { ...state[occationIndex], occasion: data };
      state[occationIndex] = newOrder;
    },
    setMessageCard: (state, action) => {
      state.messageCard = action.payload;
    },
    setMessageOnCake: (state, action) => {
      state.messageOnCake = action.payload;
    },
    resetOrder: () => initialState,
  },
});

export const {
  updateMainItem,
  updateAddonQuantity,
  deleteAddon,
  addAddon,
  updateDeliveryDetails,
  addOccasion,
  setMessageCard,
  setMessageOnCake,
  resetOrder,
  deleteOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
