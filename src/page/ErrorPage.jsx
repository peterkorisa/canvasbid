import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../component/Navbar';

const ErrorPage = () => {
  const location = useLocation();
  const errorMessage = location.state?.message || "Oops! The page you're looking for doesn't exist or has been moved.";

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <div className="min-h-screen bg-base-200 w-full flex flex-col justify-center items-center px-4 pt-[5rem]">
        <div className="w-full flex flex-col justify-center items-center text-center space-y-8 animate-fade-in pb-20">
          <div className="text-error mb-4 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 mx-auto text-[#ff1313]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-8xl md:text-9xl font-extrabold text-[#5937E0] tracking-tighter drop-shadow-lg">Oops!</h1>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
            {location.state?.message ? "Access Denied" : "404 - Page Not Found"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl md:text-3xl leading-relaxed max-w-4xl mx-auto font-medium">
            {errorMessage}
          </p>
          <div className="pt-10">
            <Link to="/" className="btn btn-primary text-white !bg-[#FF9E0C] !border-[#FF9E0C] hover:!bg-[#e68f0b] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-xl px-12 py-4 h-auto rounded-full uppercase tracking-widest font-bold">
              Take Me Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
