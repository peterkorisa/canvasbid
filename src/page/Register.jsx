import React from "react";
import Navbar from "../component/Navbar";

const RegisterForm = () => {
  return (
    <>
      <Navbar />

      <section className="bg-gray-50 dark:bg-gray-900 py-20 w-full">
        <div className="w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div className="px-6 lg:px-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Create Account
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              Sign up to start your journey with us. Join our community and enjoy exclusive features.
            </p>

            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>📧 support@example.com</p>
              <p>🌍 Available worldwide</p>
              <p>⚡ Quick support response</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="px-6 lg:px-20">
            <div className="w-full bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-xl">
              <form className="space-y-6">

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
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
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition transform hover:scale-[1.02]"
                >
                  Register
                </button>
              </form>

              {/* Fixed Bottom Info */}
              <div className="mt-8 flex justify-center text-red-600 dark:text-red-400 text-sm">
                <span>Already have an account?</span>
                <a
                  href="#"
                  className="ml-1 text-red-600 dark:text-red-400 hover:underline"
                >
                  Login here
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default RegisterForm;