import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import { CalendarDays, MapPin, PackageOpen } from "lucide-react";

const AvailableFoods = () => {

    const [foods, setFoods] = useState([]);
    const {user, loading} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then(res => res.json())
            .then(data => {
                setFoods(data);
            })
            .catch(error => {
                console.log(error.code);
            })
    }, []);

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

  return (
    <div className="bg-base-100 min-h-screen py-16 w-11/12 mx-auto">
      <section className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#16a34a] mb-3">
            Available Foods 🍱
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            All available foods shared by kind donators. Click below to see
            details or request a meal.
          </p>
        </div>

        {/* Grid Layout */}
        {foods.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500">
              No available foods right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {foods.map((food) => (
              <div
                key={food._id}
                className="card bg-base-200 shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Food Image */}
                <figure className="h-52 overflow-hidden">
                  <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </figure>

                {/* Food Info */}
                <div className="card-body p-5 space-y-3">
                  <h3 className="text-xl font-semibold text-[#16a34a] line-clamp-1">
                    {food.food_name}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <PackageOpen size={16} />
                    Quantity: {food.food_quantity}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin size={16} />
                    {food.pickup_location}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CalendarDays size={16} />
                    Expire: {food.expire_date}
                  </div>

                  {/* Donator Info */}
                  <div className="flex items-center gap-3 mt-2">
                    <img
                      src={food.donator_image}
                      alt={food.donator_name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-medium text-sm">{food.donator_name}</p>
                      <p className="text-xs text-gray-500">
                        {food.donator_email}
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="pt-4">
                    <button
                      className="btn bg-[#16a34a] hover:bg-[#076128ff] text-white w-full"
                      onClick={() =>
                        user
                          ? navigate(`/foods/${food._id}`)
                          : navigate("/login")
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AvailableFoods;
