import { createSlice } from "@reduxjs/toolkit";

// const initialState = [
//   {
//     mainItem: {
//       id: "GIFT1",
//       name: "Decorated Chocolate Truffle Cake Half Kg",
//       price: 575,
//       quantity: 1,
//       image:
//         "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
//     },
//     addons: [
//       {
//         id: "ADDON1",
//         name: "2 Pc Cadbury Fruit N Nut 36 Gm",
//         price: 239,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//       {
//         id: "ADDON2",
//         name: "Birthday Wishes Topper",
//         price: 99,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//       {
//         id: "ADDON3",
//         name: "Fathers Day Greeting Card",
//         price: 99,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//     ],
//     deliveryDetails: {
//       date: "10 Oct",
//       timeSlot: "1:00 PM - 2:00 PM Hrs",
//       fee: 99,
//     },
//     occasion: null,
//     messageCard: "",
//     messageOnCake: "",
//   },
//   {
//     mainItem: {
//       id: "GIFT2",
//       name: "Decorated Chocolate Truffle Cake Half Kg",
//       price: 575,
//       quantity: 1,
//       image:
//         "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
//     },
//     addons: [
//       {
//         id: "ADDON21",
//         name: "2 Pc Cadbury Fruit N Nut 36 Gm",
//         price: 239,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//       {
//         id: "ADDON22",
//         name: "Birthday Wishes Topper",
//         price: 99,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//       {
//         id: "ADDON23",
//         name: "Fathers Day Greeting Card",
//         price: 99,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//     ],
//     deliveryDetails: {
//       date: "10 Oct",
//       timeSlot: "1:00 PM - 2:00 PM Hrs",
//       fee: 99,
//     },
//     occasion: null,
//     messageCard: "",
//     messageOnCake: "",
//   },
//   {
//     mainItem: {
//       id: "GIFT3",
//       name: "Decorated Chocolate Truffle Cake Half Kg",
//       price: 575,
//       quantity: 1,
//       image:
//         "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
//     },
//     addons: [
//       {
//         id: "ADDON31",
//         name: "2 Pc Cadbury Fruit N Nut 36 Gm",
//         price: 239,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//       {
//         id: "ADDON32",
//         name: "Birthday Wishes Topper",
//         price: 99,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//       {
//         id: "ADDON33",
//         name: "Fathers Day Greeting Card",
//         price: 99,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//     ],
//     deliveryDetails: {
//       date: "10 Oct",
//       timeSlot: "1:00 PM - 2:00 PM Hrs",
//       fee: 99,
//     },
//     occasion: null,
//     messageCard: "",
//     messageOnCake: "",
//   },
//   {
//     mainItem: {
//       id: "GIFT4",
//       name: "Decorated Chocolate Truffle Cake Half Kg",
//       price: 575,
//       quantity: 1,
//       image:
//         "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
//     },
//     addons: [
//       {
//         id: "ADDON1",
//         name: "2 Pc Cadbury Fruit N Nut 36 Gm",
//         price: 239,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//       {
//         id: "ADDON2",
//         name: "Birthday Wishes Topper",
//         price: 99,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//       {
//         id: "ADDON3",
//         name: "Fathers Day Greeting Card",
//         price: 99,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//     ],
//     deliveryDetails: {
//       date: "10 Oct",
//       timeSlot: "1:00 PM - 2:00 PM Hrs",
//       fee: 99,
//     },
//     occasion: null,
//     messageCard: "",
//     messageOnCake: "",
//   },
//   {
//     mainItem: {
//       id: "GIFT5",
//       name: "Decorated Chocolate Truffle Cake Half Kg",
//       price: 575,
//       quantity: 1,
//       image:
//         "https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg",
//     },
//     addons: [
//       {
//         id: "ADDON1",
//         name: "2 Pc Cadbury Fruit N Nut 36 Gm",
//         price: 239,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//       {
//         id: "ADDON2",
//         name: "Birthday Wishes Topper",
//         price: 99,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//       {
//         id: "ADDON3",
//         name: "Fathers Day Greeting Card",
//         price: 99,
//         quantity: 1,
//         image:
//           "	https://www.fnp.com/images/pr/s/v20230802171003/2-pc-cadbury-fruit-n-nut-36g-in-gift-packing_1.jpg",
//       },
//     ],
//     deliveryDetails: {
//       date: "10 Oct",
//       timeSlot: "1:00 PM - 2:00 PM Hrs",
//       fee: 99,
//     },
//     occasion: null,
//     messageCard: "",
//     messageOnCake: "",
//   },
// ];
const initialState = {
  name: "prices",
  "lwrlmt": 0,
  "uprlmt": 1000
}
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {


    setFilter: (state, action) => {
      const { up, down } = action.payload
      const newState = {
        "lwrlmt": up,
        "uprlmt": down
      }
      return { ...state, ...newState }

    },
  },
});

export const {
  setFilter,

} = filterSlice.actions;

export default filterSlice.reducer;
