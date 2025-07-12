import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApiUrl } from "./ApiSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers, { getState, endpoint }) => {
            // Get token from localStorage or Redux state
            const accessToken = localStorage.getItem("accessToken");
            const token = getState().auth.token || accessToken;

            // Add auth token for endpoints that require it
            if (token && (endpoint === "changePassword")) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            // Add ngrok header to skip browser warning
            headers.set("ngrok-skip-browser-warning", "true");
            headers.set("Content-Type", "application/json");

            return headers;
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/accounts/register/",
                method: "POST",
                body: data, // Expects email & pa
            }),
        }),

        registerVerification: builder.mutation({
            query: (data) => ({
                url: "/accounts/verify_otp/",
                method: "POST",
                body: data,
            }),
        }),

        resendOtp: builder.mutation({
            query: (data) => ({
                url: "/accounts/resend_otp/",
                method: "POST",
                body: data,
            }),
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/accounts/login/",

            
                method: "POST",
                body: data,
            }),
        }),

        forgetPassword: builder.mutation({
            query: (data) => ({
                url: "/accounts/request_password_reset/",
                method: "POST",
                body: data,
            }),
        }),

        forgetpasswordVerification: builder.mutation({
            query: (data) => ({
                url: "/auth/reset-request-activate/",
                method: "POST",
                body: data,
            }), 
        }),

        forgetRecentVerification: builder.mutation({
            query: (data) => ({
                url: "/user/resend-otp/",
                method: "POST",
                body: data,
            }),
        }),

        confrimPassword: builder.mutation({
            query: (data) => ({
                url: "/accounts/reset_password/",
                method: "POST",
                body: data,
            }),
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/accounts/change_password/",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

// Destructure the auto-generated hooks
export const {
    useRegisterMutation,
    useRegisterVerificationMutation,
    useResendOtpMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useForgetpasswordVerificationMutation,
    useForgetRecentVerificationMutation,
    useConfrimPasswordMutation,
    useChangePasswordMutation,
} = authApi;

export default authApi;