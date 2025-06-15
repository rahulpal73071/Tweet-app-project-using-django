import { useState } from "react";
import { register, login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    re_password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.re_password) {
      console.error("Passwords do not match");
      return;
    }

    try {
      await register(form);

      const loginResponse = await login({
        username: form.username,
        password: form.password,
      });

      const token = loginResponse.data?.auth_token;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", form.username);
        navigate("/"); // ✅ Redirect after registration and login
      }
    } catch (err) {
      console.error("Registration or auto-login failed:", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Create Account ✨
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Username</label>
          <input
            type="text"
            placeholder="Enter a username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter a password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={form.re_password}
            onChange={(e) =>
              setForm({ ...form, re_password: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-white py-2 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg"
        >
          Register
        </button>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-300 hover:text-white font-medium underline transition"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
