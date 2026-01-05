import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Utensils, Users, Leaf, Smile } from "lucide-react";

const ImpactStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3, 
  });

  const stats = [
    {
      id: 1,
      icon: <Utensils size={32} />,
      count: 5240,
      label: "Meals Saved",
      suffix: "+",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      desc: "Plates of food diverted from waste to plates.",
    },
    {
      id: 2,
      icon: <Users size={32} />,
      count: 1200,
      label: "Active Donors",
      suffix: "+",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      desc: "Community heroes contributing daily.",
    },
    {
      id: 3,
      icon: <Leaf size={32} />,
      count: 3500,
      label: "Kg CO2 Saved",
      suffix: "kg",
      color: "text-green-400",
      bg: "bg-green-400/10",
      desc: "Reduction in carbon footprint by saving food.",
    },
    {
      id: 4,
      icon: <Smile size={32} />,
      count: 8500,
      label: "Happy Faces",
      suffix: "+",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      desc: "People fed and smiles created globally.",
    },
  ];

  return (
    <section className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
      
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#16a34a] rounded-full blur-[120px] opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our <span className="text-[#16a34a]">Impact</span> in Numbers
          </h2>
          <p className="text-gray-400 text-lg">
            Every number represents a life touched and a meal saved. Together, we are creating a hunger-free world.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(22,163,74,0.2)]"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>

              {/* Counter */}
              <div className="text-4xl font-extrabold mb-2 text-white">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.count}
                    duration={2.5}
                    separator=","
                  />
                ) : (
                  "0"
                )}
                <span className={`text-2xl ${stat.color}`}>{stat.suffix}</span>
              </div>

              {/* Label & Desc */}
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                {stat.label}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-[#16a34a]/10 border border-[#16a34a]/30 rounded-full px-6 py-2 text-[#4ade80] text-sm font-medium animate-pulse">
             Join us and increase these numbers today!
          </div>
        </div>

      </div>
    </section>
  );
};

export default ImpactStats;