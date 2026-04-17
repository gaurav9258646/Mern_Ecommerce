import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./admin/pages/Home";
import Doctors from "./admin/pages/Doctors";
import Login from "./admin/pages/Login";
import AdminProtected from "./context/AdminProtected";
import AdminLayout from "./admin/AdminLayout";

const App = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Protected Layout */}
      <Route
        path="/"
        element={
          <AdminProtected>
            <AdminLayout />
          </AdminProtected>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="doctors" element={<Doctors />} />
      </Route>
    </Routes>
  );
};

export default App;