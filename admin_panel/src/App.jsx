import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./admin/pages/Home";
import Doctors from "./admin/pages/Doctors";
import Appointments from "./admin/pages/Appointments";
import Login from "./admin/pages/Login";

import AdminProtected from "./context/AdminProtected";
import AdminLayout from "./admin/AdminLayout";
import AdminProfile from "./admin/pages/AdminProfile";
import PrescriptionForm from "./admin/pages/PrescriptionForm";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          element={
            <AdminProtected>
              <AdminLayout />
            </AdminProtected>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
           <Route path="profile" element={<AdminProfile />} /> 
           <Route path="prescription" element={<PrescriptionForm  />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
