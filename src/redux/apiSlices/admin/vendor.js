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
  }),
  overrideExisting: false,
});

export const { useGetalloatedAndAcceptedOrderQuery, useGetOrdersMutation } = VendorAPI;
