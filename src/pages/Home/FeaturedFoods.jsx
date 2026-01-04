import React, { use, useEffect } from "react";
import { Link } from "react-router"; 
import FoodCard from "../../components/Shared/FoodCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, Zap } from "lucide-react";

const FeaturedFoods = ({ featuredFoodsPromise }) => {
  const foods = use(featuredFoodsPromise);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      offset: 100,
      once: true, 
    });
  }, []);

  return (
    <section className="py-20 relative bg-gray-50/50 overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6" data-aos="fade-down">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#16a34a] font-bold tracking-wider uppercase mb-2 text-sm">
              <Zap size={18} fill="currentColor" />
              <span>Highest Priority</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
              Featured <span className="text-[#16a34a]">Foods</span>
            </h2>
            <p className="text-gray-500 mt-3 text-lg">
              These items need immediate attention. Help us save this food from going to waste by requesting it now.
            </p>
          </div>

          <Link to="/available-foods">
            <button className="hidden md:flex items-center gap-2 text-gray-600 font-semibold hover:text-[#16a34a] transition-colors group">
              View All Foods 
              <span className="bg-gray-200 group-hover:bg-[#16a34a] group-hover:text-white p-2 rounded-full transition-all duration-300">
                <ArrowRight size={16} />
              </span>
            </button>
          </Link>
        </div>

        {/* Cards */}
        {foods && foods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foods.map((food, index) => (
              <div 
                key={food._id}
                data-aos="fade-up"
                data-aos-delay={index * 100} 
              >
                <FoodCard food={food} />
              </div>
            ))}
          </div>
        ) : (
          /* If no featured foods */
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
             <h3 className="text-2xl font-bold text-gray-400">No featured foods available right now.</h3>
             <p className="text-gray-400">Check back later or browse all foods.</p>
          </div>
        )}

        {/* Mobile View */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link to="/available-foods">
            <button className="btn bg-[#16a34a] hover:bg-[#15803d] text-white rounded-full px-8">
              View All Foods
            </button>
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedFoods;