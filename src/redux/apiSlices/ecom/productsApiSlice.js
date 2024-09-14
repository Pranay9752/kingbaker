import { apiSlice } from "../apiSlice";

const ProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ productId }) => ({
        url: "product/getProduct",
        method: "GET",
        params: {
          productId: productId,
        },
      }),
    }),
    getAddOn: builder.query({
      query: () => ({
        url: "/addOn/getAddOn",
        method: "GET",
        // params: {
        //   productId: productId,
        // },
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useGetProductQuery, useGetAddOnQuery } = ProductApi;
