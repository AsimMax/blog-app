"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.success) {
        router.push("/admin");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border p-8 shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          value={username}
          type="text"
          placeholder="Username"
          className="border w-full mb-3 p-2"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          value={password}
          type="password"
          placeholder="Password"
          className="border w-full mb-4 p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 ${loading ? "bg-gray-400" : "bg-black text-white"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
