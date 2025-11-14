import React, { use } from "react";
import FoodCard from "../../components/Shared/FoodCard";
import { motion } from "framer-motion";

const FeaturedFoods = ({ featuredFoodsPromise }) => {
  const foods = use(featuredFoodsPromise);

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      {foods.map((food) => (
        <motion.div
          key={food._id}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <FoodCard food={food} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturedFoods;
