import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterMutation } from "../../Redux/feature/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../image/Group 2147226152.png";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      console.log("Login attempt:", { email: formData.email, password: formData.password });
      toast.info("Login functionality not implemented yet.");
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        toast.error("Passwords do not match!");
        return;
      }

      try {
        console.log("Sending registration request:", {
          email: formData.email,
          password: formData.password,
        });
        const response = await register({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        console.log("Registration API response:", response);

        toast.success(response.message || "Registration successful!");
        localStorage.setItem("email", formData.email);
        navigate("/register_verification");
      } catch (err) {
        console.error("Registration error:", err);
        const errorMessage =
          err?.data?.message?.toLowerCase().includes("email already exists")
            ? "Email already exists!"
            : err?.data?.message || err?.data?.error || "Registration failed. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: isLogin ? "" : formData.confirmPassword,
    });
    setError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center roboto bg-[#F7F8F7]">
      <div className="flex w-full mx-auto">
        <div className="hidden lg:block w-full lg:w-3/5 bg-gradient-to-br flex items-center justify-center p-4 lg:p-8">
          <img src={img} alt="Demo AI Illustration" className="max-w-full h-auto" />
        </div>

        <div className="w-full lg:w-2/5 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          <div className="max-w-full mx-auto w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#454D3C] mb-6 sm:mb-8 text-center">
              Welcome to OpenSeason.ai
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 px-4 sm:px-16 lg:px-32">
              {error && (
                <div className="text-red-500 text-xs sm:text-sm text-center mb-4">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2 font-semibold">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="user@mail.com"
                    className="w-full pl-2 sm:pl-2 pr-3 sm:pr-4 py-2 sm:py-[10px] border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full pl-2 sm:pl-2 pr-10 sm:pr-12 py-2 sm:py-[10px] border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-xs sm:text-sm"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.79m0 0L21 21"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-12.542 0c1.274-4.057 5.064-7 9.542-7 4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      )}
                    </svg>
                  </div>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      className="w-full pl-3 sm:pl-3 pr-10 sm:pr-12 py-2 sm:py-[10px] border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-xs sm:text-sm"
                      required
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {showConfirmPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.79m0 0L21 21"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-12.542 0c1.274-4.057 5.064-7 9.542-7 4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {isLogin && (
                <NavLink
                  to="/forgot-password"
                  className="block text-[10px] sm:text-[12px] text-blue-500 underline text-end -mt-3 sm:-mt-4 mb-4 sm:mb-5 cursor-pointer"
                >
                  Forgot Password?
                </NavLink>
              )}

              <button
                type="submit"
                className="w-full bg-[#4F46E5] text-white py-2 sm:py-3 px-3 sm:px-4 rounded-sm font-semibold text-sm sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : isLogin ? "Login" : "Register"}
              </button>

              <div className="text-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <span className="text-gray-600">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors border rounded-sm px-1.5 sm:px-2 py-0.5 cursor-pointer"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;