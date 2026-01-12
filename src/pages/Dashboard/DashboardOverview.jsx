import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query"; 
import axios from "axios";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { FaBoxOpen, FaHandHoldingHeart, FaShoppingCart, FaArrowUp, FaCalendarAlt } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);

  const { data: myFoods = [], isLoading } = useQuery({
    queryKey: ['myFoods', user?.email], 
    queryFn: async () => {
      const { data } = await axios.get(`https://plate-share-server-eight.vercel.app/foods?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email, 
  });

  const totalFoods = myFoods.length;
  const availableFoods = myFoods.filter(food => food.status === 'available').length;
  const requestedFoods = myFoods.filter(food => food.status === 'requested').length;

  const chartData = [
    { name: 'Available', items: availableFoods },
    { name: 'Requested', items: requestedFoods },
    { name: 'Total', items: totalFoods },
  ];

  if (isLoading) {
    return (
      <LoadingSpinner></LoadingSpinner>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-[#0f172a] p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#16a34a] rounded-full blur-[100px] opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">
            Dashboard <span className="text-[#4ade80]">Overview</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Welcome back, {user?.displayName}! Here is your daily activity report.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
          <FaCalendarAlt className="text-[#4ade80]" />
          <span className="text-sm font-medium">{new Date().toDateString()}</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium text-sm">Total Foods Added</p>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">{totalFoods}</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
              <FaBoxOpen size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded-lg">
            <FaArrowUp size={12} /> <span>Added Food</span>
          </div>
        </div>

        {/* Available Foods Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium text-sm">Available Foods</p>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">{availableFoods}</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-2xl text-[#16a34a] group-hover:scale-110 transition-transform">
              <FaHandHoldingHeart size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-[#16a34a] bg-green-50 w-fit px-2 py-1 rounded-lg">
            <span className="font-semibold">Active Listings</span>
          </div>
        </div>

        {/* Requested Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium text-sm">Requested Items</p>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">{requestedFoods}</h3>
            </div>
            <div className="bg-purple-50 p-3 rounded-2xl text-purple-600 group-hover:scale-110 transition-transform">
              <FaShoppingCart size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-purple-600 bg-purple-50 w-fit px-2 py-1 rounded-lg">
             <span>Pending Requests</span>
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Bar Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Your Food Status</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none' }}
                  cursor={{fill: '#f3f4f6'}}
                />
                <Bar dataKey="items" fill="#16a34a" radius={[6, 6, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Impact Growth</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none' }} />
                <Area type="monotone" dataKey="items" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Dynamic Data Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Recent Food Posts</h3>
          <p className="text-gray-400 text-sm">Showing your latest 5 items</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="py-4 pl-8">Food Name</th>
                <th>Quantity</th>
                <th>Expire Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myFoods.slice(0, 5).map((food) => (
                <tr key={food._id} className="hover:bg-gray-50 transition-colors border-b border-gray-50">
                  <td className="pl-8 py-4 font-semibold text-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      {food.foodName}
                    </div>
                  </td>
                  <td className="text-gray-600">{food.foodQuantity} servings</td>
                  <td className="text-gray-500 text-sm">{food.expiredDateTime}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                      food.status === 'available' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    }`}>
                      {food.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {myFoods.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              You haven't added any food yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default DashboardOverview;