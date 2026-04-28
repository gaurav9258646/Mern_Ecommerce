import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  IndianRupee,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
} from "lucide-react";

import img1 from "../assets/nursingblog.webp";
import img2 from "../assets/n4.jpg";
import img3 from "../assets/n5.jpg";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const images = [img1, img2, img3];

  useEffect(() => {
    fetchDoctors();

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchDoctors = async () => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/doctor`);
      const data = await res.json();
      setDoctors(data.data?.slice(0, 6) || []);
    } catch (error) {
      console.log(error);
    }
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[320px] md:h-[500px] overflow-hidden rounded-b-3xl shadow-sm">
        <img
          src={images[current]}
          alt="hospital"
          className="w-full h-full object-cover transition duration-700"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mb-4">
            <HeartPulse className="w-10 h-10" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold flex items-center gap-2">
            <Stethoscope /> Book Your Appointment
          </h1>

          <p className="mt-3 text-sm md:text-lg text-gray-200 max-w-2xl">
            Fast, secure and trusted healthcare appointment booking platform
          </p>

          <button
            onClick={() => navigate("/doctors")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl font-medium shadow-lg"
          >
            View Doctors
          </button>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Doctors Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-blue-100">
            <Calendar size={24} />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Available Doctors
            </h2>
            <p className="text-sm text-gray-500">
              Choose your specialist and book instantly
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition p-6 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={doc.profileImage || "https://via.placeholder.com/150"}
                  alt="doctor"
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
                />

                <h3 className="mt-4 text-lg font-bold text-slate-800">
                  {doc.userId?.name}
                </h3>

                <p className="text-blue-600 font-medium text-sm mt-1">
                  {doc.specialization}
                </p>
              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Award size={16} />
                  {doc.experience} years experience
                </p>

                <p className="flex items-center gap-2">
                  <IndianRupee size={16} />
                  Consultation Fee: ₹{doc.fees}
                </p>
              </div>

              <button
                onClick={() => navigate(`/book/${doc._id}`)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-medium"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
