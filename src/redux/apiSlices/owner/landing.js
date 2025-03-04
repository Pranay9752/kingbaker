import { apiSlice } from "../apiSlice";

const LandingAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    updateCarosol: builder.mutation({
      query: ({ key, value }) => ({
        url: '/component/updateCarosol',
        method: 'PATCH',
        body: { key, value },
      }),
    }),
    getCarosol: builder.query({
      query: (key) => ({
        url: `/component/getCarosol?key=${key}`,
        method: 'GET',
      }),
    }),
   
  }),
  overrideExisting: false,
});

export const { useUpdateCarosolMutation, useGetCarosolQuery, useLazyGetCarosolQuery  } = LandingAPI;
