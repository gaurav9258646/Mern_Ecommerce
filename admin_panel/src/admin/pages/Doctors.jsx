import React, { useEffect, useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "", 
    specialization: "",
    department: "",
    experience: "",
    fees: "",
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
      const res = await fetch(`${url}/doctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        return alert(data.error);
      }

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
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Doctors</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-3">Add Doctor</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="Name" className="border p-2"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input placeholder="Email" className="border p-2"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input placeholder="Password" className="border p-2"
            value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <input placeholder="Phone" className="border p-2"
            value={form.phone}
            onChange={(e)=>setForm({...form,phone:e.target.value})}
          />

          <input placeholder="Specialization" className="border p-2"
            value={form.specialization}
            onChange={(e)=>setForm({...form,specialization:e.target.value})}
          />

          <input placeholder="Department" className="border p-2"
            value={form.department}
            onChange={(e)=>setForm({...form,department:e.target.value})}
          />

          <input type="number" placeholder="Experience" className="border p-2"
            value={form.experience}
            onChange={(e)=>setForm({...form,experience:e.target.value})}
          />

          <input type="number" placeholder="Fees" className="border p-2"
            value={form.fees}
            onChange={(e)=>setForm({...form,fees:e.target.value})}
          />
        </div>

        <button
          onClick={handleAddDoctor}
          className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
        >
          Add Doctor
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
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
            {doctors.map((doc) => (
              <tr key={doc._id} className="border-t">
                <td>{doc.userId?.name}</td>
                <td>{doc.userId?.email}</td>
                <td>{doc.userId?.phone}</td> 
                <td>{doc.specialization}</td>
                <td>{doc.department}</td>
                <td>{doc.experience}</td>
                <td>{doc.fees}</td>

                <td>
                  <button
                    onClick={()=>handleDelete(doc._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Doctors;