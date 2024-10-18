import { apiSlice } from "../apiSlice";

const DeliveryBoyAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesman: builder.query({
      query: () => ({
        url: `salesman/getSalesmanBYVenId?id=${getCookie('_id')}`,
        method: "GET",
      }),
    }),
    updateSalesman: builder.mutation({
      query: ({ id, data }) => ({
        url: `salesman/updateSalesman?id=${id}`, // Remove id from here
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    createSalesman: builder.mutation({
      query: ({ data }) => ({
        url: `salesman/createSalesman`, // Remove id from here
        method: "POST",
        body: data,
      }),
    }),
    sendDeliveryOtp: builder.mutation({
      query: ({ phoneNo }) => ({
        url: `salesman/sendOtp`, // Remove id from here
        method: "POST",
        body: {
          phoneNo,
        },
      }),
    }),
    deliveryOtpVerify: builder.mutation({
      query: ({ phoneNo }) => ({
        url: `salesman/otpVerify`, // Remove id from here
        method: "POST",
        body: {
          phoneNo: phoneNo,
          otp: otp,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSalesmanQuery,
  useUpdateSalesmanMutation,
  useCreateSalesmanMutation,
  useSendDeliveryOtpMutation,
  useDeliveryOtpVerifyMutation,
} = DeliveryBoyAPI;
