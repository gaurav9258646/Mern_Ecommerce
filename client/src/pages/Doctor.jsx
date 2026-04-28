import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  Phone,
  IndianRupee,
  Calendar,
  Award,
  HeartPulse,
} from "lucide-react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/doctor`);
      const data = await res.json();
      setDoctors(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-blue-100">
            <HeartPulse className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Our Doctors
            </h1>
            <p className="text-gray-500 text-sm">
              Book appointments with trusted specialists
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
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-sm"
                />

                <h2 className="mt-4 text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Stethoscope size={18} />
                  {doc.userId?.name}
                </h2>

                <p className="text-blue-600 font-medium text-sm mt-1">
                  {doc.specialization}
                </p>
              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Award size={16} />
                  Experience: {doc.experience} Years
                </p>

                <p className="flex items-center gap-2">
                  <IndianRupee size={16} />
                  Consultation Fee: ₹{doc.fees}
                </p>

                <p className="flex items-center gap-2">
                  <Phone size={16} />
                  Contact: {doc.userId?.phone}
                </p>
              </div>

              <button
                onClick={() => navigate(`/book/${doc._id}`)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition"
              >
                <Calendar size={18} />
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
