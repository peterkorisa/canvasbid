import React from "react";
import Navbar from "../component/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />

      <section className="bg-gray-50 dark:bg-gray-900 py-20 w-full">
        <div className="w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div className="px-6 lg:px-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Let's Talk
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              Have a question, feedback, or need help with something?
              Send us a message and our team will get back to you as soon as possible.
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
              <form className="space-y-6">

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What can we help you with?"
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Write your message here..."
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition transform hover:scale-[1.02]"
                >
                  Send Message
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;