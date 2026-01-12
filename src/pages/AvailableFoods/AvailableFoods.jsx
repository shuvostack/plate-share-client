import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import { 
  CalendarDays, MapPin, PackageOpen, Search, Filter, 
  Grid, List, Utensils, ArrowRight, ChevronLeft, ChevronRight 
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 

  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", offset: 50, once: true });
  }, []);

  useEffect(() => {
    fetch("https://plate-share-server-eight.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        const available = data.filter(item => item.food_status === 'Available' || item.food_status === 'available');
        setFoods(available);
        setFilteredFoods(available);
      })
      .catch((error) => console.log(error));
  }, []);

  // Handle Search, Sort and Reset Page
  useEffect(() => {
    let result = [...foods];

    if (search) {
      result = result.filter(item => 
        item.food_name.toLowerCase().includes(search.toLowerCase()) ||
        item.pickup_location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "expire") {
      result.sort((a, b) => new Date(a.expire_date) - new Date(b.expire_date));
    } else if (sort === "quantity") {
      result.sort((a, b) => parseInt(b.food_quantity) - parseInt(a.food_quantity));
    }

    setFilteredFoods(result);
    setCurrentPage(1); 
  }, [search, sort, foods]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              Available <span className="text-[#16a34a]">Foods</span>
            </h2>
            <p className="text-gray-500 max-w-lg">
              Browse fresh meals shared by our community. Showing page {currentPage} of {totalPages}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search food or location..." 
                className="input input-bordered pl-10 w-full sm:w-64 rounded-xl focus:outline-none focus:border-[#16a34a]"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select 
                className="select select-bordered pl-10 w-full sm:w-48 rounded-xl focus:outline-none focus:border-[#16a34a]"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sort By</option>
                <option value="expire">Expire Date (Soonest)</option>
                <option value="quantity">Quantity (High to Low)</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="hidden md:flex bg-white rounded-xl border border-gray-200 p-1">
               <button 
                 onClick={() => setView("grid")}
                 className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-gray-100 text-[#16a34a]" : "text-gray-400"}`}
               >
                 <Grid size={20} />
               </button>
               <button 
                 onClick={() => setView("list")}
                 className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-gray-100 text-[#16a34a]" : "text-gray-400"}`}
               >
                 <List size={20} />
               </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {currentFoods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="bg-green-50 p-6 rounded-full mb-4">
               <Utensils size={48} className="text-[#16a34a]" />
            </div>
            <h3 className="text-xl font-bold text-gray-700">No matching foods found</h3>
            <button 
              onClick={() => {setSearch(""); setSort("default")}}
              className="mt-6 btn btn-outline border-[#16a34a] text-[#16a34a] hover:bg-[#16a34a] hover:text-white rounded-xl px-8"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Foods Grid */}
            <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
              {currentFoods.map((food) => (
                <div
                  key={food._id}
                  data-aos="fade-up"
                  className={`group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${view === "list" ? "flex flex-col md:flex-row" : ""}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${view === "list" ? "md:w-1/3 h-48 md:h-auto" : "h-56"}`}>
                    <img
                      src={food.food_image}
                      alt={food.food_name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-700 flex items-center gap-1 shadow-sm">
                      <CalendarDays size={14} className="text-orange-500" />
                      {new Date(food.expire_date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Body */}
                  <div className={`p-6 flex flex-col ${view === "list" ? "md:w-2/3 justify-between" : ""}`}>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#16a34a] transition-colors line-clamp-1">
                        {food.food_name}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <PackageOpen size={16} className="text-[#16a34a]" />
                          <span className="font-medium">Quantity:</span> {food.food_quantity}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} className="text-[#16a34a]" />
                          <span className="truncate">{food.pickup_location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                      <div className="flex items-center gap-3">
                        <img
                          src={food.donator_image || "https://i.ibb.co/tZ22d4h/user-placeholder.png"}
                          alt={food.donator_name}
                          className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                        />
                        <div className="hidden sm:block">
                          <p className="text-xs text-gray-400 font-bold uppercase">By</p>
                          <p className="text-sm font-bold text-gray-700 truncate w-20">{food.donator_name}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => user ? navigate(`/foods/${food._id}`) : navigate("/login")}
                        className="btn btn-sm bg-[#16a34a] hover:bg-[#15803d] text-white rounded-lg px-4 gap-2"
                      >
                        View <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                
                {/* previous btn */}
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-circle btn-outline border-gray-300 hover:bg-[#16a34a] hover:border-[#16a34a] hover:text-white disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* page numbers */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`btn btn-circle ${
                        currentPage === number 
                          ? "bg-[#16a34a] text-white border-[#16a34a] hover:bg-[#15803d]" 
                          : "btn-ghost bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                {/* next btn */}
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-circle btn-outline border-gray-300 hover:bg-[#16a34a] hover:border-[#16a34a] hover:text-white disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
                
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default AvailableFoods;