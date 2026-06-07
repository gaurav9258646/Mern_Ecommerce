import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  XCircle,
  CheckCircle,
} from "lucide-react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const fetchMyAppointments = async () => {
    try {
      const patientId = localStorage.getItem("userId");

      const res = await fetch(`${url}/appointments/patient/${patientId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setAppointments(data.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      const res = await fetch(`${url}/appointments/cancel/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          cancelReason: "Cancelled by patient",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        return alert("Cancel failed");
      }

      fetchMyAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-blue-100">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              My Appointments
            </h1>
            <p className="text-gray-500 text-sm">
              View and manage your booked appointments
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {appointments.length > 0 ? (
            appointments.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <h2 className="text-lg font-bold text-slate-800">
                      Doctor: {item.doctorId?.userId?.name || "Doctor"}
                    </h2>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      item.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : item.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>
                      Date:{" "}
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "--"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Time: {item.time || "--"}</span>
                  </div>
                </div>

                <div className="mt-5 bg-slate-50 rounded-2xl p-4">
                  <p className="font-medium text-slate-700">
                    Appointment Reason:
                  </p>
                  <p className="text-gray-600 mt-1">
                    {item.reason || "No reason provided"}
                  </p>
                </div>

                {item.status !== "cancelled" &&
                  item.status !== "completed" && (
                    <button
                      onClick={() => handleCancelAppointment(item._id)}
                      className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition"
                    >
                      <XCircle size={18} />
                      Cancel Appointment
                    </button>
                  )}

                {item.status === "cancelled" && (
                  <div className="mt-5 flex items-center justify-center gap-2 text-red-500 font-medium">
                    <XCircle size={18} />
                    Appointment Cancelled
                  </div>
                )}

                {item.status === "completed" && (
                  <div className="mt-5 flex items-center justify-center gap-2 text-green-600 font-medium">
                    <CheckCircle size={18} />
                    Appointment Completed
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-600">
                No Appointments Found
              </h2>
              <p className="text-gray-400 mt-2">
                Your booked appointments will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;