import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. Header Section with Background Pattern */}
      <div className="bg-[#0f172a] text-white py-24 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#16a34a] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-purple-600 rounded-full blur-[100px] opacity-20"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h5 className="text-[#16a34a] font-bold tracking-widest uppercase mb-3">Get in Touch</h5>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            We'd Love to Hear from You
          </h1>
          <p className="text-gray-300 text-lg">
            Have a question about donating food? Want to partner with us? 
            Or just want to say hello? Drop us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* 2. Main Content: Info Cards & Form */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 pb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Side: Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Card 1: Address */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-b-4 border-[#16a34a] group">
              <div className="w-14 h-14 bg-green-50 text-[#16a34a] rounded-full flex items-center justify-center text-2xl mb-4 group-hover:bg-[#16a34a] group-hover:text-white transition-colors duration-300">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our Office</h3>
              <p className="text-gray-600">
                123 Food Street, Banani <br /> Dhaka, Bangladesh
              </p>
            </div>

            {/* Card 2: Phone */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-b-4 border-purple-500 group">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <FaPhoneAlt />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Phone Number</h3>
              <p className="text-gray-600 mb-1">+880 123 456 7890</p>
              <p className="text-gray-600">+880 987 654 3210</p>
            </div>

            {/* Card 3: Email */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-b-4 border-orange-400 group">
              <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-1">support@plateshare.com</p>
              <p className="text-gray-600">info@plateshare.com</p>
            </div>

          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
            {/* Background Decoration inside form */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-bl-full -z-0"></div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-8 relative z-10">Send a Message</h2>
            
            <form className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="form-control">
                  <label className="label text-gray-600 font-medium">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="input input-bordered w-full focus:outline-none focus:border-[#16a34a] bg-gray-50 rounded-xl py-6" 
                  />
                </div>
                {/* Email */}
                <div className="form-control">
                  <label className="label text-gray-600 font-medium">Your Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="input input-bordered w-full focus:outline-none focus:border-[#16a34a] bg-gray-50 rounded-xl py-6" 
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="form-control">
                <label className="label text-gray-600 font-medium">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="input input-bordered w-full focus:outline-none focus:border-[#16a34a] bg-gray-50 rounded-xl py-6" 
                />
              </div>

              {/* Message */}
              <div className="form-control">
                <label className="label text-gray-600 font-medium">Message</label>
                <textarea 
                  className="textarea textarea-bordered h-40 w-full focus:outline-none focus:border-[#16a34a] bg-gray-50 rounded-xl text-base" 
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button className="btn bg-[#16a34a] hover:bg-[#15803d] text-white w-full md:w-auto px-10 py-3 rounded-full text-lg shadow-lg hover:shadow-green-200 transition-all flex items-center gap-2">
                Send Message <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 3. Map Section (Visual Trust) */}
      <div className="w-full h-96 relative grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.832969966141!2d90.41323387602014!3d23.753331178668725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad3f980d%3A0x192d17c527063d8!2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1703000000000!5m2!1sen!2sbd" 
          className="w-full h-full border-0" 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        {/* Overlay Text on Map */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-full shadow-2xl z-10">
          <p className="font-bold text-gray-800 flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#16a34a]" /> Find us on Map
          </p>
        </div>
      </div>

    </div>
  );
};

export default Contact;