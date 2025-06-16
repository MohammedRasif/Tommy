import { NavLink } from "react-router-dom"
import img from "../../image/Group 2147226152.png"


import { useState } from "react"

const ForgetPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [isLogin, setIsLogin] = useState(false)

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

    return (
        <div className="min-h-screen  flex items-center justify-center roboto bg-[#F7F8F7]">
            <div className="flex w-full  mx-auto ">
                {/* Left side - Image */}
                <div className="w-3/5 bg-gradient-to-br flex items-center justify-center p-8">
                    <img
                        src={img}
                        alt="Demo AI Illustration"
                        className=" "
                    />
                </div>

                {/* Right side - Form */}
                <div className="w-2/5 p-8 flex flex-col justify-center">
                    <div className="max-w-full mx-auto w-full">
                        <h1 className="text-5xl font-bold text-[#454D3C]  text-center">Confirm Email</h1>
                        <p className="mb-8 text-center text-[14px] text-gray-700">Enter your email address which is <br /> used for the registration</p>

                        <form onSubmit={handleSubmit} className="space-y-6 px-32">
                            {/* Email Field */}
                            <div >
                                <label className="block text-sm  text-gray-700 mb-2 font-semibold">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="user@mail.com"
                                        className="w-full pl-10 pr-4 py-[10px] border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#4F46E5] text-white py-3 px-4 rounded-sm  font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
                            >
                                {isLogin ? "Confirm...." : "Confirm"}
                            </button>

                            {/* Toggle between Login/Register */}
                            {/* <div className="text-center space-x-2">
                                <span className="text-gray-600">
                                    {isLogin ? "Don't have an account? " : "Don't have an account?"}
                                </span>
                                <NavLink to="/register">
                                    <button
                                        type="button"
                                        onClick={toggleMode}
                                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors border rounded-sm px-2 cursor-pointer"
                                    >
                                        {isLogin ? "Register" : "Register"}
                                    </button>
                                </NavLink>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
