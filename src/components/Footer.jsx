import React from "react";
import { Link } from "react-router"; // or "react-router-dom"
import { FaFacebookF, FaInstagram, FaTwitter, FaUtensils, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <div className="relative mt-16">
      {/* Wave SVG Divider - Creates a smooth transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <footer className="bg-[#0f172a] pt-20 pb-10 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-gradient-to-tr from-[#16a34a] to-[#4ade80] p-2 rounded-lg text-white group-hover:rotate-12 transition-transform duration-300">
                  <FaUtensils size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Plate<span className="text-[#16a34a]">Share</span>
                </h2>
              </Link>
              <p className="text-sm leading-relaxed text-gray-400">
                Bridging the gap between surplus and scarcity. We believe in a world where sharing a meal means sharing hope.
              </p>
              
              {/* Contact Info */}
              <div className="pt-2 space-y-2 text-sm">
                <p className="flex items-center gap-2 hover:text-[#16a34a] transition-colors cursor-pointer">
                  <MdEmail className="text-[#16a34a]" /> support@plateshare.com
                </p>
                <p className="flex items-center gap-2 hover:text-[#16a34a] transition-colors cursor-pointer">
                  <MdPhone className="text-[#16a34a]" /> +880 123 456 7890
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 border-l-4 border-[#16a34a] pl-3">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                {['Home', 'Available Foods', 'Add Food', 'Manage Foods'].map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                      className="hover:text-[#16a34a] hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Help */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 border-l-4 border-[#16a34a] pl-3">
                Support
              </h3>
              <ul className="space-y-3 text-sm">
                {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={`/${item.split(' ')[0].toLowerCase()}`} 
                      className="hover:text-[#16a34a] hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 border-l-4 border-[#16a34a] pl-3">
                Stay Updated
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Join our community to get updates on food drives and events.
              </p>
              
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a34a] text-sm"
                />
                <button className="bg-[#16a34a] hover:bg-[#15803d] text-white py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-green-900/20">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} PlateShare. Built with ❤️ by Mehedi Hasan Shuvo.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#16a34a] hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;