import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`fixed md:static z-50 top-0 left-0 h-full transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar closeSidebar={() => setOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col w-full">
        <Navbar toggleSidebar={() => setOpen(!open)} />

        <div className="p-4 md:p-6 bg-gray-100 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;