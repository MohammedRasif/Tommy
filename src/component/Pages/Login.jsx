import { NavLink } from "react-router-dom"
import img from "../../image/Group 2147226152.png"


import { useState } from "react"

const Login = () => {
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
                        <h1 className="text-5xl font-bold text-[#454D3C] mb-8 text-center">Welcome to Demo. Ai</h1>

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

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                        placeholder="Password"
                                        className="w-full pl-10 pr-4 py-[10px] border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                        required
                                    />
                                </div>
                            </div>


                            <NavLink>
                                <p className="text-[12px] text-blue-500 underline text-end -mt-4 mb-5 cursor-pointer">Forget Password?</p>

                            </NavLink>



                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#4F46E5] text-white py-3 px-4 rounded-sm  font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
                            >
                                {isLogin ? "Login" : "Register"}
                            </button>

                            {/* Toggle between Login/Register */}
                            <div className="text-center space-x-2">
                                <span className="text-gray-600">
                                    {isLogin ? "Don't have an account? " : "Don't have an account?"}
                                </span>
                                <NavLink to="/register">
                                    <button
                                        type="button"
                                        onClick={toggleMode}
                                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors border rounded-sm px-2 cursor-pointer"
                                    >
                                        {isLogin ? "login....." : "Login"}
                                    </button>
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
