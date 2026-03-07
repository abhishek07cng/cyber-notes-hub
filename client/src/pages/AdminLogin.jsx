import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://cyber-notes-hub-backend.onrender.com/api/admin/login", {
        email,
        password,
      },
        { withCredentials: true }
      );

      navigate("/admin/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-zinc-900 p-8 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-green-400 mb-6">
        Admin Login
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="bg-zinc-800 p-3 rounded text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-zinc-800 p-3 rounded text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-black font-semibold p-3 rounded transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;