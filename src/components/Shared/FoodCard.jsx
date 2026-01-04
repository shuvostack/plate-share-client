import React from "react";
import { Link } from "react-router";
import { MapPin, User, Package, ArrowRight, Clock } from "lucide-react";

const FoodCard = ({ food }) => {
  const {
    food_image,
    food_name,
    additional_notes,
    pickup_location,
    expire_date,
    donator_image,
    donator_name,
    food_status,
    food_quantity,
    _id,
  } = food;

  return (
    <div className="group relative w-full bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={food_image}
          alt={food_name}
          className="object-cover w-full h-full transform group-hover:scale-110 transition duration-700 ease-in-out"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md border border-white/20 shadow-lg ${
              food_status === "Available"
                ? "bg-green-500/90 text-white"
                : "bg-orange-500/90 text-white"
            }`}
          >
            {food_status}
          </span>
        </div>

        {/* Floating Expiry Date */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90 bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
          <Clock size={14} className="text-orange-300" />
          <span className="text-xs font-medium">Exp: {expire_date}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative">
        
        <div className="absolute -top-8 right-6" title={`Donated by ${donator_name}`}>
          <img
            src={donator_image}
            alt={donator_name}
            className="w-14 h-14 rounded-full border-4 border-white shadow-md object-cover transform group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Title & Location */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-[#16a34a] transition-colors truncate">
            {food_name}
          </h2>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin size={14} className="text-[#16a34a]" />
            <span className="truncate">{pickup_location}</span>
          </div>
        </div>

        {/* Notes */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {additional_notes}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* Quantity & Button */}
        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
            <Package size={16} className="text-[#16a34a]" />
            <span className="text-sm font-semibold text-gray-700">
              {food_quantity} <span className="text-xs font-normal text-gray-500">Left</span>
            </span>
          </div>

          <Link to={`/foods/${_id}`}>
            <button className="flex items-center gap-2 bg-[#16a34a] hover:bg-[#14532d] text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-green-200 group/btn">
              Details
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;