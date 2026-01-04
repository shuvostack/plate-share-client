import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const MyFoodRequests = () => {
  const { user, loading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      offset: 120,
    });
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://plate-share-server-eight.vercel.app/my-requests/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
          setFetching(false);
        })
        .catch((error) => console.log(error));
    }
  }, [user?.email]);

  if (loading || fetching) return <LoadingSpinner />;

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://plate-share-server-eight.vercel.app/requests/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Cancelled!",
                "Your request has been cancelled.",
                "success"
              );
              setRequests(requests.filter((item) => item._id !== id));
            }
          });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-10 w-10/12">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#16a34a]">
        My Food Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't requested any food yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              data-aos="fade-up"  
              className="card bg-base-100 shadow-xl rounded-xl"
            >
              <figure>
                <img
                  src={req.food_image}
                  alt={req.food_name}
                  className="h-48 w-full object-cover"
                />
              </figure>

              <div className="card-body space-y-2">
                <h3 className="text-xl font-bold">{req.food_name}</h3>

                <p className="text-gray-700">
                  <span className="font-semibold">Pickup:</span>{" "}
                  {req.pickup_location}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Expire:</span>{" "}
                  {req.expire_date}
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={req.donator_image}
                    className="w-10 h-10 rounded-full border"
                    alt=""
                  />
                  <div>
                    <p className="font-medium">{req.donator_name}</p>
                    <p className="text-sm text-gray-500">
                      {req.donator_email}
                    </p>
                  </div>
                </div>

                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`badge ${
                      req.status === "pending"
                        ? "badge-warning"
                        : req.status === "accepted"
                        ? "badge-success"
                        : req.status === "rejected"
                        ? "badge-error"
                        : ""
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                <button
                  className="btn bg-red-500 text-white btn-sm mt-3"
                  onClick={() => handleCancel(req._id)}
                >
                  Cancel Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFoodRequests;
