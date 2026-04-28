import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="logo"
                className="h-11 w-auto object-contain"
              />
            
            </div>

            <p className="text-sm leading-6 text-gray-400">
              Professional hospital appointment booking platform for fast,
              secure, and trusted doctor consultations.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
              <Link to="/doctors" className="hover:text-white transition">
                Doctors
              </Link>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-white transition">
                Signup
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Phone size={18} />
                +91 9876543210
              </p>

              <p className="flex items-center gap-2">
                <Mail size={18} />
                gaurav.pcm@gmail.com
              </p>

              <p className="flex items-center gap-2">
                <MessageCircle size={18} />
                WhatsApp 
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Visit Us
            </h3>

            <p className="flex items-start gap-2 text-sm text-gray-400 mb-5">
              <MapPin size={18} className="mt-1" />
              Near City Hospital, Main Road,
              <br />
              Ghaziabad, Uttar Pradesh, India
            </p>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
                <FaFacebookF size={18} />
              </button>

              <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
                <FaInstagram size={18} />
              </button>

              <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
                <FaTwitter size={18} />
              </button>

              <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
                <FaLinkedinIn size={18} />
              </button>

              <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
                <FaYoutube size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 py-5 text-center text-sm text-gray-500 px-4">
        © 2026 MedCare Hospital. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
