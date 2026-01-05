import React, { useContext } from "react";
import FeaturedFoods from "./FeaturedFoods";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router";
import Banner from "./Banner";
import HowItWorks from "./StaticSections/HowItWorks";
import OurMission from "./StaticSections/OurMission";
import ImpactStats from "./ImpactStats";
import Testimonials from "./Testimonials";
import FaqSection from "./FaqSection";
import Newsletter from "./Newsletter";
import FoodTips from "./FoodTips";
import WhyChooseUs from "./WhyChooseUs";

const featuredFoodsPromise = fetch("https://plate-share-server-eight.vercel.app/featured-foods").then(
  (res) => res.json()
);

const Home = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="">
      {/* hero section */}
      <div>
        <Banner></Banner>
      </div>

      {/* featured section */}
      <section className="">
        <div className="p-5 w-11/12 mx-auto">
          <FeaturedFoods
            featuredFoodsPromise={featuredFoodsPromise}
          ></FeaturedFoods>
        </div>
      </section>

      {/* how it works section */}
      <div className="w-11/12 mx-auto">
        <HowItWorks></HowItWorks>
      </div>

      {/* Our mission */}
      <div className="my-5 w-11/12 mx-auto">
        <OurMission></OurMission>
      </div>

      {/* Impact Stats */}
      <div>
        <ImpactStats></ImpactStats>
      </div>

      {/* Testimonials */}
      <div>
        <Testimonials></Testimonials>
      </div>

      {/* FAQ */}
      <div>
        <FaqSection></FaqSection>
      </div>

      {/* Newsletter */}
      <div>
        <Newsletter></Newsletter>
      </div>

      {/* Why Choose Us */}
      <div>
        <WhyChooseUs></WhyChooseUs>
      </div>

      {/* Food Tips */}
      <div>
        <FoodTips></FoodTips>
      </div>
    </div>
  );
};

export default Home;
