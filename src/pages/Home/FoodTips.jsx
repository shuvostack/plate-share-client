import React from "react";
import { ArrowRight, Leaf, Clock, Thermometer, Info } from "lucide-react";

const FoodTips = () => {
  const tips = [
    {
      id: 1,
      category: "Storage",
      title: "Keep Greens Fresh Longer",
      desc: "Wrap leafy greens in a damp paper towel before placing them in the fridge. This maintains humidity and keeps them crisp for days.",
      icon: <Thermometer size={24} />,
    },
    {
      id: 2,
      category: "Preservation",
      title: "Don't Toss Overripe Bananas",
      desc: "Overripe bananas are gold! Peel and freeze them for smoothies, or mash them up for delicious banana bread. Never waste them.",
      icon: <Clock size={24} />,
    },
    {
      id: 3,
      category: "Zero Waste",
      title: "Understand Expiry Dates",
      desc: "'Best before' refers to quality, not safety. Trust your senses—smell and look before throwing away perfectly edible food.",
      icon: <Leaf size={24} />,
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[#16a34a] font-bold uppercase tracking-widest text-xs mb-3">
              <Info size={16} />
              <span>Educational</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Smart Food <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-emerald-600">
                Saving Habits
              </span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-md mt-4 md:mt-0 text-right md:text-left">
            Simple changes in your daily routine can drastically reduce food waste. Here are our top picks for the week.
          </p>
        </div>

        {/* List Layout */}
        <div className="space-y-8">
          {tips.map((tip, index) => (
            <div 
              key={tip.id} 
              className="group relative flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-gray-100 hover:border-[#16a34a] transition-colors duration-500 cursor-default"
            >
              
              {/* Numbering */}
              <div className="text-6xl font-black text-gray-100 group-hover:text-[#16a34a]/20 transition-colors duration-500 select-none">
                0{index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                <div className="flex items-center gap-3 mb-2">
                   <span className="text-xs font-bold text-[#16a34a] uppercase tracking-wider border border-green-100 px-2 py-1 rounded">
                     {tip.category}
                   </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-[#16a34a] transition-colors duration-300">
                  {tip.title}
                </h3>
                
                <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">
                  {tip.desc}
                </p>
              </div>

              {/* Icon */}
              <div className="hidden md:flex items-center justify-center w-16 text-gray-300 group-hover:text-[#16a34a] group-hover:rotate-45 transition-all duration-500">
                 <ArrowRight size={32} />
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Link */}
        {/* <div className="mt-12 text-center md:text-right">
          <a href="#" className="inline-flex items-center gap-2 font-bold text-gray-800 hover:text-[#16a34a] hover:underline transition-all">
            Read all articles <ArrowRight size={18} />
          </a>
        </div> */}

      </div>
    </section>
  );
};

export default FoodTips;