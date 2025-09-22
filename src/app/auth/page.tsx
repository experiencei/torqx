"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";
import type { OAuthProvider } from "appwrite";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get();
        router.push("/dashboard");
      } catch {
        // no session exists
      }
    };
    checkUser();
  }, [router]);

  // Email/password login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // ✅ Updated method
      await account.createSession(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = () => {
    account.createOAuth2Session({
      provider: "google" as OAuthProvider,
      success: `${window.location.origin}/dashboard`,
      failure: `${window.location.origin}/auth`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errorMsg && (
          <p className="text-red-500 mb-4 text-center">{errorMsg}</p>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="my-4 text-center text-gray-400">or</div>

        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-2"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          <span>Login with Google</span>
        </Button>
      </div>
    </div>
  );
}
