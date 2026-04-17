import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formState.email || !formState.password) {
      return alert("Email and Password is required");
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
        alert("Login failed");
        return;
      }

      if (data.data.user.role !== "admin") {
        alert("Only admin allowed");
        return;
      }

      login(data.data.user, data.data.accessToken);

      localStorage.setItem("token", data.data.accessToken);

      navigate("/home");

    } catch (error) {
      console.log(error);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="roundedw-[280px] border p-5 shadow-md flex flex-col gap-3 bg-white"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;