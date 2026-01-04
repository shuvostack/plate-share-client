import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { Link, useLocation, useNavigate } from "react-router";
import { FaUtensils } from "react-icons/fa";

const Login = () => {
  const { signInUser,  } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password)

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);

        if (!user.emailVerified) {
          Swal.fire({
            title: "Email not verified❌",
            text: "Please verify your email before login",
            icon: "warning",
          });
          signOut(auth);
          return;
        } else {
          Swal.fire({
            title: "Login successful",
            icon: "success",
            draggable: true,
          });
        }
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error.code);
        setError(error.code);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Check email and password",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-2 text-[#16a34a] text-3xl font-bold mb-6">
          <FaUtensils />
          Plate<span className="text-gray-800">Share</span>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Log in to continue sharing and managing food.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#16a34a] font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
          <p className="mt-2">
            <Link
              to="/forgot-password"
              className="text-[#16a34a] hover:underline"
            >
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
