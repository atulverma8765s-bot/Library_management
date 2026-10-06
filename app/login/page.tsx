"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, ShieldCheck, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "manager">("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "student") {
      router.push("/student-dashboard");
    } else {
      router.push("/manager-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-amber-500/15 via-purple-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-900/20 to-purple-800/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#121620]/90 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl relative"
        >
          {/* Logo badge */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-2xl border border-amber-500/40 bg-amber-500/10 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <BookOpen className="text-amber-400 w-6 h-6" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-1">
            LibraCore Portal
          </h2>
          <p className="text-center text-slate-400 text-xs mb-8">
            Access your Next-Gen Smart Library workspace
          </p>

          {/* Segmented Role Switch */}
          <div className="flex p-1 mb-8 bg-white/[0.04] border border-white/10 rounded-2xl relative">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl z-10 transition-all flex items-center justify-center gap-2 ${
                role === "student"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Student Portal
            </button>
            <button
              type="button"
              onClick={() => setRole("manager")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl z-10 transition-all flex items-center justify-center gap-2 ${
                role === "manager"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Manager Portal
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {role === "student" ? "Student ID / University Email" : "Staff ID / Admin Email"}
              </label>
              <input
                required
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={role === "student" ? "STU-2024-7749 or alex@university.edu" : "admin@libracore.edu"}
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="text-[11px] text-amber-400/80">Demo: Any credentials work</span>
              <a href="#" className="hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              Sign In to {role === "student" ? "Student Dashboard" : "Manager Console"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
