import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router"; 
import { FaUtensils, FaBars } from "react-icons/fa";
import { FiLogOut, FiUser, FiGrid, FiPlusCircle, FiList } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  // Scroll Effect for Glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logOutUser()
      .then(() => console.log("Logged out"))
      .catch((error) => console.log(error.message));
  };

  // Reusable NavLink Styles with Animation
  const getNavLinkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors duration-300 
    ${isActive ? "text-[#16a34a]" : "text-gray-600 hover:text-[#16a34a]"}
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#16a34a] after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  const navLinks = (
    <>
      <li><NavLink to="/" className={getNavLinkClass}>Home</NavLink></li>
      <li><NavLink to="/available-foods" className={getNavLinkClass}>Available Foods</NavLink></li>
      {/* Added as per Requirement #8 */}
      <li><NavLink to="/about" className={getNavLinkClass}>About</NavLink></li>
      <li><NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink></li>
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md border-gray-200 py-2"
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#16a34a] p-2 rounded-full text-white group-hover:rotate-12 transition-transform duration-300">
            <FaUtensils className="text-lg" />
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            Plate<span className="text-[#16a34a]">Share</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-8">{navLinks}</ul>
        </div>

        {/* Auth & Profile Section */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden md:flex gap-3">
               <Link to="/login" className="px-5 py-2 text-[#16a34a] font-semibold hover:bg-green-50 rounded-full transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold rounded-full shadow-lg hover:shadow-green-200 transition-all transform hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-[#16a34a] ring-offset-2 ring-offset-base-100 hover:scale-105 transition-transform">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/tZ22d4h/user-placeholder.png"}
                    alt="user"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </label>
              
              {/* Professional Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white rounded-xl w-64 border border-gray-100"
              >
                {/* User Info Header */}
                <li className="menu-title px-4 py-3 border-b border-gray-100 mb-2">
                  <span className="block text-gray-900 font-bold text-base truncate">
                    {user?.displayName || "User"}
                  </span>
                  <span className="block text-xs text-gray-500 font-normal truncate">
                    {user?.email}
                  </span>
                </li>

                {/* Dashboard Links (Pointed to Dashboard Layout) */}
                <li>
                  <Link to="/dashboard/add-food" className="py-2 hover:bg-green-50 text-gray-700">
                    <FiPlusCircle className="text-[#16a34a]" /> Add Food
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-my-foods" className="py-2 hover:bg-green-50 text-gray-700">
                    <FiGrid className="text-[#16a34a]" /> Manage My Foods
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/my-food-requests" className="py-2 hover:bg-green-50 text-gray-700">
                    <FiList className="text-[#16a34a]" /> My Food Requests
                  </Link>
                </li>
                
                <div className="divider my-1"></div>

                <li>
                  <button
                    onClick={handleLogout}
                    className="py-2 text-red-500 hover:bg-red-50 hover:text-red-600 font-medium"
                  >
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-gray-700">
              <FaBars className="text-xl" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-lg bg-white rounded-box w-52 border border-gray-100"
            >
              {navLinks}
              {!user && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                  <Link to="/login" className="btn btn-sm btn-ghost w-full">Login</Link>
                  <Link to="/register" className="btn btn-sm bg-[#16a34a] text-white w-full border-none">Sign Up</Link>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;