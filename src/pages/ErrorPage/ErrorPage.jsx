import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link, useRouteError } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
        {/* Icon */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-[#16a34a]/10 p-6 rounded-full">
            <FaExclamationTriangle className="text-[#16a34a] text-5xl animate-bounce" />
          </div>
          <h1 className="text-6xl font-bold text-[#16a34a]">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md">
            The page you're looking for doesn’t exist or may have been moved.
          </p>
        </div>

        {/* Error details (optional for dev) */}
        {error && (
          <p className="text-sm text-gray-400 mt-3 italic">
            {error.statusText || error.message}
          </p>
        )}

        {/* Back Button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
        >
          ⬅ Back to Home
        </Link>

        {/* Footer Text */}
        <p className="mt-10 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} PlateShare. All rights reserved.
        </p>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default ErrorPage;
