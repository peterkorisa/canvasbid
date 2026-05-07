import React from "react";

export const LoadingSpinner = ({ size = "lg", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full border-4 border-[#5937E0] border-t-[#FF9E0C] rounded-full"></div>
      </div>
      {text && <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
