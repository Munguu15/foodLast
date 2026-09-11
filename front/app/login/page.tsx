"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await apiFetch(`/user/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }
    localStorage.setItem("nomnom-user", JSON.stringify(data.user));
    localStorage.setItem("nomnom-token", data.token);
    if (data.user?.role === "ADMIN") {
      router.push("/admin");
      return;
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden p-6 md:p-8 gap-8">
        <div className="flex flex-col justify-center max-w-sm mx-auto w-full">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Log in</h1>
          <p className="text-xs text-gray-400 mb-6">
            Log in to explore your favorite dishes.
          </p>
          <form className="space-y-4" onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm"
              required
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl text-sm font-medium bg-red-500 hover:bg-red-600 text-white"
            >
              Log in
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 underline">
              Sign up
            </Link>
          </p>
        </div>
        <div className="relative rounded-2xl overflow-hidden min-h-[400px] bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1000&auto=format&fit=crop"
            alt="Delivery"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
