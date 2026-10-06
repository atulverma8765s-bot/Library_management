"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Book, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const FloatingInput = ({ label, type = "text", id, value, onChange }: { label: string; type?: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="relative group">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full px-4 pt-6 pb-2 text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] transition-all peer"
        placeholder=" "
        required
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#6366F1]"
      >
        {label}
      </label>
    </div>
  );
};

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "manager">("student");
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    department: "",
    adminCode: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API Call and success state
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/login");
    }, 2500);
  };

  // Set initial role from query params if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("role") === "manager") {
      setRole("manager");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-[#6366F1]/10 to-[#8B5CF6]/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-[#14B8A6]/10 to-[#059669]/10 blur-3xl" />

      <div className="w-full max-w-md z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 sm:p-10 rounded-3xl border border-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-center mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#4338CA] flex items-center justify-center shadow-[0_8px_16px_rgba(99,102,241,0.25)]">
                    <Book className="text-white w-7 h-7" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Create an Account</h2>
                <p className="text-center text-slate-500 text-sm mb-8">Join the digital library ecosystem</p>

                {/* Segmented Toggle Switch */}
                <div className="flex p-1 mb-8 bg-slate-100/80 rounded-xl relative">
                  <motion.div
                    className="absolute inset-y-1 bg-white rounded-lg shadow-sm"
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    initial={false}
                    animate={{
                      width: "calc(50% - 4px)",
                      x: role === "student" ? "4px" : "100%",
                    }}
                  />
                  <button
                    onClick={() => { setRole("student"); setFormData({...formData, department: "", adminCode: ""}) }}
                    className={`flex-1 py-2.5 text-sm font-semibold z-10 transition-colors ${role === "student" ? "text-slate-900" : "text-slate-500"}`}
                  >
                    Student
                  </button>
                  <button
                    onClick={() => { setRole("manager"); setFormData({...formData, department: "", adminCode: ""}) }}
                    className={`flex-1 py-2.5 text-sm font-semibold z-10 transition-colors ${role === "manager" ? "text-slate-900" : "text-slate-500"}`}
                  >
                    Library Manager
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <FloatingInput id="fullName" value={formData.fullName} onChange={handleChange} label="Full Name" />
                  
                  {role === "student" ? (
                    <>
                      <FloatingInput id="idNumber" value={formData.idNumber} onChange={handleChange} label="Student ID / Enrollment Number" />
                      <FloatingInput id="department" value={formData.department} onChange={handleChange} label="Department" />
                    </>
                  ) : (
                    <>
                      <FloatingInput id="idNumber" value={formData.idNumber} onChange={handleChange} label="Staff ID" />
                      <FloatingInput id="adminCode" type="password" value={formData.adminCode} onChange={handleChange} label="Admin Security Code" />
                    </>
                  )}

                  <FloatingInput id="email" type="email" value={formData.email} onChange={handleChange} label="Email Address" />
                  <FloatingInput id="password" type="password" value={formData.password} onChange={handleChange} label="Create Password" />

                  <button type="submit" className="w-full mt-6 bg-gradient-to-r from-[#6366F1] to-[#4338CA] text-white py-4 rounded-xl font-semibold shadow-[0_10px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_15px_30px_rgba(99,102,241,0.35)] hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366F1]">
                    Register Account
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-[#6366F1] hover:text-[#4338CA] transition-colors">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Successful</h2>
                <p className="text-slate-500 text-center mb-6">Your {role} account has been created successfully.</p>
                <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-slate-200 border-t-slate-500 rounded-full"
                  />
                  Redirecting to login portal...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
