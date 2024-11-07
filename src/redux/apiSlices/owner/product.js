import { apiSlice } from "../apiSlice";

const ProductOrderAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createProduct: builder.mutation({
      query: ({ data }) => ({
        url: `product/createProduct`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateProductMutation } = ProductOrderAPI;
