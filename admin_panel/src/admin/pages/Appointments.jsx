import React, { useEffect, useState } from "react";
import AppointmentDelete from "../dialog/AppointmentDelete";
import EditAppointment from "../dialog/EditAppointment";
import {
  CalendarCheck,
  Search,
  User,
  Stethoscope,
  Clock,
} from "lucide-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${url}/appointments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setAppointments(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredAppointments = appointments.filter((app) =>
    app.patientId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-100">
              <CalendarCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Appointments Management
              </h1>
              <p className="text-gray-500 text-sm">
                Manage hospital appointments efficiently
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patient name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl pl-10 pr-4 py-3 focus:outline-none bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="max-h-[550px] overflow-y-auto overflow-x-auto">
            <table className="w-full min-w-[1000px] text-center">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="p-4">Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.map((app) => (
                  <tr
                    key={app._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <User size={16} className="text-gray-500" />
                        {app.patientId?.name}
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <Stethoscope size={16} className="text-gray-500" />
                        {app.doctorId?.userId?.name || "N/A"}
                      </div>
                    </td>

                    <td>
                      {new Date(app.date).toLocaleDateString()}
                    </td>

                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <Clock size={15} className="text-gray-500" />
                        {app.time}
                      </div>
                    </td>

                    <td>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {app.status || "pending"}
                      </span>
                    </td>

                    <td>
                      <div className="flex justify-center gap-3">
                        <EditAppointment
                          id={app._id}
                          onUpdated={fetchAppointments}
                        />

                        <AppointmentDelete
                          id={app._id}
                          onDeleted={fetchAppointments}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
