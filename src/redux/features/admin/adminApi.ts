import generateQueryString from "@/utils/generateQueryString";
import { baseApi } from "../../api/baseApi";
import { IAdminQueryParams } from "@/interfaces/queryParams";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: ({ payload }) => ({
        url: `/users/create-admin`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Admins"],
    }),
    updateAdmin: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/admins/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Admins"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/admins/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Admins"],
    }),
    getAllAdmins: builder.query({
      query: (query: IAdminQueryParams) => ({
        url: `/admins/?${generateQueryString(query)}`,
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
