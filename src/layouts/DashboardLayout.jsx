import React, { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { FaBars, FaHome, FaUtensils, FaShoppingCart, FaPlusCircle, FaUser, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";
import { CircleUserRound, LayoutDashboard } from "lucide-react";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext); 
  const navigate = useNavigate();

  const isAdmin = false;

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  // Sidebar Menu Items
  const menuItems = (
    <>
      {/* User */}
      <li className="mb-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-[#16a34a] text-white shadow-lg shadow-green-200"
                : "text-gray-600 hover:bg-green-50 hover:text-[#16a34a]"
            }`
          }
        >
          <LayoutDashboard />
          <span className="font-medium">Overview</span>
        </NavLink>
      </li>

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

      <li className="mb-2">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-[#16a34a] text-white shadow-lg shadow-green-200"
                : "text-gray-600 hover:bg-green-50 hover:text-[#16a34a]"
            }`
          }
        >
          <CircleUserRound size={18} />
          <span className="font-medium">Profile</span>
        </NavLink>
      </li>

      {/* Admin */}
      {isAdmin && (
        <>
          <div className="divider my-4 text-xs font-semibold text-gray-400">ADMIN MENU</div>
          <li className="mb-2">
             <NavLink to="/dashboard/all-users" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? "bg-[#16a34a] text-white shadow-lg shadow-green-200" : "text-gray-600 hover:bg-green-50 hover:text-[#16a34a]"}`}>
               <FaUser /> <span className="font-medium">All Users</span>
             </NavLink>
          </li>
          <li className="mb-2">
             <NavLink to="/dashboard/manage-all-foods" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? "bg-[#16a34a] text-white shadow-lg shadow-green-200" : "text-gray-600 hover:bg-green-50 hover:text-[#16a34a]"}`}>
               <FaUtensils /> <span className="font-medium">All Foods</span>
             </NavLink>
          </li>
           <li className="mb-2">
             <NavLink to="/dashboard/stats" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? "bg-[#16a34a] text-white shadow-lg shadow-green-200" : "text-gray-600 hover:bg-green-50 hover:text-[#16a34a]"}`}>
               <FaTachometerAlt /> <span className="font-medium">Statistics</span>
             </NavLink>
          </li>
        </>
      )}
      
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
      
      <div className="drawer-content flex flex-col">
        {/* Navbar (Sticky) */}
        <div className="w-full navbar bg-white shadow-sm z-10 sticky top-0 px-6 justify-between">
          {/* Mobile Menu */}
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost text-[#16a34a]">
              <FaBars className="text-xl" />
            </label>
          </div>
          
          {/* Page Title */}
          <div className="flex-1 px-2 mx-2 text-xl font-bold text-gray-700 lg:hidden">
            Plate<span className="text-[#16a34a]">Share</span>
          </div>
          
          <div className="flex-none gap-4 ml-auto">
             {/* Profile Dropdown */}
             <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full border border-gray-200">
                    <img alt="User" src={user?.photoURL || "https://i.ibb.co/tZ22d4h/user-placeholder.png"} />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li className="menu-title px-4 py-2">
                     <span className="text-gray-500 text-xs">Signed in as</span>
                     <span className="font-bold text-gray-800 truncate block">{user?.email}</span>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <Link to="/dashboard/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li><Link to="/dashboard">Dashboard Home</Link></li>
                  <li><button onClick={handleLogout} className="text-red-500"><FaSignOutAlt/> Logout</button></li>
                </ul>
             </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-white border-r border-gray-100 text-base-content">
          {/* Logo */}
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

          {/* Sidebar Menu */}
          {menuItems}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;