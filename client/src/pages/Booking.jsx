import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Stethoscope,
  IndianRupee,
  HeartPulse,
  XCircle,
} from "lucide-react";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointmentId, setAppointmentId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
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

      setAppointmentId(data.data._id);

    } catch (error) {
      console.log(error);
    }
  };

  /* CANCEL APPOINTMENT */
  const handleCancelAppointment = async () => {
    if (!appointmentId) {
      return alert("No appointment found to cancel");
    }

    try {
      const url = import.meta.env.VITE_SERVER_URL;

      const res = await fetch(
        `${url}/appointments/cancel/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            cancelReason: "Patient not available",
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        return alert("Cancel failed");
      }

      setAppointmentId("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!doctor)
    return <p className="text-center mt-10">Loading...</p>;
return (
  <div className="bg-slate-100 px-4 py-4">
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-center">
        <div className="flex justify-center mb-2">
          <div className="bg-white/20 p-2 rounded-xl">
            <HeartPulse className="w-6 h-6" />
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold">
          Book Appointment
        </h1>

        <p className="text-xs text-blue-100 mt-1">
          Fast & secure hospital appointment booking
        </p>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5">
        <div className="text-center mb-5">
          <img
            src={doctor.profileImage || "https://via.placeholder.com/150"}
            alt="doctor"
            className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-blue-100"
          />

          <h2 className="text-lg font-bold mt-3 flex justify-center items-center gap-2 text-slate-800">
            <Stethoscope size={16} />
            {doctor.userId?.name}
          </h2>

          <p className="text-blue-600 text-sm font-medium mt-1">
            {doctor.specialization}
          </p>

          <p className="flex justify-center items-center gap-2 text-sm text-gray-600 mt-2">
            <IndianRupee size={14} />
            Consultation Fee: ₹{doctor.fees}
          </p>
        </div>

        <div className="space-y-4">
          {/* Date */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700">
              <Calendar size={16} />
              Select Date
            </label>

            <input
              type="date"
              className="w-full border rounded-xl px-3 py-2 focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Time */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700">
              <Clock size={16} />
              Select Time
            </label>

            <select
              className="w-full border rounded-xl px-3 py-2 focus:outline-none"
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

          {/* Book Button */}
          <button
            onClick={handleBooking}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition"
          >
            <Clock size={16} />
            Confirm Booking
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleCancelAppointment}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition"
          >
            <XCircle size={16} />
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default Booking;