import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

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
        food_status: "Available",
      };
      console.log(newFood)
      
      const response = await fetch("http://localhost:3000/foods", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newFood),
      })

      const data = await response.json();
      console.log('server response', data)

      if (data.insertedId) {
        Swal.fire({
          title: "Food added successfully!",
          icon: "success",
        })
        .then(() => {
            form.reset();
            navigate("/available-foods");
        })
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
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <div className="max-w-2xl mx-auto bg-base-100 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#16a34a] mb-8">
          🍲 Add a New Food
        </h2>

        <form onSubmit={handleAddFood} className="space-y-5">
          {/* Food Name */}
          <div>
            <label className="label font-semibold">Food Name</label>
            <input
              type="text"
              name="food_name"
              required
              placeholder="Enter food name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Food Image */}
          <div>
            <label className="label font-semibold">Food Image</label>
            <input
              type="file"
              name="food_image"
              accept="image/*"
              required
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="label font-semibold">Food Quantity</label>
            <input
              type="text"
              name="food_quantity"
              required
              placeholder="e.g., Serves 2 people"
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div>
            <label className="label font-semibold">Pickup Location</label>
            <input
              type="text"
              name="pickup_location"
              required
              placeholder="Enter pickup address"
              className="input input-bordered w-full"
            />
          </div>

          {/* Expire Date */}
          <div>
            <label className="label font-semibold">Expire Date</label>
            <input
              type="date"
              name="expire_date"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="label font-semibold">Additional Notes</label>
            <textarea
              name="additional_notes"
              placeholder="Write any special note..."
              className="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>
          </div>

          {/* Donator Info */}
          <div className="bg-base-200 p-4 rounded-xl mt-6">
            <h3 className="font-semibold mb-2 text-[#16a34a]">Donator Info:</h3>
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL}
                alt="Donator"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="font-medium">{user?.displayName}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <button
              type="submit"
              className="btn bg-[#16a34a] hover:bg-[#076128ff] text-white w-full"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Add Food"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
