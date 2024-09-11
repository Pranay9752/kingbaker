import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kingsbakerbackend-production.up.railway.app/api' }),
  endpoints: (builder) => ({}),  // No initial endpoints
});

export const { useGetBaseQuery } = apiSlice;