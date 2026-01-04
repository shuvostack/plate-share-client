import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Heart, UtensilsCrossed } from "lucide-react"

const Banner = () => {
  return (
    <div className="mt-7">
      <section className="relative bg-gradient-to-br from-primary/10 via-base-100 to-primary/5 overflow-hidden rounded-xl">
        
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/79L6c8V/pan-cakes.jpg"
            alt="Food Sharing"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

        
        <div className="relative container mx-auto px-6 lg:px-16 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-10">
         
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
            className="text-white space-y-5 lg:w-1/2"
          >
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Share a Meal, <br />
              <span className="text-[#16a34a]">Spread Happiness!</span>
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              PlateShare connects kind-hearted people with those in need. Donate
              your extra food and make a meaningful impact on someone's life
              today.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="/add-food">
                <button className="btn btn bg-[#16a34a] hover:bg-[#076128ff] text-white  btn-md shadow-md flex items-center gap-2 hover:scale-105 transition-transform">
                  <UtensilsCrossed size={18} /> Donate Food
                </button>
              </Link>

              <Link to="/foods">
                <button className="btn btn-outline btn-primary btn-md flex items-center gap-2 hover:scale-105 transition-transform">
                  <Heart size={18} /> Browse Foods
                </button>
              </Link>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3 }}
            className="lg:w-1/2 flex justify-center relative"
          >
            <div className="relative">
              <img
                src="https://i.ibb.co/5g1S7D7k/vegitable-salad.jpg"
                alt="Share Food Illustration"
                className="w-[350px] lg:w-[480px] drop-shadow-2xl rounded-3xl"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-3 shadow-lg flex items-center gap-3"
              >
                <div className="bg-secondary text-white p-2 rounded-full">
                  <Heart size={20} />
                </div>
                <p className="font-medium text-gray-800">
                  5,000+ Meals Donated 🍛
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
