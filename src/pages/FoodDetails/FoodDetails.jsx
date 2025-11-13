import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { CalendarDays, MapPin, PackageOpen, UserRound } from "lucide-react";

const FoodDetails = () => {
  const { loading } = useContext(AuthContext);

  // ✅ useParams থেকে id destructure করো
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  // ✅ fetch ঠিকভাবে call করা
  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setDataLoading(false);
      })
      .catch((error) => {
        console.error("Error loading food:", error);
        setDataLoading(false);
      });
  }, [id]);

  // ✅ যদি loading চলে তাহলে spinner দেখাও
  if (loading || dataLoading) {
    return <LoadingSpinner />;
  }

  // ✅ food null হলে handle করো
  if (!food) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-semibold text-error">Food not found!</h2>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-primary mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ✅ এখন destructure করা safe
  const {
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    additional_notes,
    donator_name,
    donator_email,
    donator_image,
    food_status,
  } = food;

  return (
    <div className="container w-11/12 mx-auto px-4 py-10">
      <div
        className="card lg:card-side  shadow-lg border border-green-500 p-5  rounded-2xl overflow-hidden flex items-center"
        style={{
          backgroundImage: `
        linear-gradient(45deg, 
          rgba(240,253,250,1) 0%, 
          rgba(204,251,241,0.7) 30%, 
          rgba(153,246,228,0.5) 60%, 
          rgba(94,234,212,0.4) 100%
        ),
        radial-gradient(circle at 40% 30%, rgba(255,255,255,0.8) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(167,243,208,0.5) 0%, transparent 50%),
        radial-gradient(circle at 20% 80%, rgba(209,250,229,0.6) 0%, transparent 45%)
      `,
        }}
      >
        {/* 🍱 Left Side Image */}
        <figure className="lg:w-1/2 h-96">
          <img
            src={food_image}
            alt={food_name}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* 🧾 Right Side Details */}
        <div className="card-body lg:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-[#16a34a]">{food_name}</h2>

          <div className="flex flex-wrap gap-3 text-gray-700">
            <p className="flex items-center gap-2">
              <MapPin size={18} /> {pickup_location}
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays size={18} /> Exp: {expire_date}
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed">{additional_notes}</p>

          <div className="mt-4 flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <PackageOpen size={18} />
              <span className="font-medium">Quantity:</span> {food_quantity}
            </p>

            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`badge ${
                  food_status === "Available"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {food_status}
              </span>
            </p>
          </div>

          {/* 👤 Donator Info */}
          <div className="divider"></div>
          <div className="flex items-center gap-3">
            <img
              src={donator_image}
              alt={donator_name}
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <UserRound size={16} /> {donator_name}
              </h3>
              <p className="text-sm text-gray-500">{donator_email}</p>
            </div>
          </div>

          {/* 🍽️ Request Button */}
          <div className="mt-6">
            <button
              className="btn bg-[#16a34a] text-white w-full"
              onClick={() => alert("Feature coming soon!")}
              disabled={food_status !== "Available"}
            >
              {food_status === "Available"
                ? "Request This Food"
                : "Already Donated"}
            </button>
          </div>
        </div>
      </div>

      {/* 🔙 Back Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate(-1)}
          className="btn bg-[#16a34a] hover:bg-[#076128ff] text-white btn-sm "
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default FoodDetails;