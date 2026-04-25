import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import { authService } from "../services/authService";
import { getUserRole } from "../services/api";
import { LoadingSpinner } from "../component/LoadingSpinner";

const LoginForm = ({ toggleTheme, theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authService.login(email, password);
      
      // Redirect based on user role
      const role = getUserRole();
      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Artist") {
        navigate("/artists/artworks");
      } else {
        navigate("/artworks");
      }
    } catch (err) {
      const errorMsg = err.message || "Login failed. Please check your credentials.";
      console.error("Login error details:", {
        message: errorMsg,
        error: err,
        baseUrl: "https://app-260421214011.azurewebsites.net/api",
        endpoint: "/Auth/login",
      });
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <LoadingSpinner text="Logging in..." />
      </>
    );
  }

  return (
    <>
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <section className="bg-gray-50 dark:bg-gray-900 py-20 w-full">
        <div className="w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div className="px-6 lg:px-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Welcome Back
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              Log in to access your account and continue where you left off.
            </p>

            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>📧 support@example.com</p>
              <p>🌍 Available worldwide</p>
              <p>⚡ Usually replies within 24 hours</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="px-6 lg:px-20">
            <div className="w-full bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-xl">
              {error && (
                <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg !bg-[#FF9E0C] hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold transition transform hover:scale-[1.02]"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* Extra info */}
              <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                New here?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default LoginForm;