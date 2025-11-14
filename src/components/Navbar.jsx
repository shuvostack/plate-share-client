import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { FaUtensils } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const {user, logOutUser} = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser()
      .then(result => {
        console.log(result.user)
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const navLinks = (
    <nav className="flex justify-center items-center">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#16a34a] font-semibold" : "hover:text-[#16a34a]"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-foods"
          className={({ isActive }) =>
            isActive ? "text-[#16a34a] font-semibold" : "hover:text-[#16a34a]"
          }
        >
          Available Foods
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/add-food"
              className={({ isActive }) =>
                isActive
                  ? "text-[#16a34a] font-semibold"
                  : "hover:text-[#16a34a]"
              }
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-my-foods"
              className={({ isActive }) =>
                isActive
                  ? "text-[#16a34a] font-semibold"
                  : "hover:text-[#16a34a]"
              }
            >
              Manage My Foods
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-food-requests"
              className={({ isActive }) =>
                isActive
                  ? "text-[#16a34a] font-semibold"
                  : "hover:text-[#16a34a]"
              }
            >
              My Food Requests
            </NavLink>
          </li>
        </>
       )} 
    </nav>
  );

  return (
    <div className="bg-white shadow-md sticky top-0 z-50 flex items-center">
      <div className="navbar container mx-auto px-4">
        <div className="flex-1">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2 text-[#16a34a]"
          >
            <FaUtensils />
            Plate<span className="text-gray-800">Share</span>
          </Link>
        </div>

        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-4">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {!user ? (
            <Link
              to="/login"
              className="btn bg-[#16a34a] hover:bg-[#15803d] text-white"
            >
              Login
            </Link>
           ) : ( 
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "/default-user.png"}
                    alt="user"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="text-center font-bold text-gray-700">
                  {user.displayName || "Anonymous User"}
                </li>
                <Link to="/add-food" className="font-semibold text-[#16a34a] hover:underline">
                  Add Food
                </Link>
                <Link to="/add-food" className="font-semibold text-[#16a34a] hover:underline">
                  Manage My Foods
                </Link>
                <Link to="/add-food" className="font-semibold text-[#16a34a] hover:underline">
                  My Food Request
                </Link>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
           )} 
        </div>
      </div>
    </div>
  );
};

export default Navbar;
