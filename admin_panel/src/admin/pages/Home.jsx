import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  CalendarDays,
  UserRound,
  Stethoscope,
  Activity,
} from "lucide-react";

const Home = () => {
  const [counts, setCounts] = useState({
    appointments: 0,
    doctors: 0,
    users: 0,
  });

  const [chartData, setChartData] = useState([]);
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

        const appointments = appData.data || [];
        const doctors = docData.data || [];
        const users = userData.data || [];

        setCounts({
          appointments: appointments.length,
          doctors: doctors.length,
          users: users.length,
        });

        setChartData([
          { name: "Appointments", total: appointments.length },
          { name: "Doctors", total: doctors.length },
          { name: "Users", total: users.length },
        ]);
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
      <div className="min-h-screen flex items-center justify-center text-gray-600 font-medium">
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Appointments",
      value: counts.appointments,
      icon: <CalendarDays className="w-6 h-6" />,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Doctors",
      value: counts.doctors,
      icon: <Stethoscope className="w-6 h-6" />,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Users",
      value: counts.users,
      icon: <UserRound className="w-6 h-6" />,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  ];

  const colors = ["#3b82f6", "#10b981", "#8b5cf6"];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-white shadow-sm">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-gray-500 text-sm">
              Hospital admin overview and analytics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <h2 className={`text-3xl font-bold mt-2 ${card.text}`}>
                    {card.value}
                  </h2>
                </div>

                <div className={`p-4 rounded-2xl ${card.bg} ${card.text}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-[420px]">
          <h2 className="text-xl font-semibold mb-5">System Analytics</h2>

          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="total" radius={[10, 10, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
