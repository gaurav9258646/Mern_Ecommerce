import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Stethoscope,
  IndianRupee,
  HeartPulse,
} from "lucide-react";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/doctor/${id}`);
      const data = await res.json();

      if (data.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    if (!date || !time) {
      return alert("Select date & time");
    }

    try {
      const url = import.meta.env.VITE_SERVER_URL;

      const res = await fetch(`${url}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          doctorId: id,
          date,
          time,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        return alert("Booking failed");
      }

      alert("Appointment Booked Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!doctor)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-blue-600 text-white p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-white/20 p-3 rounded-2xl">
              <HeartPulse className="w-8 h-8" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">
            Book Appointment
          </h1>
          <p className="text-sm text-blue-100 mt-2">
            Fast & secure hospital appointment booking
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <img
              src={doctor.profileImage || "https://via.placeholder.com/150"}
              alt="doctor"
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-100"
            />

            <h2 className="text-xl font-bold mt-4 flex justify-center items-center gap-2 text-slate-800">
              <Stethoscope size={18} />
              {doctor.userId?.name}
            </h2>

            <p className="text-blue-600 font-medium mt-1">
              {doctor.specialization}
            </p>

            <p className="flex justify-center items-center gap-2 text-sm text-gray-600 mt-2">
              <IndianRupee size={16} />
              Consultation Fee: ₹{doctor.fees}
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-slate-700">
                <Calendar size={18} />
                Select Date
              </label>
              <input
                type="date"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-slate-700">
                <Clock size={18} />
                Select Time
              </label>
              <select
                className="w-full border rounded-xl px-4 py-3 focus:outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">Select Time</option>
                <option>10:00 AM</option>
                <option>12:00 PM</option>
                <option>3:00 PM</option>
                <option>6:00 PM</option>
              </select>
            </div>

            <button
              onClick={handleBooking}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition"
            >
              <Clock size={18} />
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
