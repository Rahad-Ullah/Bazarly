import generateQueryString from "@/utils/generateQueryString";
import { baseApi } from "../../api/baseApi";
import { ICustomerQueryParams } from "@/interfaces/queryParams";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCustomer: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/customers/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Customers"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => {
        return {
          url: `/customers/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Customers"],
    }),
    getAllCustomers: builder.query({
      query: (query: ICustomerQueryParams) => ({
        url: `/customers/?${generateQueryString(query)}`,
        method: "GET",
      }),
      providesTags: ["Customers"],
    }),
  }),
});

export const {
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetAllCustomersQuery,
} = customerApi;
