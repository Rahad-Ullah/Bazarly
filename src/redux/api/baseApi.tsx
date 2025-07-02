import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL as string,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Products",
    "Categories",
    "Orders",
    "Users",
    "Admins",
    "Vendors",
    "Customers",
    "Payments",
    "Reviews",
    "Shops",
    "Followers",
    "Profile",
    "Coupons",
    "RecentProducts",
    "Newsletters",
  ],
  endpoints: () => ({}),
});
