import { IProductQueryParams } from "@/interfaces/queryParams";
import { baseApi } from "../../api/baseApi";
import generateQueryString from "@/utils/generateQueryString";
import { IProduct } from "@/types/TProduct";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: ({payload}) => {
        return {
          url: `/products/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Products"],
    }),
    duplicateProduct: builder.mutation({
      query: (payload: Partial<IProduct>) => {
        return {
          url: `/products/duplicate`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/products/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Products"],
    }),
    getSingleProduct: builder.query({
      query: ({ id, userEmail }) => ({
        url: `/products/${id}?userEmail=${userEmail}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getAllProducts: builder.query({
      query: (query: IProductQueryParams) => ({
        url: `/products?${generateQueryString(query)}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDuplicateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useGetAllProductsQuery,
} = productApi;
