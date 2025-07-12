
import { NavLink, useNavigate } from "react-router-dom"
import img from "../../image/Group 2147226152.png"
import { useState, useEffect } from "react"
import { useConfrimPasswordMutation, useChangePasswordMutation } from "../../Redux/feature/authApi"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [confirmPassword, { isLoading: isResetting }] = useConfrimPasswordMutation()
  const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation()
  const navigate = useNavigate()

  // Check if user is logged in (has access token)
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsLoggedIn(!!token)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate required fields based on scenario
    if (isLoggedIn) {
      // For logged-in users changing password
      if (!formData.oldPassword || !formData.password || !formData.confirmPassword) {
        toast.error("Please fill in all fields")
        return
      }
    } else {
      // For password reset flow
      if (!formData.password || !formData.confirmPassword) {
        toast.error("Please fill in all fields")
        return
      }
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!")
      return
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    try {
      if (isLoggedIn) {
        // Handle password change for logged-in users
        console.log("🔄 Changing password for logged-in user")
        const response = await changePassword({
          old_password: formData.oldPassword,
          new_password: formData.password
        }).unwrap()

        console.log("✅ Password change API response:", response)
        toast.success(response.message || "Password changed successfully!")

        // Redirect to profile or dashboard
        setTimeout(() => {
          navigate("/dashboard/profile")
        }, 2000)

      } else {
        // Handle password reset flow
        const email = localStorage.getItem("resetEmail")
        const passwordResetToken = localStorage.getItem("passwordResetToken")

        if (!email) {
          toast.error("No email found! Please restart the password reset process.")
          return
        }

        if (!passwordResetToken) {
          toast.error("No reset token found! Please restart the password reset process.")
          return
        }

        console.log("🔄 Sending password reset request for:", email)
        const response = await confirmPassword({
          email: email,
          password_reset_token: passwordResetToken,
          new_password: formData.password
        }).unwrap()

        console.log("✅ Password reset API response:", response)
        toast.success(response.message || "Password reset successfully!")
        localStorage.removeItem("resetEmail")
        localStorage.removeItem("passwordResetToken")

        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }
    } catch (error) {
      console.error("❌ Password operation error:", error)
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update password. Please try again."
      toast.error(errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center roboto bg-[#F7F8F7]">
      <div className="flex w-full mx-auto">
        
        <div className="hidden sm:block w-3/5 bg-gradient-to-br flex items-center justify-center p-8">
          <img
            src={img || "/placeholder.svg"}
            alt="Demo AI Illustration"
            className="max-w-full h-auto"
          />
        </div>

        
        <div className="w-full sm:w-2/5 p-8 flex flex-col justify-center">
          <div className="max-w-full mx-auto w-full">
            <h1 className="text-3xl sm:text-5xl font-bold text-[#454D3C] mb-8 text-center">
              Change Password
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 px-4 sm:px-32">

              {/* Old Password field - only for logged-in users */}
              {isLoggedIn && (
                <div>
                  <label className="block text-xs sm:text-sm text-gray-700 mb-2 font-semibold">
                    Current Password
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      placeholder="Current Password"
                      className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-[10px] border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-xs sm:text-sm"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-2 font-semibold">
                  New Password
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="New Password"
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-[10px] border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-[10px] border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isResetting || isChanging}
                className="w-full bg-[#4F46E5] text-white py-2 sm:py-3 px-3 sm:px-4 rounded-sm font-semibold text-xs sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {(isResetting || isChanging) ? "Saving..." : "Save"}
              </button>
            </form>

            {/* Navigation Links */}
            <div className="text-center mt-4 sm:mt-6">
              {isLoggedIn ? (
                <NavLink
                  to="/dashboard/profile"
                  className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors"
                >
                  Back to Profile
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors"
                >
                  Back to Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default ChangePassword
