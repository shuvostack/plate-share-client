import React from "react";
import { motion } from "framer-motion";
import { ClipboardPlus, Search, HandHeart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Post Food",
      desc: "Donators can easily share details about surplus meals — location, quantity, and pickup time.",
      icon: <ClipboardPlus size={36} />,
      color: "bg-primary/10 text-primary",
    },
    {
      id: 2,
      title: "Find Food",
      desc: "Receivers browse available foods near them and choose what they need — totally free.",
      icon: <Search size={36} />,
      color: "bg-secondary/10 text-secondary",
    },
    {
      id: 3,
      title: "Collect Food",
      desc: "After confirmation, receivers can collect fresh, unused food and prevent waste.",
      icon: <HandHeart size={36} />,
      color: "bg-accent/10 text-accent",
    },
  ];

  return (
    <section className="bg-base-100 py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 "
        >
          <span className="text-[#16a34a]">How It</span> Works
        </motion.h2>
        <p className="text-gray-600 mb-14 max-w-2xl mx-auto">
          We make food sharing simple and impactful. Here’s how PlateShare helps
          connect kindness with those in need.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="card bg-base-200 shadow-md rounded-2xl py-10 px-6 flex flex-col items-center"
            >
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-full ${step.color} mb-6`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-base-content">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
