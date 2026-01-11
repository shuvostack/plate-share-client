import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner"; 
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { MapPin, Calendar, Utensils, Package, FileText, ImagePlus, UserCheck } from "lucide-react";

const AddFood = () => {
  const { user, loading } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const imageHostingKey = import.meta.env.VITE_IMGBB_API_KEY;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleAddFood = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const food_name = form.food_name.value;
    const food_quantity = form.food_quantity.value;
    const pickup_location = form.pickup_location.value;
    const expire_date = form.expire_date.value;
    const additional_notes = form.additional_notes.value;
    const imageFile = form.food_image.files[0];

    try {
      // Upload Image
      const formData = new FormData();
      formData.append("image", imageFile);

      const upRes = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });

      const uploadData = await upRes.json();

      if (!uploadData.success) {
        throw new Error("Image upload failed");
      }

      const food_image = uploadData.data.display_url;

      // Prepare Data
      const newFood = {
        food_name,
        food_image,
        food_quantity,
        pickup_location,
        expire_date,
        additional_notes,
        donator_name: user.displayName,
        donator_email: user.email,
        donator_image: user.photoURL,
        food_status: "available",
        posted_date: new Date().toISOString(), 
      };

      // Send to Server
      const response = await fetch("https://plate-share-server-eight.vercel.app/foods", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newFood),
      });

      const data = await response.json();

      if (data.insertedId) {
        Swal.fire({
          title: "Food added successfully!",
          text: "Thank you for your contribution.",
          icon: "success",
          confirmButtonColor: "#16a34a",
        }).then(() => {
          form.reset();
          navigate("/available-foods");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add food!",
        });
      }
    } catch (error) {
      console.error("Error adding food:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Share a <span className="text-[#16a34a]">Meal</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Fill in the details below to list your surplus food. Your kindness matters!
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
        <form onSubmit={handleAddFood} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left */}
            <div className="space-y-6">
              
              {/* Food Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Food Name</label>
                <div className="relative">
                  <Utensils className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="food_name"
                    required
                    placeholder="e.g. Chicken Biryani"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20 focus:border-[#16a34a] transition-all"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="food_quantity"
                    required
                    placeholder="e.g. Serves 4 people"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20 focus:border-[#16a34a] transition-all"
                  />
                </div>
              </div>

              {/* Expire Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expire Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    name="expire_date"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20 focus:border-[#16a34a] transition-all text-gray-600"
                  />
                </div>
              </div>

            </div>

            {/* Right */}
            <div className="space-y-6">
              
              {/* Pickup Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="pickup_location"
                    required
                    placeholder="Enter full address"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20 focus:border-[#16a34a] transition-all"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Food Image</label>
                <div className="relative">
                  <input
                    type="file"
                    name="food_image"
                    accept="image/*"
                    required
                    className="w-full file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#16a34a]/10 file:text-[#16a34a] hover:file:bg-[#16a34a]/20 bg-gray-50 border border-gray-200 rounded-xl text-gray-500"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                    <ImagePlus size={20} />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-gray-400" size={18} />
                  <textarea
                    name="additional_notes"
                    placeholder="Any special instructions or details..."
                    rows="3"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20 focus:border-[#16a34a] transition-all"
                  ></textarea>
                </div>
              </div>

            </div>
          </div>

          {/* Donator Info and Submit Button */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100 mt-6">
            
            {/* Donator Badge */}
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              <div className="relative">
                 <img
                    src={user?.photoURL}
                    alt="Donator"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                 />
                 <div className="absolute -bottom-1 -right-1 bg-[#16a34a] text-white p-0.5 rounded-full border border-white">
                    <UserCheck size={10} />
                 </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Posting as</p>
                <p className="text-sm font-bold text-gray-800">{user?.displayName}</p>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full md:w-auto px-10 py-4 rounded-xl font-bold text-white shadow-lg shadow-green-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                submitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#16a34a] hover:bg-[#15803d]"
              }`}
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span> Processing...
                </>
              ) : (
                "Add Food Listing"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddFood;