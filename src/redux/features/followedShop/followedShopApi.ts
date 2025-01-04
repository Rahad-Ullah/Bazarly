import { baseApi } from "../../api/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followShop: builder.mutation({
      query: (payload) => {
        return {
          url: `/followed-shops/follow`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Followers"],
    }),
    unFollow: builder.mutation({
      query: (payload) => {
        return {
          url: `/followed-shops/unfollow`,
          method: "DELETE",
          body: payload,
        };
      },
      invalidatesTags: ["Followers"],
    }),
    getFollowedShops: builder.query({
      query: () => ({
        url: `/followed-shops`,
        method: "GET",
      }),
      providesTags: ["Followers"],
    }),
    getShopFollowers: builder.query({
      query: (vendorEmail) => ({
        url: `/followed-shops/followers/${vendorEmail}`,
        method: "GET",
      }),
      providesTags: ["Followers"],
    }),
  }),
});

export const {
  useFollowShopMutation,
  useUnFollowMutation,
  useGetFollowedShopsQuery,
  useGetShopFollowersQuery,
} = followApi;
