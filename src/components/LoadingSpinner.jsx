import React from "react";
import { FaUtensils } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
      <div className="relative">
        <div className="w-14 h-14 border-4 border-[#16a34a]/30 border-t-[#16a34a] rounded-full animate-spin"></div>
        <FaUtensils className="absolute inset-0 m-auto text-[#16a34a] text-xl animate-pulse" />
      </div>
      <p className="mt-3 text-gray-700 font-medium">
        Loading <span className="text-[#16a34a]">foods</span>...
      </p>
    </div>
  );
};

export default LoadingSpinner;
