import React from "react";
import { ShieldCheck, Clock, MapPin, HeartHandshake } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why <span className="text-[#16a34a]">PlateShare</span>?
          </h2>
          <p className="text-gray-500 text-lg">
            We are more than just a food sharing app. We are a movement building a sustainable, hunger-free future with technology and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Card 1 */}
          <div className="md:col-span-2 bg-white rounded-3xl p-10 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-green-100"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-green-100 text-[#16a34a] rounded-xl flex items-center justify-center mb-6">
                  <HeartHandshake size={28} />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">Community First Approach</h3>
                <p className="text-gray-500 text-lg max-w-md">
                  We verify every donor and receiver to ensure a safe, respectful, and trusted environment for sharing meals.
                </p>
              </div>
              
              <div className="flex -space-x-4 mt-6">
                {[1,2,3,4].map((i) => (
                   <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-12 h-12 rounded-full border-4 border-white" />
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                  +2k
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#16a34a] rounded-3xl p-10 shadow-lg text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
             <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
               <Clock size={200} />
             </div>
             
             <div className="relative z-10">
               <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                 <Clock size={28} className="text-white" />
               </div>
               <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
               <p className="text-green-100">
                 Post a meal in under 30 seconds. Our real-time alerts ensure food is claimed before it gets cold.
               </p>
             </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center group hover:border-[#16a34a] transition-all duration-300">
             <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <MapPin size={24} />
             </div>
             <h3 className="text-xl font-bold text-gray-800 mb-2">Hyper-Local</h3>
             <p className="text-gray-500">
               Find food within walking distance. We prioritize donations near you to reduce carbon footprint.
             </p>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-2 bg-gray-900 rounded-3xl p-10 shadow-xl relative overflow-hidden flex items-center group">
             <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800"></div>
             
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
               <div className="flex-1">
                 <div className="w-12 h-12 bg-gray-700 text-[#4ade80] rounded-xl flex items-center justify-center mb-6">
                   <ShieldCheck size={28} />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-3">100% Secure & Private</h3>
                 <p className="text-gray-400">
                   We never share your personal address publicly. Pickup locations are shared only after you approve a request.
                 </p>
               </div>
               
               {/* Badge */}
               <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 transform rotate-3 group-hover:rotate-0 transition-transform">
                 <div className="flex items-center gap-3">
                   <div className="bg-[#16a34a] rounded-full p-1"><ShieldCheck size={16} className="text-white"/></div>
                   <span className="text-white font-bold text-sm">Verified Donor</span>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;