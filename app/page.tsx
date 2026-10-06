"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Book,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Library,
  Users,
  Compass,
} from "lucide-react";
import { useLibrary } from "./context/LibraryContext";

export default function LandingPage() {
  const { books, borrowRecords, borrowBook } = useLibrary();
  const [borrowModalBook, setBorrowModalBook] = useState<any | null>(null);
  const [borrowSuccess, setBorrowSuccess] = useState(false);

  // Quick borrow form modal state
  const [studentForm, setStudentForm] = useState({
    name: "Alex Morgan",
    id: "STU-2024-7749",
    email: "alex.morgan@university.edu",
    phone: "+1 (555) 782-9014",
    department: "Computer Science",
  });

  const handleConfirmBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!borrowModalBook) return;

    borrowBook(borrowModalBook.id, studentForm);
    setBorrowSuccess(true);
    setTimeout(() => {
      setBorrowSuccess(false);
      setBorrowModalBook(null);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col relative overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Ambient Lighting & Orbit Gradients */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-gradient-to-b from-amber-500/15 via-purple-600/10 to-transparent rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40 z-0" />
      <div className="absolute top-[30%] left-[-150px] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-900/20 to-purple-800/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Background Faint Orbital Lines */}
      <svg
        className="absolute top-0 right-0 w-[900px] h-[750px] opacity-[0.07] pointer-events-none z-0"
        viewBox="0 0 900 750"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="650" cy="250" r="280" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="650" cy="250" r="380" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="650" cy="250" r="500" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="12 12" />
        <ellipse cx="600" cy="300" rx="420" ry="280" stroke="#818CF8" strokeWidth="1" />
      </svg>

      {/* Floating Header / Navigation Bar matching provided screenshot */}
      <header className="w-full sticky top-0 z-50 pt-3 px-4 sm:px-8">
        <nav className="max-w-7xl mx-auto rounded-2xl bg-[#121620]/80 backdrop-blur-xl border border-white/10 px-5 sm:px-8 h-20 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl border border-amber-500/40 bg-amber-500/10 flex items-center justify-center transition-all group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              {/* Elegant golden book icon */}
              <svg
                className="w-5 h-5 text-amber-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0.5-0.05" />
                <path d="M6 2v20" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-amber-100 transition-colors">
              LibraCore
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link
              href="/"
              className="text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-400 after:rounded-full font-semibold"
            >
              Home
            </Link>
            <a
              href="#catalog"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Explore
            </a>
            <a
              href="#about"
              className="text-slate-300 hover:text-white transition-colors"
            >
              About
            </a>
            <Link
              href="/manager-dashboard"
              className="text-amber-400/90 hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> Manager Portal
            </Link>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                Login
              </button>
            </Link>
            <Link href="/login">
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/20 hover:from-amber-500/20 hover:to-amber-600/30 border border-amber-500/35 hover:border-amber-400/70 text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.12)] hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:scale-[1.02] active:scale-[0.98]">
                Get Started
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Hero Section matching user reference screenshot */}
      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 pt-16 sm:pt-20 pb-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 z-10 w-full">
        {/* Hero Left Content */}
        <div className="flex-1 max-w-2xl space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-white leading-[1.08] tracking-tight">
              The Next-Gen <br />
              Smart <br />
              <span className="bg-gradient-to-r from-[#7c6df5] via-[#b68ef8] via-[#ffd277] to-[#dfa845] bg-clip-text text-transparent drop-shadow-sm inline-block">
                Smart Library
              </span>{" "}
              <br />
              Experience
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg sm:text-xl text-slate-400 font-normal max-w-xl leading-relaxed"
          >
            Discover, borrow, and manage your academic resources with a seamless, beautifully unified digital ecosystem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a href="#catalog">
              <button className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold shadow-[0_10px_25px_rgba(245,158,11,0.25)] hover:shadow-[0_15px_30px_rgba(245,158,11,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0">
                <Compass className="w-5 h-5" /> Explore Catalog
              </button>
            </a>
            <Link href="/manager-dashboard">
              <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-medium transition-all hover:-translate-y-0.5">
                <ShieldCheck className="w-5 h-5 text-amber-400" /> Manager Console
              </button>
            </Link>
          </motion.div>

          {/* Quick Metrics ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pt-6 flex items-center gap-8 text-sm text-slate-400 border-t border-white/[0.08]"
          >
            <div>
              <span className="block text-2xl font-bold text-white">{books.length}</span>
              <span>Available Titles</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="block text-2xl font-bold text-amber-400">
                {borrowRecords.filter((r) => r.status === "active").length}
              </span>
              <span>Active Loans</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="block text-2xl font-bold text-emerald-400">100%</span>
              <span>Real-time Sync</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Right: Floating Glass Cards + 3D Golden Globe + 5,400+ Students Badge */}
        <div className="flex-1 relative w-full max-w-[540px] h-[480px] sm:h-[530px] flex items-center justify-center">
          {/* Card 1: 10K+ Digital & Physical Books (Top card, tilted) */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ rotate: 2, scale: 1.02 }}
            className="absolute top-2 right-6 sm:right-14 w-[310px] sm:w-[350px] rounded-3xl p-6 sm:p-7 backdrop-blur-2xl bg-white/[0.04] border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.55)] z-20 group"
          >
            {/* 3 Books Spines Icon Badge */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center mb-5 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              {/* Three vertical slanted book spines (|||\) */}
              <div className="flex items-center gap-1">
                <span className="w-1 h-5 bg-amber-400 rounded-sm"></span>
                <span className="w-1 h-5 bg-amber-400/80 rounded-sm"></span>
                <span className="w-1 h-5 bg-amber-400/60 rounded-sm transform rotate-12"></span>
              </div>
            </div>

            <div className="relative z-10 max-w-[190px] sm:max-w-[210px]">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                10K+
              </h3>
              <p className="text-sm font-medium text-slate-300">
                Digital & Physical Books
              </p>
            </div>
          </motion.div>

          {/* 3D Realistic Golden Globe on Stand positioned beside Card 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="absolute top-[-25px] sm:top-[-35px] right-[-10px] sm:right-[-25px] w-40 sm:w-48 h-40 sm:h-48 z-30 pointer-events-auto cursor-pointer drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)]"
          >
            <div className="relative w-full h-full">
              <img
                src="/golden_globe.jpg"
                alt="3D Golden Globe"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(245,158,11,0.3)] transition-transform duration-500 hover:rotate-6"
                style={{ mixBlendMode: "screen" }}
              />
            </div>
          </motion.div>

          {/* Card 2: 5,400+ students (Bottom card, overlapping) */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="absolute bottom-6 left-2 sm:left-6 w-[270px] sm:w-[300px] rounded-3xl p-6 sm:p-7 backdrop-blur-2xl bg-white/[0.04] border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.55)] z-20"
          >
            {/* Student profile circle icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 flex items-center justify-center mb-5 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Users className="w-6 h-6" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
              5,400+
            </h3>
            <p className="text-sm font-medium text-slate-300">students</p>
          </motion.div>

          {/* 4-point Star Sparkle on bottom right matching screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-12 right-6 sm:right-10 z-20"
          >
            <div className="relative">
              <svg
                className="w-10 h-10 text-slate-300/60 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] animate-pulse"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Interactive Catalog Section */}
      <section id="catalog" className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-white/[0.08] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Live Smart Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Books & Literature
            </h2>
            <p className="text-slate-400 mt-2">
              Browse physical and digital copies with instant borrower verification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/manager-dashboard">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-semibold transition-all">
                <BookOpen className="w-4 h-4" /> Manage Inventory & Borrowers
              </button>
            </Link>
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {books.map((book) => {
            const isBorrowedByMe = borrowRecords.some(
              (r) => r.bookId === book.id && r.status === "active" && r.studentId === studentForm.id
            );

            return (
              <motion.div
                key={book.id}
                whileHover={{ y: -6 }}
                className="rounded-2xl p-4 bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/30 transition-all flex flex-col group backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
              >
                {/* Book Cover Image */}
                <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-900 mb-4 border border-white/5">
                  <img
                    src={book.image || "/gatsby_cover.jpg"}
                    alt={book.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/70 backdrop-blur-md text-amber-300 border border-white/10">
                    {book.copies > 0 ? `${book.copies} left` : "Out of stock"}
                  </span>
                  <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900/80 text-slate-300 border border-white/5">
                    {book.category}
                  </span>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-medium">
                    {book.author}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {book.description || `ISBN: ${book.isbn}`}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    {book.isbn.substring(0, 10)}...
                  </span>

                  {isBorrowedByMe ? (
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Borrowed
                    </span>
                  ) : (
                    <button
                      onClick={() => setBorrowModalBook(book)}
                      disabled={book.copies === 0}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        book.copies > 0
                          ? "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                          : "bg-white/5 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      {book.copies > 0 ? "Borrow Now" : "Unavailable"}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Borrow Confirmation Modal */}
      {borrowModalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-3xl bg-[#121620] border border-white/15 p-6 sm:p-8 shadow-2xl relative"
          >
            {borrowSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Book Borrowed Successfully!</h3>
                <p className="text-sm text-slate-400">
                  Your loan record has been registered with the Library Manager. Return date is in 14 days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBorrow} className="space-y-5">
                <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                  <img
                    src={borrowModalBook.image || "/gatsby_cover.jpg"}
                    alt={borrowModalBook.title}
                    className="w-16 h-22 object-cover rounded-lg border border-white/10"
                  />
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Borrow Book
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {borrowModalBook.title}
                    </h3>
                    <p className="text-xs text-slate-400">{borrowModalBook.author}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Student Details (Synced with Manager Portal)
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400">Student Name</label>
                      <input
                        required
                        value={studentForm.name}
                        onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">Student ID / Roll No</label>
                      <input
                        required
                        value={studentForm.id}
                        onChange={(e) => setStudentForm({ ...studentForm, id: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400">University Email</label>
                      <input
                        type="email"
                        required
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">Department</label>
                      <input
                        required
                        value={studentForm.department}
                        onChange={(e) => setStudentForm({ ...studentForm, department: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setBorrowModalBook(null)}
                    className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
                  >
                    Confirm & Borrow
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer id="about" className="w-full bg-[#080B10] border-t border-white/[0.08] py-12 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-amber-500/40 bg-amber-500/10 flex items-center justify-center">
              <Book className="w-4 h-4 text-amber-400" />
            </div>
            <span className="font-bold text-lg text-white">LibraCore</span>
            <span className="text-xs text-slate-500 ml-2">Next-Gen Smart Library Experience</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="#catalog" className="hover:text-white transition-colors">Explore</a>
            <Link href="/manager-dashboard" className="text-amber-400 hover:text-amber-300 transition-colors">
              Manager Portal
            </Link>
            <Link href="/student-dashboard" className="hover:text-white transition-colors">
              Student Dashboard
            </Link>
          </div>

          <div className="text-xs text-slate-500">
            &copy; 2026 LibraCore Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
