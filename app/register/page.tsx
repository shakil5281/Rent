"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, name, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const { error } = await res.json();
      setError(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <h2 className="text-xl font-bold">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white p-2">
          Register
        </button>
      </form>
    </div>
  );
}
