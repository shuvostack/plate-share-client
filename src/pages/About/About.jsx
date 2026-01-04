import React from "react";
import { Link } from "react-router";
import { FaHandHoldingHeart, FaLeaf, FaUsers, FaGlobeAmericas } from "react-icons/fa";
import { MdOutlineVolunteerActivism } from "react-icons/md";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      
      {/* 1. Hero Section: Emotional Hook */}
      <div className="relative bg-[#0f172a] text-white py-20 px-6 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#16a34a] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h5 className="text-[#16a34a] font-bold tracking-widest uppercase mb-4">About PlateShare</h5>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            We don't just share food; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-emerald-300">
              we share hope.
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            PlateShare is a community-driven platform dedicated to reducing food waste and fighting hunger. 
            We connect surplus food from kind-hearted donors to the people who need it most.
          </p>
        </div>
      </div>

      {/* 2. Mission & Vision Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Mission Card */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border-l-8 border-[#16a34a] hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-[#16a34a] text-3xl">
              <MdOutlineVolunteerActivism />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To create a world where no edible food goes to waste. We aim to bridge the gap between abundance and scarcity by using technology to make food sharing easy, transparent, and dignified.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border-l-8 border-purple-500 hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-purple-600 text-3xl">
              <FaGlobeAmericas />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A sustainable future where communities support each other. We envision a society where sharing surplus meals is a daily habit, significantly reducing carbon footprints and hunger simultaneously.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The "Why We Exist" Section (Image + Text) */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-4 border-[#16a34a] rounded-2xl z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop" 
              alt="Volunteers packing food" 
              className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[400px]"
            />
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Turning <span className="text-[#16a34a]">Waste</span> into <span className="text-purple-600">Wonder</span></h2>
            <p className="text-gray-600 mb-6 text-lg">
              Did you know that nearly <strong>1/3 of all food produced</strong> globally is wasted? Meanwhile, millions go to bed hungry.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              PlateShare was born from a simple idea: Food is better in bellies than in bins. Whether you are a restaurant with extra supplies, an event planner with leftover catering, or a neighbor with too many vegetables — you can be a hero.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FaLeaf className="text-[#16a34a]" /> <span>Reduce Landfill Waste</span>
              </div>
              <div className="flex items-center gap-3">
                <FaHandHoldingHeart className="text-[#16a34a]" /> <span>Support Local Families</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="text-[#16a34a]" /> <span>Build Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Stats Section (Trust Building) */}
      <div className="bg-[#16a34a] py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <h3 className="text-4xl font-extrabold mb-2">500+</h3>
            <p className="text-green-100">Active Donors</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-extrabold mb-2">12k+</h3>
            <p className="text-green-100">Meals Saved</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-extrabold mb-2">850+</h3>
            <p className="text-green-100">Families Helped</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-extrabold mb-2">24/7</h3>
            <p className="text-green-100">Community Support</p>
          </div>
        </div>
      </div>

      {/* 5. Call to Action */}
      <div className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
          Ready to make a <span className="text-[#16a34a]">Difference?</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
          Join our growing community today. Whether you want to give food or need a helping hand, PlateShare is here for you.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Join as a Donor
          </Link>
          <Link to="/available-foods" className="bg-white border-2 border-[#16a34a] text-[#16a34a] px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all">
            Find Food
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default About;