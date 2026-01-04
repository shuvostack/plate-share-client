import React, { use } from "react";
import FoodCard from "../../components/Shared/FoodCard";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturedFoods = ({ featuredFoodsPromise }) => {
  const foods = use(featuredFoodsPromise);

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      offset: 120,
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {foods.map((food) => (
        <div 
          key={food._id}
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <FoodCard food={food} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedFoods;
