import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Moon,
  Sun,
  ShieldCheck,
} from "lucide-react";
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
        headers: {
          "Content-Type": "application/json",
        },
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

      toast.success("Login Successful");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 px-4 transition-all duration-300">
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-6 right-6 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md border border-gray-100"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-500/20 mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-300" />
          </div>

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Admin Login
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 text-center">
            Secure access to Hospital Management Dashboard
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-2xl px-4 bg-white dark:bg-gray-700">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 outline-none bg-transparent text-black dark:text-white"
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
              Password
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-2xl px-4 bg-white dark:bg-gray-700">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 outline-none bg-transparent text-black dark:text-white"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold shadow-md transition"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
