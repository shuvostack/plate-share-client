import React from "react";
import { motion } from "framer-motion";
import { ClipboardPlus, Search, HandHeart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Post Food",
      desc: "Donators can easily share details about surplus meals — location, quantity, and pickup time.",
      icon: <ClipboardPlus size={32} />,
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200",
      shadow: "shadow-blue-100",
    },
    {
      id: 2,
      title: "Find Food",
      desc: "Receivers browse available foods near them and choose what they need — totally free.",
      icon: <Search size={32} />,
      color: "bg-purple-100 text-purple-600",
      borderColor: "border-purple-200",
      shadow: "shadow-purple-100",
    },
    {
      id: 3,
      title: "Collect Food",
      desc: "After confirmation, receivers can collect fresh, unused food and prevent waste.",
      icon: <HandHeart size={32} />,
      color: "bg-green-100 text-green-600",
      borderColor: "border-green-200",
      shadow: "shadow-green-100",
    },
  ];

  // Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
          >
            How It <span className="text-[#16a34a]">Works</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg"
          >
            Sharing food is simple. We've streamlined the process to connect kindness with need in just 3 easy steps.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3 relative"
        >
          
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 border-t-2 border-dashed border-gray-300 z-0"></div>

          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              whileHover={{ y: -10 }} 
              className="relative z-10 group"
            >
              <div className={`bg-white rounded-3xl p-8 border ${step.borderColor} shadow-xl ${step.shadow} hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center text-center`}>
                
                {/* Icon Circle */}
                <div 
                  className={`w-24 h-24 rounded-full flex items-center justify-center ${step.color} mb-6 transform group-hover:rotate-6 transition-transform duration-300 relative`}
                >
                   <div className={`absolute inset-0 rounded-full ${step.color} opacity-40 animate-ping`}></div>
                   <div className="relative z-10 bg-white p-4 rounded-full shadow-sm">
                      {step.icon}
                   </div>
                </div>

                {/* Step Content */}
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-[#16a34a] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {step.desc}
                </p>

                {/* Floating Number Badge */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white transform rotate-12 group-hover:rotate-0 transition-transform">
                  0{step.id}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600">
            Ready to make an impact? {" "}
            <a href="/register" className="text-[#16a34a] font-bold hover:underline">
              Join the community now &rarr;
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;