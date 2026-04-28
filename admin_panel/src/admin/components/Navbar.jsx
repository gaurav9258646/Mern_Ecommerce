import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut, Bell, UserCircle2 } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="w-full h-[72px] bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-xl border border-gray-200"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500 hidden sm:block">
            Hospital Management System
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:flex p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
          <Bell size={18} />
        </button>

        <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
          <UserCircle2 size={22} />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
