import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  CalendarCheck,
  ShieldPlus,
} from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/home",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: <Stethoscope size={20} />,
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: <CalendarCheck size={20} />,
    },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 shadow-xl flex flex-col">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 rounded-2xl bg-blue-500/20 border border-blue-400/20">
          <ShieldPlus size={24} className="text-blue-300" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-xs text-gray-300">
            Hospital System
          </p>
        </div>
      </div>

      <ul className="space-y-3 flex-1">
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <li
              key={item.name}
              onClick={() => {
                navigate(item.path);
                closeSidebar && closeSidebar();
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                active
                  ? "bg-blue-500 shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >
              {item.icon}

              <span className="font-medium text-sm md:text-base">
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="pt-6 border-t border-white/10">
        <p className="text-xs text-gray-400 text-center">
          © 2026 Admin Panel
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;