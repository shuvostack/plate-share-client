import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import Swal from "sweetalert2";
import { 
  User, Mail, Phone, MapPin, Camera, Edit2, Save, X, Calendar, ShieldCheck 
} from "lucide-react";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
    phone: "",
    address: "",
    bio: "Food enthusiast & community helper. 🌱",
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        phone: user.phoneNumber || "+880 1XXXXX", 
        address: "Dhaka, Bangladesh", 
        bio: "Food enthusiast & community helper.",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      await auth.currentUser.reload();
      
      setLoading(false);
      setIsEditing(false);

      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile information has been updated.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      if(setUser){
        setUser({ ...auth.currentUser });
      }

    } catch (error) {
      console.error("Update Error:", error); 
      setLoading(false);
      
      Swal.fire({
        icon: "error",
        title: "Failed to update",
        text: error.message, 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      
      {/* Cover */}
      <div className="h-60 w-full relative bg-gradient-to-r from-[#16a34a] to-emerald-800 rounded-b-[3rem] shadow-lg overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
         </div>
      </div>

      {/* Profile Card */}
      <div className="container mx-auto px-4 -mt-24 relative z-10 max-w-5xl">
        
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* header*/}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between p-8 pb-0 gap-6">
            
            {/* Avatar */}
            <div className="relative group">
               <div className="w-40 h-40 rounded-full border-[6px] border-white shadow-md overflow-hidden bg-gray-100">
                 <img 
                   src={formData.photoURL || "https://i.ibb.co/tZ22d4h/user-placeholder.png"} 
                   alt="Profile" 
                   className="w-full h-full object-cover"
                 />
               </div>
               {isEditing && (
                 <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white cursor-pointer border-[6px] border-transparent">
                   <Camera size={32} />
                 </div>
               )}
            </div>

            {/* name and role */}
            <div className="flex-1 text-center md:text-left mb-4 md:mb-8">
               <h1 className="text-3xl font-bold text-gray-800">
                 {user?.displayName}
               </h1>
               <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mt-1">
                 <Mail size={16} />
                 <span>{user?.email}</span>
                 <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
                   <ShieldCheck size={12}/> Verified
                 </span>
               </div>
            </div>

            {/* edit btn */}
            <div className="mb-8">
               {!isEditing ? (
                 <button 
                   onClick={() => setIsEditing(true)}
                   className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 border-none rounded-xl gap-2 px-6 shadow-sm"
                 >
                   <Edit2 size={18} /> Edit Profile
                 </button>
               ) : (
                 <div className="flex gap-3">
                   <button 
                     onClick={() => setIsEditing(false)}
                     className="btn bg-red-50 text-red-500 hover:bg-red-100 border-none rounded-xl"
                   >
                     <X size={20} /> Cancel
                   </button>
                   <button 
                     onClick={handleSaveProfile}
                     className="btn bg-[#16a34a] hover:bg-[#15803d] text-white border-none rounded-xl gap-2 shadow-lg shadow-green-200"
                   >
                     {loading ? <span className="loading loading-spinner loading-sm"></span> : <Save size={18} />}
                     Save Changes
                   </button>
                 </div>
               )}
            </div>
          </div>

          <div className="divider my-0"></div>

          {/* Details */}
          <div className="p-8 md:p-12">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Left */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <User className="text-[#16a34a]" /> Personal Information
                </h3>
                
                {/* Name */}
                <div className="form-control">
                  <label className="label text-gray-500 font-semibold text-sm">Full Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="displayName"
                      value={formData.displayName} 
                      onChange={handleChange}
                      className="input input-bordered w-full rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0" 
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-2">{formData.displayName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label text-gray-500 font-semibold text-sm">Email Address</label>
                  <p className="text-lg font-medium text-gray-400 border-b border-gray-100 pb-2 cursor-not-allowed">
                    {user?.email}
                  </p>
                </div>

                {/* Photo URL */}
                {isEditing && (
                   <div className="form-control">
                    <label className="label text-gray-500 font-semibold text-sm">Photo URL</label>
                    <input 
                      type="text" 
                      name="photoURL"
                      value={formData.photoURL} 
                      onChange={handleChange}
                      className="input input-bordered w-full rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0" 
                    />
                  </div>
                )}
              </div>

              {/* Right */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <MapPin className="text-[#16a34a]" /> Contact & Address
                </h3>

                {/* Phone */}
                <div className="form-control">
                  <label className="label text-gray-500 font-semibold text-sm">Phone Number</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone} 
                      onChange={handleChange}
                      className="input input-bordered w-full rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0" 
                    />
                  ) : (
                     <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                        <Phone size={18} className="text-gray-400"/>
                        <p className="text-lg font-medium text-gray-800">{formData.phone}</p>
                     </div>
                  )}
                </div>

                {/* Address */}
                <div className="form-control">
                  <label className="label text-gray-500 font-semibold text-sm">Address</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address} 
                      onChange={handleChange}
                      className="input input-bordered w-full rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0" 
                    />
                  ) : (
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                       <MapPin size={18} className="text-gray-400"/>
                       <p className="text-lg font-medium text-gray-800">{formData.address}</p>
                    </div>
                  )}
                </div>

                 {/* Bio */}
                 <div className="form-control">
                  <label className="label text-gray-500 font-semibold text-sm">Bio / About</label>
                  {isEditing ? (
                    <textarea 
                      name="bio"
                      value={formData.bio} 
                      onChange={handleChange}
                      className="textarea textarea-bordered w-full rounded-xl bg-gray-50 focus:border-[#16a34a] focus:ring-0 h-24" 
                    ></textarea>
                  ) : (
                    <p className="text-gray-600 italic bg-gray-50 p-4 rounded-xl border border-gray-100">
                      "{formData.bio}"
                    </p>
                  )}
                </div>

                {/* joining date */}
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-400 justify-end">
                   <Calendar size={14} />
                   <span>Joined: {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toDateString() : "N/A"}</span>
                </div>

              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;