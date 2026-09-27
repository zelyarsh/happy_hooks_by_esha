import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing again
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await login(
      formData.email,
      formData.password
    );

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Redirect according to user role
    if (result.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {/* Title & Branding Header */}
      <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        Welcome Back 👋
      </h2>

      <p className="text-gray-500 mt-3 mb-8 text-sm sm:text-base leading-relaxed">
        Login to continue shopping handmade crochet gifts.
      </p>

      {/* Error Message */}
      {error && (
        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div className="flex flex-col">

          <label className="font-semibold text-gray-700 text-sm tracking-wide">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full mt-2 border border-gray-200 bg-gray-50/50 rounded-xl px-5 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100/50 transition-all duration-300"
          />

        </div>

        {/* Password */}
        <div className="flex flex-col">

          <label className="font-semibold text-gray-700 text-sm tracking-wide">
            Password
          </label>

          <div className="relative mt-2">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-5 py-3.5 pr-14 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100/50 transition-all duration-300"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors duration-200 focus:outline-none p-1"
            >
              {showPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* Remember Me */}
        <div className="flex justify-between items-center text-sm pt-1">

          <label className="flex items-center gap-2.5 text-gray-600 font-medium cursor-pointer select-none group">

            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="w-4.5 h-4.5 text-pink-500 border-gray-300 rounded focus:ring-pink-400 accent-pink-500 transform transition duration-200 group-hover:scale-105"
            />

            <span className="group-hover:text-gray-900 transition-colors duration-200">
              Remember Me
            </span>

          </label>

          <Link
            to="/forgot-password"
            className="text-pink-500 font-semibold hover:text-pink-600 transition-colors duration-200"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-full font-bold shadow-[0_4px_15px_rgba(244,63,94,0.2)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.3)] hover:opacity-95 transform active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      {/* Divider */}
      <div className="my-7 flex items-center">

        <div className="flex-1 border-t border-gray-100"></div>

        <span className="px-4 text-xs font-bold tracking-widest text-gray-400">
          OR
        </span>

        <div className="flex-1 border-t border-gray-100"></div>

      </div>

      {/* Google */}
      <div className="transform transition duration-300 active:scale-[0.99]">
        <SocialLogin text="Google" />
      </div>

      {/* Register */}
      <p className="text-center mt-8 text-sm text-gray-500 font-medium">

        Don't have an account?{" "}

        <Link
          to="/register"
          className="text-pink-500 font-bold ml-1 hover:text-pink-600 hover:underline transition-all duration-200"
        >
          Register
        </Link>

      </p>
    </>
  );
}

export default LoginForm;