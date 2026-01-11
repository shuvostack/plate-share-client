import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Edit2, Trash2, MapPin, Calendar, Package, AlertCircle, X } from "lucide-react";

const ManageMyFoods = () => {
  const { user, loading } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch user foods
  useEffect(() => {
    if (user) {
      const fetchFoods = async () => {
        try {
          setFetching(true);
          const res = await fetch(
            "https://plate-share-server-eight.vercel.app/foods"
          );
          const data = await res.json();
          const myFoods = data.filter(
            (food) => food.donator_email === user.email
          );
          setFoods(myFoods);
        } catch (error) {
          console.error(error);
        } finally {
          setFetching(false);
        }
      };
      fetchFoods();
    }
  }, [user]);

  // Delete Food
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      customClass: {
        popup: "rounded-2xl",
      }
    });

    if (confirm.isConfirmed) {
      await fetch(`https://plate-share-server-eight.vercel.app/foods/${id}`, {
        method: "DELETE",
      });

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        confirmButtonColor: "#16a34a",
      });

      setFoods(foods.filter((food) => food._id !== id));
    }
  };

  // Open modal
  const openUpdateModal = (food) => {
    setSelectedFood(food);
    document.getElementById("update_food_modal").showModal();
  };

  // Update handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedFood = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
      additional_notes: form.additional_notes.value,
      food_status: selectedFood.food_status,
    };

    const res = await fetch(
      `https://plate-share-server-eight.vercel.app/foods/${selectedFood._id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedFood),
      }
    );

    const data = await res.json();
    if (data.modifiedCount > 0) {
      Swal.fire({
        title: "Updated Successfully!",
        icon: "success",
        confirmButtonColor: "#16a34a",
      });

      // Update UI locally
      setFoods((prev) =>
        prev.map((food) =>
          food._id === selectedFood._id ? { ...food, ...updatedFood } : food
        )
      );

      document.getElementById("update_food_modal").close();
    }
  };

  if (loading || fetching) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Manage <span className="text-[#16a34a]">Foods</span>
          </h2>
          <p className="text-gray-500 mt-1">
            You have posted <span className="font-bold text-gray-800">{foods.length}</span> items so far.
          </p>
        </div>
        <button 
          onClick={() => navigate("/dashboard/add-food")}
          className="btn bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl border-none shadow-lg shadow-green-200"
        >
          + Add New Food
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {foods.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Package size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-700">No Foods Added Yet</h3>
            <p className="text-gray-500 mt-2">Start sharing your surplus food with the community.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Head */}
              <thead className="bg-gray-50/50 text-gray-500 font-medium uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-5 pl-8">Food Item</th>
                  <th>Quantity</th>
                  <th>Pickup Location</th>
                  <th>Expire Date</th>
                  <th>Status</th>
                  <th className="text-right pr-8">Actions</th>
                </tr>
              </thead>
              
              {/* Body */}
              <tbody className="divide-y divide-gray-100">
                {foods.map((food) => (
                  <tr key={food._id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Food Info */}
                    <td className="pl-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-14 h-14 rounded-xl shadow-sm">
                            <img src={food.food_image} alt={food.food_name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 text-base">{food.food_name}</div>
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full w-fit mt-1">
                             ID: {food._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="font-medium text-gray-600">
                      {food.food_quantity}
                    </td>

                    {/* Location */}
                    <td>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin size={14} className="text-[#16a34a]" />
                        {food.pickup_location}
                      </div>
                    </td>

                    {/* Expire Date */}
                    <td>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar size={14} className="text-orange-500" />
                        {food.expire_date}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize flex items-center gap-1 w-fit ${
                        food.food_status === 'available' 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {food.food_status === 'available' && <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>}
                        {food.food_status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="pr-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openUpdateModal(food)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors tooltip tooltip-left"
                          data-tip="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(food._id)}
                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors tooltip tooltip-left"
                          data-tip="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modern Modal */}
      <dialog id="update_food_modal" className="modal backdrop-blur-sm">
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-2xl bg-white rounded-3xl p-8 shadow-2xl relative"
          onSubmit={handleUpdate}
        >
          {/* Close Button */}
          <button 
            type="button" 
            onClick={() => document.getElementById("update_food_modal").close()}
            className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Edit2 className="text-[#16a34a]" /> Update Food Listing
          </h3>

          {selectedFood && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="form-control">
                <label className="label font-semibold text-gray-600">Food Name</label>
                <input
                  name="food_name"
                  defaultValue={selectedFood.food_name}
                  required
                  className="input input-bordered rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-600">Food Image URL</label>
                <input
                  name="food_image"
                  defaultValue={selectedFood.food_image}
                  required
                  className="input input-bordered rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-600">Quantity</label>
                <input
                  name="food_quantity"
                  defaultValue={selectedFood.food_quantity}
                  required
                  className="input input-bordered rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-600">Pickup Location</label>
                <input
                  name="pickup_location"
                  defaultValue={selectedFood.pickup_location}
                  required
                  className="input input-bordered rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-600">Expire Date</label>
                <input
                  type="date"
                  name="expire_date"
                  defaultValue={selectedFood.expire_date}
                  required
                  className="input input-bordered rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label font-semibold text-gray-600">Additional Notes</label>
                <textarea
                  name="additional_notes"
                  defaultValue={selectedFood.additional_notes}
                  className="textarea textarea-bordered h-24 rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0"
                ></textarea>
              </div>

            </div>
          )}

          <div className="modal-action mt-8">
            <button
              type="submit"
              className="btn bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl px-8 w-full md:w-auto"
            >
              Save Changes
            </button>
          </div>
        </form>
      </dialog>
      
    </div>
  );
};

export default ManageMyFoods;