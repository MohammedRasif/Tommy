
import { NavLink } from "react-router-dom"
import img from "../../image/Group 2147226152.png"

const SuccessfullyMessage = () => {
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

        {/* Right side - Success Message */}
        <div className="w-full sm:w-2/5 p-4 sm:p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full text-center">
            {/* Success Icon */}
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <svg 
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-lg sm:text-xl font-medium text-gray-800 mb-6 sm:mb-8">
              Password changed successfully
            </h1>

            {/* Back to Login Button */}
            <NavLink 
              to="/login"
              className="inline-flex items-center justify-center w-full bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-xs sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
              Back to Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessfullyMessage
