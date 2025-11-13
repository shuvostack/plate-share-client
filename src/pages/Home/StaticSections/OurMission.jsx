import React from "react";
import { motion } from "framer-motion";
import { Users, UtensilsCrossed, HeartHandshake } from "lucide-react";

const OurMission = () => {
  const stats = [
    {
      id: 1,
      title: "Meals Donated",
      value: "5,240+",
      icon: <UtensilsCrossed size={30} />,
      color: "text-secondary",
    },
    {
      id: 2,
      title: "Active Donators",
      value: "1,100+",
      icon: <Users size={30} />,
      color: "text-primary",
    },
    {
      id: 3,
      title: "Lives Impacted",
      value: "8,500+",
      icon: <HeartHandshake size={30} />,
      color: "text-accent",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-20 rounded-xl">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-primary"
        >
          Our Mission
        </motion.h2>
        <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
          We believe in a world where no one sleeps hungry. PlateShare bridges
          the gap between food waste and food need — creating a caring community
          of giving and gratitude.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {stats.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-base-100 shadow-md rounded-2xl py-10 px-6 flex flex-col items-center"
            >
              <div className={`${item.color} mb-4`}>{item.icon}</div>
              <h3 className="text-3xl font-bold text-base-content">
                {item.value}
              </h3>
              <p className="text-gray-500 mt-2">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
