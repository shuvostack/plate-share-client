import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { 
  CalendarDays, MapPin, PackageOpen, UserRound, ArrowLeft, HeartHandshake, 
  Share2, CheckCircle, XCircle 
} from "lucide-react";
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
        <h2 className="text-2xl font-bold text-red-500 mb-4">Food item not found!</h2>
        <button
          onClick={() => navigate(-1)}
          className="btn bg-gray-800 text-white rounded-full px-8"
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

  // Request Submit Handler
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
      requesterImage: user.photoURL,
      donator_email,
      donator_name,
      donator_image,
      contactNumber: form.contact.value,
      whyNeed: form.why.value,
      status: "pending",
      requestDate: new Date().toISOString()
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
            title: "Request Sent!",
            text: "Your request is pending approval.",
            icon: "success",
            confirmButtonColor: "#16a34a"
          });
          setModal(false);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Hero Image */}
      <div className="relative h-[400px] w-full">
        <img 
          src={food_image} 
          alt={food_name} 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute top-6 left-6 z-50">
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-circle bg-white/20 backdrop-blur-md border-none text-white hover:bg-white/40"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-24 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Title Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                   <h1 className="text-4xl font-bold text-gray-800 mb-2">{food_name}</h1>
                   <div className="flex items-center gap-4 text-gray-500">
                      <span className="flex items-center gap-1"><MapPin size={16} className="text-[#16a34a]"/> {pickup_location}</span>
                      <span className="flex items-center gap-1"><CalendarDays size={16} className="text-orange-500"/> Exp: {expire_date}</span>
                   </div>
                </div>
                <span className={`px-4 py-2 rounded-full font-bold uppercase text-sm tracking-wide ${
                  food_status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {food_status}
                </span>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-[#16a34a] pl-3">Overview</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{additional_notes}</p>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                 <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <PackageOpen className="mx-auto text-[#16a34a] mb-2" size={24}/>
                    <p className="text-sm text-gray-500 font-bold uppercase">Quantity</p>
                    <p className="text-lg font-bold text-gray-800">{food_quantity}</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <UserRound className="mx-auto text-blue-500 mb-2" size={24}/>
                    <p className="text-sm text-gray-500 font-bold uppercase">Donor Type</p>
                    <p className="text-lg font-bold text-gray-800">Individual</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <Share2 className="mx-auto text-purple-500 mb-2" size={24}/>
                    <p className="text-sm text-gray-500 font-bold uppercase">Share</p>
                    <p className="text-lg font-bold text-gray-800">Public</p>
                 </div>
              </div>
            </div>

            {/* Requests Table */}
            {user?.email === donator_email && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <HeartHandshake className="text-[#16a34a]" /> Manage Requests
                </h3>
                <FoodRequestsTable foodId={id} setFood={setFood} />
              </div>
            )}

          </div>

          {/* Right */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Donor Profile */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-green-50 to-green-100"></div>
               <div className="relative z-10">
                  <img 
                    src={donator_image} 
                    alt={donator_name} 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-800">{donator_name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{donator_email}</p>
                  
                  <div className="divider text-xs text-gray-400 font-bold">CONTACT INFO</div>
                  
                  <button 
                    onClick={() => setModal(true)}
                    disabled={food_status !== "Available" || user?.email === donator_email}
                    className="btn bg-[#16a34a] hover:bg-[#15803d] text-white w-full rounded-xl h-12 text-lg shadow-lg shadow-green-200"
                  >
                    {food_status === "Available" ? "Request This Food" : "Unavailable"}
                  </button>
                  
                  {user?.email === donator_email && (
                    <p className="text-red-500 text-xs mt-3 font-bold">You cannot request your own food.</p>
                  )}
               </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
               <h4 className="font-bold text-blue-800 mb-2">Safety First! 🛡️</h4>
               <p className="text-sm text-blue-600">
                 Always meet in a public place. Check food freshness before consuming.
               </p>
            </div>

          </div>

        </div>
      </div>

      {/* Modal */}
      {modal && (
        <dialog open className="modal backdrop-blur-sm bg-black/30">
          <div className="modal-box bg-white rounded-3xl p-8 max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
              Request Food
            </h3>

            <form onSubmit={handleRequestSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label font-bold text-gray-600">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18}/>
                  <input
                    type="text"
                    name="location"
                    defaultValue={pickup_location} 
                    className="input input-bordered w-full pl-10 rounded-xl bg-gray-50"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-gray-600">Why do you need this?</label>
                <textarea
                  name="why"
                  rows="3"
                  className="textarea textarea-bordered w-full rounded-xl bg-gray-50"
                  placeholder="Briefly explain..."
                  required
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label font-bold text-gray-600">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  className="input input-bordered w-full rounded-xl bg-gray-50"
                  placeholder="+880 1..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn bg-[#16a34a] hover:bg-[#15803d] text-white w-full rounded-xl mt-4"
              >
                Confirm Request
              </button>
            </form>

            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
              onClick={() => setModal(false)}
            >
              ✕
            </button>
          </div>
        </dialog>
      )}

    </div>
  );
};

// Food Requests Table
const FoodRequestsTable = ({ foodId, setFood }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`https://plate-share-server-eight.vercel.app/requests/${foodId}`)
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, [foodId]);

  const handleAcceptRequest = (requestId) => {
    fetch(`https://plate-share-server-eight.vercel.app/requests/accept/${requestId}`, { method: "PATCH" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Accepted!", "Food marked as donated.", "success");
          setRequests((prev) => prev.map((r) => r._id === requestId ? { ...r, status: "accepted" } : r));
          setFood((prev) => ({ ...prev, food_status: "Donated" }));
        }
      });
  };

  const handleRejectRequest = (requestId) => {
    fetch(`https://plate-share-server-eight.vercel.app/requests/reject/${requestId}`, { method: "PATCH" })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Rejected!", "Request rejected.", "info");
          setRequests((prev) => prev.map((r) => r._id === requestId ? { ...r, status: "rejected" } : r));
        }
      });
  };

  if (requests.length === 0) return <p className="text-gray-500 italic">No requests received yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
          <tr>
            <th>Requester</th>
            <th>Notes</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="hover:bg-gray-50">
              <td>
                <div className="flex items-center gap-3">
                  <img src={req.requesterImage} alt="User" className="w-10 h-10 rounded-full border" />
                  <div>
                    <div className="font-bold text-gray-800">{req.requesterName}</div>
                    <div className="text-xs text-gray-500">{req.requesterEmail}</div>
                  </div>
                </div>
              </td>
              <td className="max-w-xs truncate text-gray-600" title={req.whyNeed}>{req.whyNeed}</td>
              <td className="font-mono text-gray-600">{req.contactNumber}</td>
              <td>
                <span className={`badge border-none font-bold text-white ${
                  req.status === 'accepted' ? 'bg-green-500' : req.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                }`}>
                  {req.status}
                </span>
              </td>
              <td className="flex gap-2">
                {req.status === 'pending' && (
                  <>
                    <button onClick={() => handleAcceptRequest(req._id)} className="btn btn-xs bg-green-100 text-green-700 hover:bg-green-200 border-none"><CheckCircle size={14}/> Accept</button>
                    <button onClick={() => handleRejectRequest(req._id)} className="btn btn-xs bg-red-100 text-red-700 hover:bg-red-200 border-none"><XCircle size={14}/> Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodDetails;