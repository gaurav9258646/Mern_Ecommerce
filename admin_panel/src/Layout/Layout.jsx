import React, { useState } from "react";
import Sidebar from "../admin/components/Sidebar";
import Navbar from "../admin/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 relative">
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-screen transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar closeSidebar={() => setOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col w-full md:ml-64">
        <Navbar toggleSidebar={() => setOpen(!open)} />

        <main className="p-4 md:p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
