import img from "../../image/Group 2147226152.png"
import { useState, useRef } from "react"

const RegisterVerification = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""])
  const inputRefs = useRef([])

  // Handle verification code input
  const handleCodeChange = (index, value) => {
    if (value.length > 1) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 4)
    const newCode = [...verificationCode]

    for (let i = 0; i < pastedData.length && i < 4; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i]
      }
    }

    setVerificationCode(newCode)

    const nextEmptyIndex = newCode.findIndex((code, idx) => !code && idx < 4)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[3]?.focus()
    }
  }

  // Handle verification submit
  const handleVerificationSubmit = (e) => {
    e.preventDefault()
    const code = verificationCode.join("")
    console.log("Verification code:", code)
  }

  // Placeholder for resend code
  const handleResendCode = () => {
    console.log("Resend code requested")
    // Add actual resend logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center roboto bg-[#F7F8F7]">
      <div className="flex w-full mx-auto">
        {/* Left side - Image */}
        <div className="hidden lg:block w-full lg:w-3/5 bg-gradient-to-br flex items-center justify-center p-4 lg:p-8">
          <img
            src={img || "/placeholder.svg"}
            alt="Demo AI Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-2/5 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          <div className="max-w-full sm:max-w-lg lg:max-w-md mx-auto w-full">
            {/* Verification Form */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 sm:mb-8">
                Verification
              </h1>

              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  We have sent you an activation code.
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  An email has been sent to your email address containing a code to reset your password.
                </p>
              </div>

              <form onSubmit={handleVerificationSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4">
                    Enter verification code
                  </label>

                  {/* Verification Code Inputs */}
                  <div className="flex justify-center space-x-2 sm:space-x-3 lg:space-x-4 mb-4 sm:mb-6">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-center text-lg sm:text-xl lg:text-2xl font-bold border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="*"
                      />
                    ))}
                  </div>
                </div>

                {/* Resend Code Link */}
                <div className="text-center mb-4 sm:mb-6">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    If you didn’t receive a code!{" "}
                  </span>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors"
                  >
                    Resend
                  </button>
                </div>

                {/* Confirm Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterVerification