import generateQueryString from "@/utils/generateQueryString";
import { baseApi } from "../../api/baseApi";
import { IVendorQueryParams } from "@/interfaces/queryParams";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateVendor: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/vendors/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Vendors"],
    }),
    deleteVendor: builder.mutation({
      query: (id) => {
        return {
          url: `/vendors/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Vendors"],
    }),
    getAllVendors: builder.query({
      query: (query: IVendorQueryParams) => ({
        url: `/vendors/?${generateQueryString(query)}`,
        method: "GET",
      }),
      providesTags: ["Vendors"],
    }),
  }),
});

export const {
  useGetAllVendorsQuery,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
} = vendorApi;
