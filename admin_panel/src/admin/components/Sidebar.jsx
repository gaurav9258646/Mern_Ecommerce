import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  CalendarCheck,
} from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/home",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: <Stethoscope size={18} />,
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: <CalendarCheck size={18} />,
    },
  ];

  return (
    <div className="w-60 bg-gray-900 text-white min-h-screen p-5">
      
      <h2 className="text-lg md:text-xl font-bold mb-6 text-center">
        Admin Panel
      </h2>

      <ul className="flex flex-col gap-2">
        {menu.map((item) => (
          <li
            key={item.name}
            onClick={() => {
              navigate(item.path);
              closeSidebar && closeSidebar();
            }}
            className={`flex items-center gap-3 p-3 rounded cursor-pointer transition ${
              location.pathname === item.path
                ? "bg-blue-500"
                : "hover:bg-gray-700"
            }`}
          >
            {item.icon}
            <span className="text-sm md:text-base">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;