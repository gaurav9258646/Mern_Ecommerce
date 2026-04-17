import React, { useEffect, useState } from "react";

const Home = () => {
  const [counts, setCounts] = useState({
    appointments: 0,
    doctors: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const token = localStorage.getItem("token");

        const [appRes, docRes, userRes] = await Promise.all([
          fetch(`${url}/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${url}/doctor`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${url}/auth/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const appData = appRes.ok ? await appRes.json() : { data: [] };
        const docData = docRes.ok ? await docRes.json() : { data: [] };
        const userData = userRes.ok ? await userRes.json() : { data: [] };

        setCounts({
          appointments: appData.data?.length || 0,
          doctors: docData.data?.length || 0,
          users: userData.data?.length || 0,
        });

      } catch (error) {
        console.log("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Dashboard
      </h1>

      {/* 🔹 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Appointments */}
        <div className="bg-white p-5 rounded shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Appointments</h2>
          <p className="text-2xl font-bold text-blue-600">
            {counts.appointments}
          </p>
        </div>

        {/* Doctors */}
        <div className="bg-white p-5 rounded shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Doctors</h2>
          <p className="text-2xl font-bold text-green-600">
            {counts.doctors}
          </p>
        </div>

        {/* Users */}
        <div className="bg-white p-5 rounded shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Users</h2>
          <p className="text-2xl font-bold text-purple-600">
            {counts.users}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;