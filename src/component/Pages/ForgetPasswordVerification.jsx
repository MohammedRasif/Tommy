import { NavLink } from "react-router-dom"
import img from "../../image/Group 2147226152.png"

import { useState, useRef, useEffect } from "react"

const ForgetPasswordVerification = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [isLogin, setIsLogin] = useState(false)
    const [verificationCode, setVerificationCode] = useState(["", "", "", ""])
    const inputRefs = useRef([])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLogin) {
            console.log("Login:", { email: formData.email, password: formData.password })
        } else {
            console.log("Register:", formData)
        }
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setFormData({ email: "", password: "", confirmPassword: "" })
    }

    // Handle verification code input
    const handleCodeChange = (index, value) => {
        // Only allow single digit
        if (value.length > 1) return

        const newCode = [...verificationCode]
        newCode[index] = value

        setVerificationCode(newCode)

        // Auto focus next input
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

        // Focus the next empty input or last input
        const nextEmptyIndex = newCode.findIndex((code, index) => !code && index < 4)
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

    return (
        <div className="min-h-screen flex items-center justify-center roboto bg-[#F7F8F7]">
            <div className="flex w-full mx-auto">
                {/* Left side - Image */}
                <div className="w-3/5 bg-gradient-to-br flex items-center justify-center p-8">
                    <img
                        src={img || "/placeholder.svg"}
                        alt="Demo AI Illustration"
                        className=""
                    />
                </div>

                {/* Right side - Form */}
                <div className="w-2/5 p-8 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        {/* Verification Form */}
                        <div className="text-center">
                            <h1 className="text-5xl font-bold text-gray-800 mb-8">Verification</h1>
                            
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    We have sent you an activation code.
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    An email has been sent to you email address containing a code to reset your password.
                                </p>
                            </div>

                            <form onSubmit={handleVerificationSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Enter verification code
                                    </label>
                                    
                                    {/* Verification Code Inputs */}
                                    <div className="flex justify-center space-x-4 mb-6">
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
                                                className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                placeholder="*"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Resend Code Link */}
                                <div className="text-center mb-6">
                                    <span className="text-gray-600 text-sm">
                                        If you didn't receive a code!{" "}
                                    </span>
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                    >
                                        click here..
                                    </button>
                                </div>

                                {/* Confirm Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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

export default ForgetPasswordVerification