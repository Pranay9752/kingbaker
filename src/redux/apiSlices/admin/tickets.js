import { apiSlice } from "../apiSlice";

const TicketAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getalloatedAndAcceptedOrder: builder.query({
    //   query: ({ vendor_id }) => ({
    //     url: `vendor/getalloatedAndAcceptedOrder?vendor_id=${vendor_id}`,
    //     method: "GET",
    //   }),
    // }),
    createTicket: builder.mutation({
      query: ({ body }) => ({
        url: `/user/createTicket`, // Remove id from here
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateTicketMutation } = TicketAPI;
