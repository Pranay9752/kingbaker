import { apiSlice } from "../apiSlice";

const VendorAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getalloatedAndAcceptedOrder: builder.query({
      query: ({ vendor_id }) => ({
        url: `vendor/getalloatedAndAcceptedOrder?vendor_id=${vendor_id}`,
        method: "GET",
      }),
    }),
    getOrders: builder.mutation({
      query: ({ data = [] }) => ({
        url: `vendor/getOrders`, // Remove id from here
        method: "POST",

        body: {
          order_id: data,
        },
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ order_id, user_id, vendor_id }) => ({
        url: `vendor/updateOrderStatus`, // Remove id from here
        method: "PATCH",

        body: {
          order_id,
          user_id,
          vendor_id,
        },
      }),
    }),
    assignDeliveryBoys: builder.mutation({
      query: ({ order_id, salesman_id }) => ({
        url: `vendor/assignDeliveryBoys`, // Remove id from here
        method: "PATCH",

        body: {
          order_id,
          salesman_id,
        },
      }),
    }),
    updatePrintStatus: builder.mutation({
      query: ({ order_ids, user_id, vendor_id }) => ({
        url: `vendor/print`, // Remove id from here
        method: "POST",

        body: {
          isPrinted: order_ids,
          date: new Date(),
          user_id: user_id,
          vendor_id: vendor_id,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetalloatedAndAcceptedOrderQuery,
  useGetOrdersMutation,
  useUpdateOrderStatusMutation,
  useAssignDeliveryBoysMutation,
  useUpdatePrintStatusMutation,
} = VendorAPI;
