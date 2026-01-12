import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { Link, useLocation, useNavigate } from "react-router";
import { FaUtensils, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        if (!user.emailVerified) {
          Swal.fire({
            title: "Email not verified",
            text: "Please verify your email before login",
            icon: "warning",
            confirmButtonColor: "#16a34a",
          });
          signOut(auth);
          setLoading(false);
          return;
        } else {
          Swal.fire({
            title: "Welcome Back!",
            text: "Login successful",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate(`${location.state ? location.state : "/"}`);
        }
      })
      .catch((error) => {
        console.log(error.code);
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden px-4 py-24">
      {/* background blob */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#16a34a] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-[2rem] p-8 md:p-10 border border-white/50">
        
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 text-[#16a34a] text-3xl font-black mb-2">
            <div className="bg-[#16a34a]/10 p-3 rounded-full">
              <FaUtensils />
            </div>
            Plate<span className="text-gray-800">Share</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-500 mt-1">Sign in to continue your journey.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#16a34a] focus:ring-0 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#16a34a] focus:ring-0 transition-all shadow-sm"
              />
            </div>
            <div className="flex justify-end mt-2">
              <Link to="/forgot-password" class="text-sm font-semibold text-[#16a34a] hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          {/* Login Btn */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#16a34a] to-[#15803d] hover:from-[#15803d] hover:to-[#16a34a] text-white font-bold py-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-green-200 flex items-center justify-center gap-2 text-lg"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>Login <FaArrowRight/></>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#16a34a] font-bold hover:underline ml-1"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;