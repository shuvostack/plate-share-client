import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin, Calendar, User, Clock, XCircle, ShoppingBag } from "lucide-react";

const MyFoodRequests = () => {
  const { user, loading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      offset: 50,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user?.email) {
      setFetching(true);
      fetch(`https://plate-share-server-eight.vercel.app/my-requests/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
          setFetching(false);
        })
        .catch((error) => {
          console.log(error);
          setFetching(false);
        });
    }
  }, [user?.email]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Request?",
      text: "Are you sure you want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
      background: "#fff",
      customClass: {
        popup: "rounded-2xl",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://plate-share-server-eight.vercel.app/requests/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                 title: "Cancelled!",
                 text: "Your request has been removed.",
                 icon: "success",
                 confirmButtonColor: "#16a34a",
              });
              setRequests(requests.filter((item) => item._id !== id));
            }
          });
      }
    });
  };

  if (loading || fetching) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            My Food <span className="text-[#16a34a]">Requests</span>
          </h2>
          <p className="text-gray-500 mt-1">
            Track the status of your requested meals here.
          </p>
        </div>
        <div className="bg-green-50 text-[#16a34a] px-4 py-2 rounded-full font-bold text-sm">
           Total Requests: {requests.length}
        </div>
      </div>

      {/* Content Grid */}
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
           <div className="bg-gray-50 p-6 rounded-full mb-4">
              <ShoppingBag size={48} className="text-gray-300" />
           </div>
           <h3 className="text-xl font-bold text-gray-700">No Requests Found</h3>
           <p className="text-gray-500 mt-2">Browse available foods and make a request.</p>
           <button 
             onClick={() => navigate('/available-foods')}
             className="mt-6 btn bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl px-8"
           >
             Browse Foods
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              data-aos="fade-up"
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={req.food_image}
                  alt={req.food_name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md ${
                      req.status === "available"
                        ? "bg-yellow-500/80 text-white"
                        : req.status === "delivered"
                        ? "bg-green-500/80 text-white"
                        : "bg-gray-500/80 text-white"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                
                {/* Request Date */}
                <div className="absolute bottom-4 left-4 text-white flex items-center gap-2 text-xs font-medium">
                   <Clock size={14} /> 
                   <span>Requested recently</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#16a34a] transition-colors">
                  {req.food_name}
                </h3>

                <div className="space-y-3 mb-6">
                   <div className="flex items-start gap-3 text-sm text-gray-600">
                      <MapPin size={16} className="text-[#16a34a] mt-0.5" />
                      <span className="flex-1">{req.pickup_location}</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Calendar size={16} className="text-orange-500" />
                      <span>Expires: {req.expire_date}</span>
                   </div>
                </div>

                {/* Donator Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                   <img 
                     src={req.donator_image || "https://i.ibb.co/tZ22d4h/user-placeholder.png"} 
                     alt="Donator" 
                     className="w-10 h-10 rounded-full border border-gray-200"
                   />
                   <div className="flex-1 overflow-hidden">
                      <p className="text-xs text-gray-400 font-bold uppercase">Donated By</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{req.donator_name}</p>
                   </div>
                </div>
                
                {/* Cancel Button */}
                <button
                  onClick={() => handleCancel(req._id)}
                  className="w-full mt-6 py-3 rounded-xl border border-red-100 bg-red-50 text-red-600 font-bold text-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <XCircle size={18} /> Cancel Request
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