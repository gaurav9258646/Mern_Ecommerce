import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, Moon, Sun } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dark, setDark] = useState(false);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formState.email || !formState.password) {
      return toast.error("Email and Password required");
    }

    try {
      setLoading(true);

      const url = import.meta.env.VITE_SERVER_URL;

      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!data.success) {
        return toast.error("Login failed");
      }

      if (data.data.user.role !== "admin") {
        return toast.error("Only admin allowed");
      }

      login(data.data.user, data.data.accessToken);
      localStorage.setItem("token", data.data.accessToken);

      toast.success("Bhai ye kaise ho😁");

      navigate("/home");

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:bg-gray-900 transition">

      <button
        onClick={() => setDark(!dark)}
        className="absolute top-5 right-5 bg-white dark:bg-gray-800 p-2 rounded-full shadow"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <form
        onSubmit={submitHandler}
        className="w-[340px] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col gap-4 transition"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-white">
          Admin Login
        </h1>

        <div className="flex items-center border rounded px-2 bg-white dark:bg-gray-700">
          <Mail size={18} className="text-gray-400" />
          <input
            type="email"
            placeholder="Enter email"
            className="w-full p-2 outline-none bg-transparent text-black dark:text-white"
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
          />
        </div>

        <div className="flex items-center border rounded px-2 bg-white dark:bg-gray-700">
          <Lock size={18} className="text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full p-2 outline-none bg-transparent text-black dark:text-white"
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;