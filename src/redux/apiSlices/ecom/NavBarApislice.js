import { apiSlice } from "../apiSlice";

const NavbarApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNavbar: builder.query({
      query: () => ({
        url: "/navbar/getnavbar",
        method: "GET",
        params: {},
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useGetNavbarQuery } = NavbarApi;
