
import { NavLink } from "react-router-dom"
import img from "../../image/Group 2147226152.png"
import { useState } from "react"

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Change Password:", formData)
    // Add logic to update password and redirect to /login
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
            <h1 className="text-3xl sm:text-5xl font-bold text-[#454D3C] mb-8 text-center">
              Change Password
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 px-4 sm:px-32">
              {/* New Password Field */}
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

              {/* Confirm Password Field */}
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
                className="w-full bg-[#4F46E5] text-white py-2 sm:py-3 px-3 sm:px-4 rounded-sm font-semibold text-xs sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
              >
                Save
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
    </div>
  )
}

export default ChangePassword
