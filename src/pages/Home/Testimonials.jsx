import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Top Donor",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      review: "PlateShare has made it incredibly easy for my restaurant to donate surplus food. Instead of throwing it away, we now feed 50+ people weekly. The process is seamless!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Community Volunteer",
      image: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      review: "I love the transparency of this platform. Seeing the 'Meals Saved' counter go up motivates me to collect food from donors and distribute it. Great initiative!",
    },
    {
      id: 3,
      name: "Emily Roberts",
      role: "Receiver",
      image: "https://i.pravatar.cc/150?img=9",
      rating: 4,
      review: "As a student living on a tight budget, PlateShare has been a lifesaver. The food is always fresh, and the donors are so kind and respectful. Thank you!",
    },
    {
      id: 4,
      name: "David Miller",
      role: "Event Planner",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      review: "After our corporate events, we used to have so much leftover catering. Now, within minutes of posting, someone claims it. No more guilt over food waste.",
    },
    {
      id: 5,
      name: "Aisha Khan",
      role: "Homemaker",
      image: "https://i.pravatar.cc/150?img=24",
      rating: 5,
      review: "Sharing homemade food with neighbors has brought our community closer. The app is very user-friendly and safe to use.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute right-0 top-0 w-96 h-96 bg-[#16a34a] rounded-full blur-[150px]"></div>
         <div className="absolute left-0 bottom-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-3">
             <div className="flex text-yellow-400 text-lg">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
             </div>
             <span className="text-gray-600 font-semibold">(4.9/5 Rating)</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Voices of our <span className="text-[#16a34a]">Community</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Real stories from people who are making a difference. Join thousands of users who are changing the way we share food.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper !pb-14"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col relative group">
                
                <FaQuoteLeft className="absolute top-6 right-6 text-6xl text-gray-100 group-hover:text-green-50 transition-colors duration-300" />
                
                {/* User Info */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="relative">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-16 h-16 rounded-full object-cover border-4 border-green-50"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#16a34a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      VERIFIED
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{review.name}</h3>
                    <p className="text-sm text-[#16a34a] font-medium">{review.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 text-yellow-400 mb-4 text-sm">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 leading-relaxed flex-grow italic relative z-10">
                  "{review.review}"
                </p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Testimonials;