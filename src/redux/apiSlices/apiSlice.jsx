import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.137:3000/' }),
  endpoints: (builder) => ({}),  // No initial endpoints
});

export const { useGetBaseQuery } = apiSlice;