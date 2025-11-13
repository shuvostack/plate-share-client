import React from "react";
import { Link } from "react-router";
import { CalendarDays, MapPin, User } from "lucide-react";

const FoodCard = ({food}) => {

  const {food_image, food_name, additional_notes, pickup_location, expire_date, donator_image, donator_name, food_status, food_quantity, _id} = food

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 rounded-2xl">
      <figure className="h-56 overflow-hidden">
        <img
          src={food_image}
          alt={food_name}
          className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-xl font-semibold text-primary">
          {food_name}
        </h2>
        <p className="text-sm text-gray-600">{additional_notes}</p>

        <div className="flex flex-wrap justify-between mt-3 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <MapPin size={16} />
            {pickup_location}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays size={16} />
            Exp: {expire_date}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <img
              src={donator_image}
              alt={donator_name}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <p className="font-medium text-sm">{donator_name}</p>
              <p className="text-xs text-gray-500">Donator</p>
            </div>
          </div>

          <div
            className={`badge badge-lg ${
              food_status === "Available"
                ? "badge-success"
                : food_status === "Donated"
                ? "badge-warning"
                : "badge-neutral"
            }`}
          >
            {food_status}
          </div>
        </div>

        <div className="flex justify-between items-center mt-5">
          <p className="text-gray-600 font-medium">
            Quantity:{" "}
            <span className="text-primary font-semibold">{food_quantity}</span>
          </p>

          {/* 🍽️ View Details Button */}
          <Link to={`/foods/${_id}`}>
            <button className="btn bg-[#16a34a] hover:bg-[#076128ff] text-white btn-sm ">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
