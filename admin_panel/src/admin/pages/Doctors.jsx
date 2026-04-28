import React, { useEffect, useState } from "react";
import { Trash2, UserPlus, Stethoscope, Search } from "lucide-react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    department: "",
    experience: "",
    fees: "",
    image: null,
  });

  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${url}/doctor`);
      const data = await res.json();
      setDoctors(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddDoctor = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const res = await fetch(`${url}/doctor`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        return alert(data.error);
      }

      alert("Doctor Added Successfully");
      fetchDoctors();

      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        specialization: "",
        department: "",
        experience: "",
        fees: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${url}/doctor/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.userId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-100">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Doctors Management
              </h1>
              <p className="text-gray-500 text-sm">
                Admin panel for managing doctors
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctor by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <UserPlus className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Add Doctor</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "password", "phone", "specialization", "department", "experience", "fees"].map((field) => (
              <input
                key={field}
                type={field === "experience" || field === "fees" ? "number" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none"
              />
            ))}

            <input
              type="file"
              className="border border-gray-300 rounded-xl px-4 py-3"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
          </div>

          <button
            onClick={handleAddDoctor}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium"
          >
            Add Doctor
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
            <table className="w-full min-w-[1000px] text-center">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="p-4">Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Specialization</th>
                  <th>Department</th>
                  <th>Experience</th>
                  <th>Fees</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredDoctors.map((doc) => (
                  <tr
                    key={doc._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      <img
                        src={doc.profileImage || "https://via.placeholder.com/50"}
                        alt="doctor"
                        className="w-12 h-12 rounded-full object-cover mx-auto border"
                      />
                    </td>

                    <td>{doc.userId?.name}</td>
                    <td>{doc.userId?.email}</td>
                    <td>{doc.userId?.phone}</td>
                    <td>{doc.specialization}</td>
                    <td>{doc.department}</td>
                    <td>{doc.experience} yrs</td>
                    <td>₹ {doc.fees}</td>

                    <td>
                      <button
                        title="Delete Doctor"
                        onClick={() => handleDelete(doc._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </button>
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

export default Doctors;
