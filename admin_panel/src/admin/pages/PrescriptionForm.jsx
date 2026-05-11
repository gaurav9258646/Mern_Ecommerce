import React, { useEffect, useState } from "react";
import { FileText, Save } from "lucide-react";
import toast from "react-hot-toast";

const PrescriptionForm = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [form, setForm] = useState({
    appointmentId: "",
    patientId: "",
    doctorId: "",
    medicineName: "",
    dosage: "",
    timing: "",
    notes: "",
    nextVisitDate: "",
  });

  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch(`${url}/auth/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setPatients((data.data || []).filter((u) => u.role === "patient"));
  };

  const fetchDoctors = async () => {
    const res = await fetch(`${url}/doctor`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setDoctors(data.data || []);
  };

  const fetchAppointments = async () => {
    const res = await fetch(`${url}/appointments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setAppointments(data.data || []);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${url}/prescription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          appointmentId: form.appointmentId,
          patientId: form.patientId,
          doctorId: form.doctorId,
          medicines: [
            {
              name: form.medicineName,
              dosage: form.dosage,
              timing: form.timing,
            },
          ],
          notes: form.notes,
          nextVisitDate: form.nextVisitDate,
        }),
      });

      const data = await res.json();

      if (!data.success) return toast.error("Failed");

      toast.success("Prescription Saved");
    } catch (err) {
      toast.error("Error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-3xl">
        <h1 className="text-2xl font-bold mb-6 flex gap-2 items-center">
          <FileText /> Add Prescription
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Appointment Dropdown */}
          <select
            value={form.appointmentId}
            onChange={(e) => setForm({ ...form, appointmentId: e.target.value })}
            className="border p-3 rounded-xl"
          >
            <option value="">Select Appointment</option>
            {appointments.map((a) => (
              <option key={a._id} value={a._id}>
                {a.patientId?.name} → {a.doctorId?.userId?.name}
              </option>
            ))}
          </select>

          {/* Patient */}
          <select
            value={form.patientId}
            onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            className="border p-3 rounded-xl"
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>

          {/* Doctor */}
          <select
            value={form.doctorId}
            onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
            className="border p-3 rounded-xl"
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>{d.userId?.name}</option>
            ))}
          </select>

          <input
            placeholder="Medicine"
            value={form.medicineName}
            onChange={(e) => setForm({ ...form, medicineName: e.target.value })}
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Dosage"
            value={form.dosage}
            onChange={(e) => setForm({ ...form, dosage: e.target.value })}
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Timing"
            value={form.timing}
            onChange={(e) => setForm({ ...form, timing: e.target.value })}
            className="border p-3 rounded-xl"
          />

          <input
            type="date"
            value={form.nextVisitDate}
            onChange={(e) => setForm({ ...form, nextVisitDate: e.target.value })}
            className="border p-3 rounded-xl"
          />

          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="border p-3 rounded-xl md:col-span-2"
          />
        </div>

        <button onClick={handleSubmit} className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl flex gap-2">
          <Save size={18}/> Save
        </button>
      </div>
    </div>
  );
};

export default PrescriptionForm;