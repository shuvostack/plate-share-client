import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router";
import { FaUtensils, FaGoogle } from "react-icons/fa";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, signInWithGoogle, setUser } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 1 uppercase, 1 lowercase letter and be 6+ characters long"
      );
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password, name, photo)
      .then((result) => {
        const user = result.user;

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
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const newUser = {
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL
        }

        // create user in the database
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('data after user save', data)
            })

        Swal.fire({
          title: "Logged in with Google!",
          icon: "success",
          draggable: false,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 text-[#16a34a] text-3xl font-bold mb-6">
          <FaUtensils />
          Plate<span className="text-gray-800">Share</span>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join the community and start sharing food today.
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
            />
          </div>

          {nameError && (
            <p className="text-red-500 text-sm text-center">{nameError}</p>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Photo URL
            </label>
            <input
              name="photo"
              type="text"
              placeholder="your photoURL"
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
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
            />
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm text-center">{passwordError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition duration-200"
          >
            <FaGoogle className="text-[#16a34a]" /> Login with Google
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#16a34a] font-medium hover:underline"
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
