"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button onClick={() => signIn("google")} className="p-3 bg-blue-500 text-white">
        Sign in with Google
      </button>
    </div>
  );
}
