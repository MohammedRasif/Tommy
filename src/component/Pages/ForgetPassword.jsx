
import { NavLink, useNavigate } from "react-router-dom"
import img from "../../image/Group 2147226152.png"
import { useState } from "react"
import { useForgetPasswordMutation } from "../../Redux/feature/authApi"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation()

  const handleInputChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    try {
      console.log("Sending password reset request for:", email)
      const response = await forgetPassword({ email }).unwrap()
      console.log("Forget password API response:", response)

      toast.success(response.message || "Password reset email sent successfully!")
      localStorage.setItem("resetEmail", email) // Store email for verification page

      // Navigate to verification page
      setTimeout(() => {
        navigate("/forgetPassword_verification")
      }, 2000)

    } catch (error) {
      console.error("Forget password error:", error)
      const errorMessage = error?.data?.message || error?.message || "Failed to send reset email. Please try again."
      toast.error(errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center roboto bg-[#F7F8F7]">
      <div className="flex w-full mx-auto">
        {/* Left side - Image */}
        <div className="hidden sm:block w-3/5 bg-gradient-to-br flex items-center justify-center p-8">
          <img
            src={img || "/placeholder.svg"}
            alt="Demo AI Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full sm:w-2/5 p-8 flex flex-col justify-center">
          <div className="max-w-full mx-auto w-full">
            <h1 className="text-3xl sm:text-5xl font-bold text-[#454D3C] text-center">
              Confirm Email
            </h1>
            <p className="mb-8 text-center text-[12px] sm:text-[14px] text-gray-700 leading-relaxed">
              Enter your email address which is <br /> used for the registration
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 px-4 sm:px-32">
              {/* Email Field */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-2 font-semibold">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="user@mail.com"
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-[10px] border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#4F46E5] text-white py-2 sm:py-3 px-3 sm:px-4 rounded-sm font-semibold text-xs sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Confirm"}
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-4 sm:mt-6">
              <NavLink
                to="/login"
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors"
              >
                Back to Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ForgetPassword
