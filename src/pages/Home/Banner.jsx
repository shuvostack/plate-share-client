import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Heart, UtensilsCrossed, ArrowRight, } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative bg-[#0f172a] text-white overflow-hidden mt-0">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#16a34a] rounded-full blur-[150px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-6"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm text-[#4ade80]">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
              Fighting Hunger, Together
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Share a Meal, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-emerald-300">
                Spread Happiness!
              </span>
            </h1>

            {/* description */}
            <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
              PlateShare connects kind-hearted people with those in need. Don't let good food go to waste—donate your extra meal and become a hero in someone's story today.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/add-food">
                <button className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-3.5 rounded-full font-bold shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_30px_rgba(22,163,74,0.6)] transition-all flex items-center gap-2 group">
                  <UtensilsCrossed size={20} /> Donate Food
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link to="/available-foods">
                <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-md transition-all flex items-center gap-2">
                  <Heart size={20} className="text-red-500" /> Browse Foods
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-[#0f172a]" src="https://i.pravatar.cc/100?img=1" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-[#0f172a]" src="https://i.pravatar.cc/100?img=2" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-[#0f172a]" src="https://i.pravatar.cc/100?img=3" alt="User" />
                <div className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-gray-700 flex items-center justify-center text-xs font-bold">
                  +1.2k
                </div>
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-bold">1,200+</span> Donors joined this week
              </p>
            </div>
          </motion.div>

          {/* Right (Image) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 relative flex justify-center"
          >
            <div className="relative w-[350px] md:w-[450px] h-[350px] md:h-[450px]">
              
              <div 
                className="w-full h-full overflow-hidden shadow-2xl border-4 border-white/10"
                style={{
                    borderRadius: "62% 38% 36% 64% / 58% 52% 48% 42%", 
                    backgroundImage: `url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop')`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
              ></div>

              {/* Badge 1 */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} // Floating Animation
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="bg-[#16a34a] p-2 rounded-full text-white">
                   <UtensilsCrossed size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white">5,240+</h4>
                  <p className="text-xs text-gray-300">Meals Donated</p>
                </div>
              </motion.div>

              {/* Badge 2 */}
              <motion.div 
                animate={{ y: [0, 15, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -right-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[180px]"
              >
                <div className="bg-orange-100 p-2 rounded-full text-orange-500">
                  <Heart size={18} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Top Rated</h4>
                  <p className="text-xs text-gray-500">Community Choice</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Banner;