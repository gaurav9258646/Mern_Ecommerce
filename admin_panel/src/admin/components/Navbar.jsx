import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full h-14 bg-white shadow flex justify-between items-center px-4 md:px-6">
      
      <div className="flex items-center gap-3">
        
        <button onClick={toggleSidebar} className="md:hidden">
          <Menu size={22} />
        </button>

        <h1 className="text-base md:text-lg font-semibold text-gray-700">
          Admin Dashboard
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-2 md:px-3 py-1 rounded text-sm md:text-base"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
};

export default Navbar;