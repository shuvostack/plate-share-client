import React, { useContext } from "react";
import FeaturedFoods from "./FeaturedFoods";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router";
import Banner from "./Banner";
import HowItWorks from "./StaticSections/HowItWorks";
import OurMission from "./StaticSections/OurMission";

const featuredFoodsPromise = fetch("https://plate-share-server-eight.vercel.app/featured-foods").then(
  (res) => res.json()
);

const Home = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="w-11/12 mx-auto">
      {/* hero section */}
      <Banner></Banner>

      {/* featured section */}
      <section className="my-10">
        <h3 className="text-center text-4xl mb-4 font-bold">
          <span className="text-[#16a34a]">Featured</span> Foods
        </h3>
        <div className="p-5">
          <FeaturedFoods
            featuredFoodsPromise={featuredFoodsPromise}
          ></FeaturedFoods>
        </div>
        <div className="flex justify-center mt-4">
          <Link to="/available-foods">
            <button className="btn bg-[#16a34a] hover:bg-[#076128ff] text-white">Show All</button>
          </Link>
        </div>
      </section>

      {/* how it works section */}
      <div>
        <HowItWorks></HowItWorks>
      </div>

      {/* Our mission */}
      <div className="my-5">
        <OurMission></OurMission>
      </div>
    </div>
  );
};

export default Home;
