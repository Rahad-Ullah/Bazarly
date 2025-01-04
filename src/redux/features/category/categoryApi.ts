import { ICategoryQueryParams } from "@/interfaces/queryParams";
import { baseApi } from "../../api/baseApi";
import generateQueryString from "@/utils/generateQueryString";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (payload) => {
        return {
          url: `/categories/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/categories/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Categories"],
    }),
    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/ategories/${id}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    getAllCategories: builder.query({
      query: (query: ICategoryQueryParams) => ({
        url: `/categories?${generateQueryString(query)}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetSingleCategoryQuery,
  useGetAllCategoriesQuery,
} = categoryApi;
