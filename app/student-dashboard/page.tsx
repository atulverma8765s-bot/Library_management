"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Bell,
  Search,
  BookOpen,
  CheckCircle,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  BookMarked,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useLibrary } from "../context/LibraryContext";

export default function StudentDashboard() {
  const { books, borrowRecords, currentStudent, borrowBook, returnBook } = useLibrary();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();

  // Find loans belonging to current student
  const studentLoans = borrowRecords.filter(
    (r) => r.studentId === currentStudent.id && r.status === "active"
  );

  const categories = ["All", ...Array.from(new Set(books.map((b) => b.category)))];

  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.isbn.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBorrow = (bookId: string, title: string) => {
    const success = borrowBook(bookId, currentStudent);
    if (success) {
      setToastMessage(`Successfully borrowed "${title}". Manager records updated!`);
      setTimeout(() => setToastMessage(null), 3500);
    } else {
      setToastMessage(`Unable to borrow. Check availability or active loans.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleReturn = (recordId: string, title: string) => {
    returnBook(recordId);
    setToastMessage(`Returned "${title}". Thank you!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 z-50 bg-amber-500 text-slate-950 px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-2 border border-amber-300"
          >
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <header className="bg-[#121620]/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl border border-amber-500/40 bg-amber-500/10 flex items-center justify-center transition-all group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                <BookOpen className="text-amber-400 w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block leading-none">
                  LibraCore
                </span>
                <span className="text-[11px] font-semibold text-cyan-400 tracking-wider uppercase">
                  Student Learning Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-5">
            {/* Student Profile Pill */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                {currentStudent.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-tight">{currentStudent.name}</p>
                <p className="text-[10px] text-slate-400 font-mono">{currentStudent.id}</p>
              </div>
            </div>

            <Link href="/manager-dashboard">
              <button className="text-xs font-semibold px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-all flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Manager Portal
              </button>
            </Link>

            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Student Workspace */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 space-y-12">
        {/* Banner with Student Info */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Active Session
            </span>
            <h1 className="text-3xl font-extrabold text-white">
              Welcome back, {currentStudent.name}!
            </h1>
            <p className="text-sm text-slate-400">
              Department: {currentStudent.department} &bull; University ID: {currentStudent.id}
            </p>
          </div>

          <div className="flex gap-4 z-10">
            <div className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <span className="text-2xl font-bold text-amber-400 block">{studentLoans.length}</span>
              <span className="text-[11px] text-slate-400 font-medium">Currently Borrowed</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <span className="text-2xl font-bold text-white block">{books.length}</span>
              <span className="text-[11px] text-slate-400 font-medium">Total Catalog Titles</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: MY ACTIVE LOANS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <BookMarked className="w-5 h-5 text-amber-400" /> My Borrowed Books ({studentLoans.length})
            </h2>
            <span className="text-xs text-slate-400">
              Real-time synchronization with Manager Records
            </span>
          </div>

          {studentLoans.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="rounded-2xl p-5 bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-all flex gap-4 backdrop-blur-md group"
                >
                  <img
                    src={loan.bookImage || "/gatsby_cover.jpg"}
                    alt={loan.bookTitle}
                    className="w-20 h-28 object-cover rounded-xl border border-white/10 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3" /> Due: {loan.dueDate}
                      </span>
                      <h3 className="font-bold text-white text-base leading-snug mt-1.5 line-clamp-1">
                        {loan.bookTitle}
                      </h3>
                      <p className="text-xs text-slate-400">{loan.bookAuthor}</p>
                    </div>

                    <button
                      onClick={() => handleReturn(loan.id, loan.bookTitle)}
                      className="w-full mt-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
                    >
                      Return Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-slate-500 space-y-2">
              <p className="text-sm font-medium">You currently have no active book loans.</p>
              <p className="text-xs">Browse the catalog below to borrow books instantly.</p>
            </div>
          )}
        </section>

        {/* SECTION 2: LIBRARY CATALOG */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-cyan-400" /> Explore Catalog
            </h2>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search title, author, ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "bg-white/5 hover:bg-white/10 text-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Book Catalog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => {
              const hasBorrowedThis = studentLoans.some((l) => l.bookId === book.id);

              return (
                <div
                  key={book.id}
                  className="rounded-2xl p-5 bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col group backdrop-blur-md"
                >
                  <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-900 mb-4 border border-white/5">
                    <img
                      src={book.image || "/gatsby_cover.jpg"}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80";
                      }}
                    />
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-black/70 backdrop-blur-md text-amber-300 border border-white/10">
                      {book.copies > 0 ? `${book.copies} in stock` : "Unavailable"}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {book.category}
                    </span>
                    <h3 className="font-bold text-white text-base leading-snug line-clamp-1 mt-1 group-hover:text-amber-300 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{book.author}</p>
                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {book.description || `ISBN: ${book.isbn}`}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    {hasBorrowedThis ? (
                      <span className="w-full py-2.5 rounded-xl font-semibold text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-center block">
                        Currently Borrowed by You
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBorrow(book.id, book.title)}
                        disabled={book.copies === 0}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                          book.copies > 0
                            ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-[1.01]"
                            : "bg-white/5 text-slate-500 cursor-not-allowed"
                        }`}
                      >
                        {book.copies > 0 ? "Borrow Book" : "Out of Stock"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredBooks.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-500">
                No catalog titles match your search criteria.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
