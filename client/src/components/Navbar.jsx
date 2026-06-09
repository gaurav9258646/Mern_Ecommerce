import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Users,
  LogIn,
  LogOut,
  Menu,
  X,
  FileText,
  CalendarCheck,
  Image,
} from "lucide-react";

import logo from "../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="flex justify-between items-center px-4 md:px-6 py-2">
          
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="logo"
              className="h-10 md:h-12 object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-gray-700">

            <Link
              to="/"
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              <Home size={18} />
              Home
            </Link>

            <Link
              to="/doctors"
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              <Users size={18} />
              Doctors
            </Link>

            {/* Gallery */}
            <Link
              to="/gallery"
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              <Image size={18} />
              Gallery
            </Link>

            {token && (
              <Link
                to="/my-appointments"
                className="flex items-center gap-1 hover:text-blue-600 transition"
              >
                <CalendarCheck size={18} />
                My Appointments
              </Link>
            )}

            {token && (
              <Link
                to="/my-prescriptions"
                className="flex items-center gap-1 hover:text-blue-600 transition"
              >
                <FileText size={18} />
                My Prescriptions
              </Link>
            )}

            {!token ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 hover:text-blue-600 transition"
                >
                  <LogIn size={18} />
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-white shadow-md flex flex-col items-center gap-4 py-4">

            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link to="/doctors" onClick={() => setOpen(false)}>
              Doctors
            </Link>

            <Link to="/gallery" onClick={() => setOpen(false)}>
              Gallery
            </Link>

            {token && (
              <Link
                to="/my-appointments"
                onClick={() => setOpen(false)}
              >
                My Appointments
              </Link>
            )}

            {token && (
              <Link
                to="/my-prescriptions"
                onClick={() => setOpen(false)}
              >
                My Prescriptions
              </Link>
            )}

            {!token ? (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>

                <Link to="/signup" onClick={() => setOpen(false)}>
                  Signup
                </Link>
              </>
            ) : (
              <button onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navbar Spacer */}
      <div className="h-[70px]"></div>
    </>
  );
};

export default Navbar;