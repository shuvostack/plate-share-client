import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router";
import { FaUtensils, FaUser, FaEnvelope, FaImage, FaLock, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, signInWithGoogle, setUser } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      setLoading(false);
      return;
    } else {
      setNameError("");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 1 uppercase, 1 lowercase letter and be 6+ characters long"
      );
      setLoading(false);
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password, name, photo)
      .then((result) => {
        const user = result.user;

        // Save user to DB
        const newUser = { name, email, photo };
        fetch("https://plate-share-server-eight.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });

        sendEmailVerification(user)
          .then(() => {
            Swal.fire({
              title: "Verify your email 📩",
              text: "A verification link has been sent to your email. Please verify before login.",
              icon: "info",
              confirmButtonColor: "#16a34a",
            });

            signOut(auth);
            navigate("/login");
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };

        fetch("https://plate-share-server-eight.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });

        Swal.fire({
          title: "Logged in with Google!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden px-4 py-24">
      
      {/* background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#16a34a] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* register card */}
      <div className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-lg shadow-2xl rounded-[2rem] p-8 md:p-10 border border-white/50">
        
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 text-[#16a34a] text-3xl font-black mb-2">
            <div className="bg-[#16a34a]/10 p-3 rounded-full">
              <FaUtensils />
            </div>
            Plate<span className="text-gray-800">Share</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800"> Create Account </h2>
          <p className="text-gray-500 mt-1">Join our community of sharing.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#16a34a] focus:ring-0 transition-all shadow-sm"
              />
            </div>
            {nameError && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{nameError}</p>}
          </div>

          {/* email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#16a34a] focus:ring-0 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* photo URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">Photo URL</label>
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="photo"
                type="text"
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#16a34a] focus:ring-0 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#16a34a] focus:ring-0 transition-all shadow-sm"
              />
            </div>
            {passwordError && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{passwordError}</p>}
          </div>

          {/* register button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#16a34a] to-[#15803d] hover:from-[#15803d] hover:to-[#16a34a] text-white font-bold py-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-green-200 flex items-center justify-center gap-2 text-lg mt-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>Sign Up <FaArrowRight/></>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/50 text-gray-500 backdrop-blur-sm">Or register with</span>
          </div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-all transform hover:-translate-y-0.5"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        {/* footer Link*/}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#16a34a] font-bold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;