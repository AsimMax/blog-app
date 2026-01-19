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
      body: JSON.stringify({ username, password }),
    });

    // If server redirects, follow it
    if (res.redirected) {
      window.location.href = res.url;
      return;
    }

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
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 bg-gray-50">
  <div className="w-full max-w-sm border p-5 sm:p-8 shadow-md rounded-lg bg-white">
    <h2 className="text-lg sm:text-xl font-bold mb-5 text-center">
      Admin Login
    </h2>

    <input
      value={username}
      type="text"
      placeholder="Username"
      className="border w-full mb-3 px-3 py-2 sm:py-3 rounded-md outline-none focus:ring-1 focus:ring-black"
      onChange={(e) => setUsername(e.target.value)}
    />

    <input
      value={password}
      type="password"
      placeholder="Password"
      className="border w-full mb-4 px-3 py-2 sm:py-3 rounded-md outline-none focus:ring-1 focus:ring-black"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      onClick={handleLogin}
      disabled={loading}
      className={`w-full py-2.5 sm:py-3 rounded-md transition active:scale-95 ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black text-white"
      }`}
    >
      {loading ? "Logging in..." : "Login"}
    </button>
  </div>
</div>

  );
}
