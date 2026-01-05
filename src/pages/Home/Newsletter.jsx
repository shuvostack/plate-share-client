import React from "react";
import { Send, Bell, Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-24 px-6 bg-gray-50 flex justify-center items-center relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-6xl bg-[#0f172a] rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
        
        {/* Glow Effect inside Card */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#16a34a] rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-600 rounded-full blur-[100px] opacity-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[#4ade80] text-sm font-medium border border-white/10 backdrop-blur-sm">
              <Bell size={16} />
              <span>Weekly Updates</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Don't Miss Out on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-emerald-400">
                Fighting Hunger
              </span>
            </h2>
            
            <p className="text-gray-400 text-lg max-w-md mx-auto lg:mx-0">
              Join 15,000+ community members. Get alerts on new food listings, success stories, and zero-waste tips directly to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:bg-white/10 transition-all"
                />
              </div>
              <button className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)]">
                Subscribe <Send size={18} />
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              *We value your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Right */}
          <div className="lg:w-1/2 relative flex justify-center">
  
            <div className="relative w-80 h-96">
                <div className="absolute inset-0 bg-white/5 rounded-3xl transform rotate-6 border border-white/10"></div>
                <div className="absolute inset-0 bg-white/5 rounded-3xl transform -rotate-6 border border-white/10"></div>
                
                {/* Main Image Container */}
                <div className="absolute inset-0 bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-500">
                    <img 
                        src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1632&auto=format&fit=crop" 
                        alt="Healthy Food" 
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#16a34a] p-2 rounded-full">
                                <Send size={16} className="text-white" />
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">New Donation Alert!</p>
                                <p className="text-gray-300 text-xs">Just now • 2km away</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;