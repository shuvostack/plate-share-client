import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaBars, FaHome, FaUtensils, FaShoppingCart, FaPlusCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  // Sidebar Menu Items
  const menuItems = (
    <>
      <li className="mb-2">
        <NavLink
          to="/dashboard/add-food"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-[#16a34a] text-white shadow-lg shadow-green-200"
                : "text-gray-600 hover:bg-green-50 hover:text-[#16a34a]"
            }`
          }
        >
          <FaPlusCircle />
          <span className="font-medium">Add Food</span>
        </NavLink>
      </li>
      <li className="mb-2">
        <NavLink
          to="/dashboard/manage-my-foods"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-[#16a34a] text-white shadow-lg shadow-green-200"
                : "text-gray-600 hover:bg-green-50 hover:text-[#16a34a]"
            }`
          }
        >
          <MdDashboard />
          <span className="font-medium">Manage My Foods</span>
        </NavLink>
      </li>
      <li className="mb-2">
        <NavLink
          to="/dashboard/my-food-requests"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-[#16a34a] text-white shadow-lg shadow-green-200"
                : "text-gray-600 hover:bg-green-50 hover:text-[#16a34a]"
            }`
          }
        >
          <FaShoppingCart />
          <span className="font-medium">My Food Requests</span>
        </NavLink>
      </li>
      
      <div className="divider my-4"></div>
      
      <li>
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
        >
          <FaHome />
          <span className="font-medium">Back to Home</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open font-sans bg-gray-50 min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* Page Content (Right Side) */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar for Mobile/Tablet */}
        <div className="w-full navbar bg-white shadow-sm lg:hidden z-10 sticky top-0">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost text-[#16a34a]"
            >
              <FaBars className="text-xl" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-xl font-bold text-gray-700">
            Plate<span className="text-[#16a34a]">Share</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </div>

      {/* Sidebar (Left Side) */}
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-white border-r border-gray-100 text-base-content">
          {/* Sidebar Logo */}
          <div className="flex items-center gap-3 px-4 mb-8 mt-2">
            <div className="bg-[#16a34a] p-2 rounded-lg text-white">
              <FaUtensils className="text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                Plate<span className="text-[#16a34a]">Share</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium tracking-wide">DASHBOARD</p>
            </div>
          </div>

          {/* User Profile Snippet */}
          <div className="px-4 mb-6">
            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl border border-green-100">
              <img 
                src={user?.photoURL || "https://i.ibb.co/tZ22d4h/user-placeholder.png"} 
                alt="user" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="overflow-hidden">
                <h3 className="font-bold text-gray-800 text-sm truncate">{user?.displayName || "User"}</h3>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Links */}
          {menuItems}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;