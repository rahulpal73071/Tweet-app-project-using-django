import { useState } from "react";
import { login } from "../api/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const token = res.data.auth_token;

      // Save token
      localStorage.setItem("token", token);

      // Fetch username from backend and save
      const userRes = await axios.get("http://localhost:8000/auth/users/me/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      localStorage.setItem("username", userRes.data.username);

      navigate("/"); // ✅ Redirect after login
    } catch (err) {
      console.error("Login failed:", err); // ✅ No alert, only console log
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">
          Welcome Back 👋
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-white py-2 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg"
        >
          Login
        </button>

        <p className="p-2 text-center">
          You don't have an account?
          <Link to="/register" className="p-4 text-blue-400 underline font-bold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
