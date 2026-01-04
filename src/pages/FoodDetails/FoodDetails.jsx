import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { CalendarDays, MapPin, PackageOpen, UserRound } from "lucide-react";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch(`https://plate-share-server-eight.vercel.app/foods/${id}`)
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

  if (loading || dataLoading) {
    return <LoadingSpinner />;
  }

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

  const handleFoodRequest = () => {
    if (!user) {
      return navigate("/login");
    }

    if (user.email === donator_email) {
      return Swal.fire({
        icon: "error",
        title: "You cannot request your own food!",
      });
    }

    const requestData = {
      foodId: id,
      food_name,
      food_image,
      donator_name,
      donator_email,
      requesterEmail: user.email,
      requesterName: user.displayName,
      requesterImage: user.photoURL,
      pickup_location,
      expire_date,
      status: "pending",
    };

    fetch("https://plate-share-server-eight.vercel.app/requests", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Request Sent!",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed to send request!",
        });
      });
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const requestData = {
      foodId: id,
      food_name,
      food_image,
      pickup_location,
      expire_date,
      requesterEmail: user.email,
      requesterName: user.displayName,
      requestPhoto: user.photoURL,
      donator_email,
      donator_name,
      donator_image,
      contactNumber: form.contact.value,
      whyNeed: form.why.value,
      status: "pending",
    };

    fetch("https://plate-share-server-eight.vercel.app/requests", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire(
            "Request Sent!",
            "Your request is pending approval.",
            "success"
          );
          setModal(false);
        }
      });
  };

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
        <figure className="lg:w-1/2 h-96">
          <img
            src={food_image}
            alt={food_name}
            className="w-full h-full object-cover"
          />
        </figure>

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

          <div className="mt-6">
            <button
              className="btn bg-[#16a34a] text-white w-full"
              onClick={() => setModal(true)}
              disabled={food_status !== "Available"}
            >
              {food_status === "Available"
                ? "Request This Food"
                : "Already Donated"}
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate(-1)}
          className="btn bg-[#16a34a] hover:bg-[#076128ff] text-white btn-sm "
        >
          ← Go Back
        </button>
      </div>

      {user?.email === donator_email && (
        <div className="mt-12">
          <h2 className="text-4xl text-center font-bold text-[#16a34a] mb-4">
            Food Requests
          </h2>

          <FoodRequestsTable foodId={id} setFood={setFood} />
        </div>
      )}

      {modal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="text-xl text-[#16a34a] font-bold mb-3">
              Request This Food
            </h3>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="font-semibold">Write Location</label>
                <input
                  type="text"
                  name="location"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="font-semibold">Why Need Food</label>
                <textarea
                  name="why"
                  rows="3"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              <div>
                <label className="font-semibold">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              
            </form>
            <button
                onClick={handleFoodRequest}
                className="btn  bg-[#16a34a] hover:bg-[#076128ff] text-white w-full mt-3"
              >
                Submit Request
              </button>

            <div className="modal-action">
              <button
                className="btn bg-red-500 text-white"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

const FoodRequestsTable = ({ foodId, setFood }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`https://plate-share-server-eight.vercel.app/requests/${foodId}`)
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, [foodId]);

  //     Swal.fire({
  //       title: `Are you sure to ${status}?`,
  //       icon: "warning",
  //       showCancelButton: true,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         fetch(`https://plate-share-server-eight.vercel.app/requests/update/${id}`, {
  //           method: "PATCH",
  //           headers: { "content-type": "application/json" },
  //           body: JSON.stringify({ status }),
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             if (data.modifiedCount > 0) {
  //               Swal.fire("Updated!", `Request ${status}.`, "success");

  //               setRequests((prev) =>
  //                 prev.map((req) =>
  //                   req._id === id ? { ...req, status } : req
  //                 )
  //               );

  //               if (status === "accepted") {
  //                 fetch(`https://plate-share-server-eight.vercel.app/foods/status/${foodId}`, {
  //                   method: "PATCH",
  //                   headers: { "content-type": "application/json" },
  //                   body: JSON.stringify({ food_status: "donated" }),
  //                 });
  //               }
  //             }
  //           });
  //       }
  //     });
  //   };

  const handleAcceptRequest = (requestId) => {
  fetch(
    `https://plate-share-server-eight.vercel.app/requests/accept/${requestId}`,
    { method: "PATCH" }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        Swal.fire(
          "Accepted!",
          "Request accepted & food marked as donated.",
          "success"
        );
        setRequests((prev) =>
          prev.map((r) =>
            r._id === requestId ? { ...r, status: "accepted" } : r
          )
        );
        setFood((prev) => ({ ...prev, food_status: "Donated" }));
      } else {
        Swal.fire("Error!", data.message, "error");
      }
    })
    .catch(() =>
      Swal.fire("Error!", "Something went wrong. Please try again.", "error")
    );
};


  const handleRejectRequest = (requestId) => {
    fetch(
      `https://plate-share-server-eight.vercel.app/requests/reject/${requestId}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Rejected!", "Request rejected.", "success");

          setRequests((prev) =>
            prev.map((r) =>
              r._id === requestId ? { ...r, status: "rejected" } : r
            )
          );
        }
      })
      .catch(() => Swal.fire("Error!", "Something went wrong.", "error"));
  };

  return (
    <div className="overflow-x-auto border shadow-xl rounded-xl">
      <table className="table">
        <thead className="bg-green-200">
          <tr>
            <th>Requester</th>
            <th>Location</th>
            <th>Why Need</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr className="" key={req._id}>
              <td>
                <div className="flex items-center gap-2">
                  <img
                    src={req.requesterImage}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{req.requesterName}</h4>
                    <p className="text-sm">{req.requesterEmail}</p>
                  </div>
                </div>
              </td>

              <td>{req.pickup_location}</td>
              <td>{req.whyNeed}</td>
              <td>{req.contactNumber}</td>

              <td>
                <span
                  className={`badge ${
                    req.status === "pending"
                      ? "badge-warning"
                      : req.status === "accepted"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {req.status}
                </span>
              </td>

              <td className="flex gap-2">
                <button
                  className="btn btn-success btn-sm"
                  disabled={req.status !== "pending"}
                  onClick={() => handleAcceptRequest(req._id)}
                >
                  Accept
                </button>

                <button
                  className="btn btn-error btn-sm"
                  disabled={req.status !== "pending"}
                  onClick={() => handleRejectRequest(req._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodDetails;
