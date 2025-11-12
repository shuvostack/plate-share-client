import React from "react";
import { Link } from "react-router";
import { FaUtensils } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0B132B] text-white px-10 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Info */}
        <aside className="space-y-3">
          {/* Replace with your actual navbar logo */}
          <Link to="/" className="flex items-center gap-2 text-[#16a34a]">
            {/* <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            /> */}
            <FaUtensils />
            <h2 className="text-xl font-semibold text-[#5BC0BE]">Plate Share</h2>
          </Link>
          <p className="text-gray-300 leading-relaxed">
            Providing fresh & healthy food with love ❤️ <br />
            Since 2024
          </p>
        </aside>

        {/* Services */}
        <nav>
          <h6 className="text-lg font-semibold mb-3 text-[#5BC0BE]">
            Services
          </h6>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-[#5BC0BE] transition-colors">
                Get Food
              </Link>
            </li>
            <li>
              <Link to="/available-foods" className="hover:text-[#5BC0BE] transition-colors">
                Available Foods
              </Link>
            </li>
            <li>
              <Link to="/add-food" className="hover:text-[#5BC0BE] transition-colors">
                Add Food
              </Link>
            </li>
            <li>
              <Link to="/manage-my-foods" className="hover:text-[#5BC0BE] transition-colors">
                Manage Food
              </Link>
            </li>
          </ul>
        </nav>

        {/* Company */}
        <nav>
          <h6 className="text-lg font-semibold mb-3 text-[#5BC0BE]">Company</h6>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-[#5BC0BE] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#5BC0BE] transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#5BC0BE] transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#5BC0BE] transition-colors">
                Press Kit
              </Link>
            </li>
          </ul>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="text-lg font-semibold mb-3 text-[#5BC0BE]">Legal</h6>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-[#5BC0BE] transition-colors">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#5BC0BE] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#5BC0BE] transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} PlateShare — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
