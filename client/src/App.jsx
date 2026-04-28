import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Doctors from "./pages/Doctor";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  const hideFooterRoutes = ["/login", "/signup"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default App;
