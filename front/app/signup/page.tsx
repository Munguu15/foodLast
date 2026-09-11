"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { apiFetch } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await apiFetch(`/user`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Sign up failed");
      return;
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden p-6 md:p-8 gap-8">
        <div className="flex flex-col justify-center max-w-sm mx-auto w-full">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-xs text-gray-400 mb-6">
            Sign up to order your favorite food.
          </p>
          <form className="space-y-4" onSubmit={signup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm"
              required
            />
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
              Sign up
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 underline">
              Log in
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
