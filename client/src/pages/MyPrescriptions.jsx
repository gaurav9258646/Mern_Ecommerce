import React, { useEffect, useState } from "react";
import { FileText, Calendar, User, Pill } from "lucide-react";

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const patientId = localStorage.getItem("userId");

      const res = await fetch(`${url}/prescription/${patientId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setPrescriptions(data.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-blue-100">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              My Prescriptions
            </h1>
            <p className="text-gray-500 text-sm">
              View your doctor prescriptions and medicine details
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {prescriptions.length > 0 ? (
            prescriptions.map((item) => (
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

                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    Next Visit:
                    {item.nextVisitDate
                      ? new Date(item.nextVisitDate).toLocaleDateString()
                      : "--"}
                  </div>
                </div>

                <div className="space-y-4">
                  {item.medicines?.map((med, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-2xl p-4 bg-slate-50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Pill className="w-4 h-4 text-blue-600" />
                        <h3 className="font-semibold text-slate-700">
                          {med.name}
                        </h3>
                      </div>

                      <p>
                        <strong>Dosage:</strong> {med.dosage}
                      </p>

                      <p>
                        <strong>Timing:</strong> {med.timing}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 bg-blue-50 rounded-2xl p-4">
                  <p className="font-medium text-slate-700">
                    Doctor Notes:
                  </p>
                  <p className="text-gray-600 mt-1">
                    {item.notes || "No notes available"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-600">
                No Prescriptions Found
              </h2>
              <p className="text-gray-400 mt-2">
                Your prescriptions will appear here after doctor update.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPrescriptions;