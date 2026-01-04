import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ManageMyFoods = () => {
  const { user, loading } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null); // 👈 For modal
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
      text: "This food will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await fetch(`https://plate-share-server-eight.vercel.app/foods/${id}`, {
        method: "DELETE",
      });

      Swal.fire("Deleted!", "Food has been deleted.", "success");

      setFoods(foods.filter((food) => food._id !== id));
    }
  };

  // OPEN MODAL
  const openUpdateModal = (food) => {
    setSelectedFood(food);
    document.getElementById("update_food_modal").showModal();
  };

  // UPDATE HANDLER
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
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#16a34a] mb-8">
          📝 Manage My Foods
        </h2>

        {foods.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't added any foods yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Quantity</th>
                  <th>Pickup</th>
                  <th>Expire</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {foods.map((food) => (
                  <tr key={food._id}>
                    <td className="flex items-center gap-3">
                      <img
                        src={food.food_image}
                        className="w-14 h-14 rounded"
                      />
                      <span>{food.food_name}</span>
                    </td>
                    <td>{food.food_quantity}</td>
                    <td>{food.pickup_location}</td>
                    <td>{food.expire_date}</td>
                    <td>{food.food_status}</td>

                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm bg-[#16a34a] hover:bg-[#076128ff] text-white"
                        onClick={() => openUpdateModal(food)}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-sm bg-red-500 text-white"
                        onClick={() => handleDelete(food._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* UPDATE MODAL */}
      <dialog id="update_food_modal" className="modal">
        <form
          method="dialog"
          className="modal-box max-w-lg"
          onSubmit={handleUpdate}
        >
          <h3 className="text-xl font-bold text-[#16a34a] mb-4">
            Update Food Details
          </h3>

          {selectedFood && (
            <>
              <label className="label">Food Name</label>
              <input
                name="food_name"
                defaultValue={selectedFood.food_name}
                required
                className="input input-bordered w-full"
              />

              <label className="label">Food Image URL</label>
              <input
                name="food_image"
                defaultValue={selectedFood.food_image}
                required
                className="input input-bordered w-full"
              />

              <label className="label">Quantity</label>
              <input
                name="food_quantity"
                defaultValue={selectedFood.food_quantity}
                required
                className="input input-bordered w-full"
              />

              <label className="label">Pickup Location</label>
              <input
                name="pickup_location"
                defaultValue={selectedFood.pickup_location}
                required
                className="input input-bordered w-full"
              />

              <label className="label">Expire Date</label>
              <input
                type="date"
                name="expire_date"
                defaultValue={selectedFood.expire_date}
                required
                className="input input-bordered w-full"
              />

              <label className="label">Additional Notes</label>
              <textarea
                name="additional_notes"
                defaultValue={selectedFood.additional_notes}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </>
          )}

          <div className="modal-action">
            <button
              className="btn bg-red-500 text-white"
              type="button"
              onClick={() =>
                document.getElementById("update_food_modal").close()
              }
            >
              Close
            </button>
            <button
              className="btn bg-[#16a34a] hover:bg-[#076128ff] text-white"
              type="submit"
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
