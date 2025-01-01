import { baseApi } from "../../api/baseApi";

const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewsletter: builder.mutation({
      query: (payload) => {
        return {
          url: `/newsletters/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Newsletters"],
    }),
    getAllNewsletters: builder.query({
      query: () => ({
        url: `/newsletters`,
        method: "GET",
      }),
      providesTags: ["Newsletters"],
    }),
  }),
});

export const { useCreateNewsletterMutation, useGetAllNewslettersQuery } =
  newsletterApi;
