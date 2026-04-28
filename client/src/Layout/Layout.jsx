import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  const location = useLocation();

  const hideFooterRoutes = ["/login", "/signup"];

  const shouldHideFooter = hideFooterRoutes.includes(
    location.pathname
  );

  return (
    <>
      <Navbar />

      <Outlet />

      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default Layout;