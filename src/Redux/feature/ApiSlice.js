import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "https://multiply-mint-ghost.ngrok-free.app/";
export const baseApiUrl = `${baseUrl}`;

const baseQuery = fetchBaseQuery({
    baseUrl: baseApiUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
        const accessToken = localStorage.getItem("accessToken");
        const token = getState().auth.token || accessToken;



        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }





        if (
            endpoint !== "submitDetails" &&
            endpoint !== "createCustomApp" &&
            endpoint !== "createCustomProduct" &&
            endpoint !== "createPosterData" &&
            endpoint !== "updatePosterData" &&
            endpoint !== "createBrandData" &&
            endpoint !== "updateBrandData" &&
            endpoint !== "updateProfile" // Don't set Content-Type for updateProfile (FormData)
        ) {
            headers.set("Content-Type", "application/json");
        }

        // Add ngrok header to skip browser warning
        headers.set("ngrok-skip-browser-warning", "true");
        return headers;
    },
});

export const ApiSlice = createApi({
    reducerPath: "ApiSlice",
    baseQuery,
    tagTypes: ["question", "addQuestion", "Admin", "Coupon", "subscription", "contract", "proposal", "details", "Profile", "SavedCompany", "SavedCompanies"],
    endpoints: (builder) => ({
        createCustomApp: builder.mutation({
            query: (data) => ({
                url: "/app/template/app-templates/",
                method: "POST",
                body: data,
            }),
        }),
        showCreateCustomAppData: builder.query({
            query: () => "/app/template/app-templates/latest/",
        }),
        createCustomProduct: builder.mutation({
            query: (data) => ({
                url: "/app/template/products/",
                method: "POST",
                body: data,
            }),
        }),
        showCreateCustomProduct: builder.query({
            query: () => "/app/template/products/"
        }),
        // show poster

        showMarketingData: builder.query({
            query: () => "/app/poster/registers/"
        }),

        //  delete marketing data 
        deleteMarketingData: builder.mutation({
            query: (id) => ({
                url: `/app/poster/registers/${id}/`,
                method: "DELETE"
            })
        }),
        createPosterData: builder.mutation({
            query: (data) => ({
                url: "/app/poster/registers/",
                method: "POST",
                body: data
            })
        }),
        updatePosterData: builder.mutation({
            query: ({ id, data }) => ({
                url: `/app/poster/registers/${id}/`,
                method: "PATCH",
                body: data
            })
        }),
        
        //brand setup
        createBrandData: builder.mutation({
            query: (data) => ({
                url: "/app/poster/brands/",
                method: "POST",
                body: data
            })
        }),

        // bran data show 
        showBrandData: builder.query({
            query: () => "/app/poster/brands/"
        }),
        updateBrandData: builder.mutation({
            query: ({ id, data }) => ({
                url: `/app/poster/brands/${id}/`,
                method: "PATCH",
                body: data
            })
        }),

        showposterdata: builder.query({
            query: () => "/app/template/app-templates/auth/only/",
        }),
        showAllAppData: builder.query({
            query: (dataId) => `/app/template/app-templates/${dataId}/detailed/view/`,

        }),

        visitapp: builder.mutation({
            query: (data) => ({
                url: "/app/template/app/visits/",
                method: "POST",
                body: data
            })
        }),
        showDashboardnumber: builder.query({
            query: () => "/app/template/dashboard/stats/"
        }),

        getProfile: builder.query({
            query: () => "/accounts/profile/",
            providesTags: ['Profile']
        }),
        

        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/accounts/profile/",
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['Profile']
        }),
        businessSearch: builder.mutation({
            query: (data) => ({
                url: "/search/search-company",
                method: "POST",
                body: data
            })
        }),

        saveCompany: builder.mutation({
            query: (companyId) => ({
                url: `/search/company/${companyId}/save/`,
                method: "POST",
                body: {}
            }),
            invalidatesTags: ['SavedCompanies', 'SavedCompany']
        }),

        getSavedCompaniesAll: builder.query({
            query: () => ({
                url: "/search/company/saved_all/",
                method: "GET"
            }),
            providesTags: ['SavedCompanies']
        }),

        getSavedCompany: builder.query({
            query: (companyId) => `/search/company/${companyId}/saved/`,
            providesTags: ['SavedCompany']
        }),

        googleConnect: builder.mutation({
            query: (data) => ({
                url: "/oauth2_connects/google_connect/",
                method: "POST",
                body: data,
            }),
        }),

        getSubscriptionPlans: builder.query({
            query: () => "/subscriptions/plans/",
            providesTags: ['subscription']
        }),

        subscribeToplan: builder.mutation({
            query: (data) => ({
                url: "/subscriptions/subscribe/",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['subscription']
        }),

        searchcompany: builder.mutation({
            query: (data) => ({
                url: "/search/search-company",
                method: "POST",
                body: data
            })
        }),

        getCountryOptions: builder.mutation({
            query: () => ({
                url: "/search/get_country_options/",
                method: "POST",
                body: {
                    location_path: []
                }
            }),
        }),
        searchDecisionMakers: builder.mutation({
            query: ({ companyId, designation }) => ({
                url: `/search/search-company-decision-makers/${companyId}/${designation}/`,
                method: "POST"
            }),
        }),
        saveDecisionMaker: builder.mutation({
            query: (decisionMakerId) => ({
                url: `/search/save_decision_maker/${decisionMakerId}`,
                method: "POST"
            }),
        }),

        getSavedDecisionMakers: builder.query({
            query: () => ({
                url: "/search/saved_decision_makers/",
                method: "GET"
            }),
            providesTags: ['SavedDecisionMakers']
        }),

        generateEmailTemplate: builder.mutation({
            query: (templateData) => ({
                url: "/mailbox/template/",
                method: "POST",
                body: templateData
            }),
        }),




    }),
});

export const {
    useCreateCustomAppMutation,
    useShowCreateCustomAppDataQuery,
    useCreateCustomProductMutation,
    useShowCreateCustomProductQuery,
    useShowMarketingDataQuery,
    useDeleteMarketingDataMutation,
    useCreatePosterDataMutation,
    useUpdatePosterDataMutation,
    useCreateBrandDataMutation,
    useShowBrandDataQuery,
    useUpdateBrandDataMutation,
    useShowposterdataQuery,
    useShowAllAppDataQuery,
    useVisitappMutation,
    useShowDashboardnumberQuery,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useBusinessSearchMutation,
    useSaveCompanyMutation,
    useGetSavedCompanyQuery,
    useGoogleConnectMutation,
    useGetSubscriptionPlansQuery,
    useSubscribeToplanMutation,
    useSearchcompanyMutation,
    useGetCountryOptionsMutation,
    useSearchDecisionMakersMutation,
    useSaveDecisionMakerMutation,
    useGetSavedDecisionMakersQuery,
    useGenerateEmailTemplateMutation,
    useGetSavedCompaniesAllQuery,

} = ApiSlice;
