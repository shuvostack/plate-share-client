import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
    const {createUser, signInWithGoogle} = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                
            })
            .catch()
    }


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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
            />
          </div>

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
              placeholder="you@example.com"
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
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://example.com/photo.jpg"
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
