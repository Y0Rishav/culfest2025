// pages/login.js

import React, { useState } from "react";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";


import { useRouter } from "next/router";
// import { authOptions } from "next-auth";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      const session = await getSession();
      router.push("/profile");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 md:pt-0">


      {/* Logo */}
      <Link href="/" className="absolute left-5 top-5 z-20">
        <img
          src="colorLogo.png"
          alt="CULFEST Logo"
          className="animate-bounce-slow h-[60px] md:h-[115px] w-auto rounded-lg bg-black/30 p-2 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
        />
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-[90%] max-w-md rounded-xl border border-cyan-500/30 bg-slate-900/80 p-6 text-cyan-50 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-xl md:w-[35%] md:p-8 font-Quicksand">

        {/* Decorative Corner Accents */}
        <div className="absolute -left-1 -top-1 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-yellow-400"></div>
        <div className="absolute -right-1 -top-1 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-yellow-400"></div>
        <div className="absolute -bottom-1 -left-1 h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-yellow-400"></div>
        <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-yellow-400"></div>

        <div className="mb-6 flex justify-center">
          <img
            src="colorLogo.png"
            alt="CULFEST LOGO"
            className="w-[50%] object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>

        <h2 className="mb-6 text-center text-4xl font-Bangers tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-500 drop-shadow-sm">
          USER LOGIN
        </h2>

        {error && (
          <div className="mb-4 text-center rounded bg-red-500/20 py-2 border border-red-500/50 text-red-200">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="group relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-white placeholder-transparent outline-none transition-all focus:border-yellow-400 focus:bg-slate-800 focus:shadow-[0_0_10px_rgba(250,204,21,0.3)]"
              required
            />
            <label className="pointer-events-none absolute left-3 -top-2.5 bg-slate-900/90 px-1 text-xs text-cyan-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-400">
              USER EMAIL
            </label>
          </div>

          <div className="group relative">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="peer w-full rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-white placeholder-transparent outline-none transition-all focus:border-yellow-400 focus:bg-slate-800 focus:shadow-[0_0_10px_rgba(250,204,21,0.3)]"
              required
            />
            <label className="pointer-events-none absolute left-3 -top-2.5 bg-slate-900/90 px-1 text-xs text-cyan-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-400">
              PASSWORD
            </label>
          </div>

          <div className="text-right">
            <Link
              href="/forgotPassword"
              className="text-xs font-medium text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              FORGOT PASSWORD?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full relative overflow-hidden rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 py-3 font-bold text-slate-900 shadow-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] active:scale-[0.98] font-Bangers tracking-widest text-xl"
            disabled={loading}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
            {loading ? "AUTHENTICATING..." : "LOGIN"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          New User?{" "}
          <Link href="/signup" className="font-bold text-yellow-400 hover:text-yellow-300 hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

// export default LoginPage;

export default LoginForm;
