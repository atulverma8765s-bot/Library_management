"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Users,
  Plus,
  Search,
  Trash2,
  Edit,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Clock,
  LogOut,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  RotateCcw,
  UserCheck,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useLibrary, Book, BorrowRecord } from "../context/LibraryContext";

export default function ManagerDashboard() {
  const { books, borrowRecords, addBook, deleteBook, updateBook, returnBook, borrowBook } = useLibrary();
  const [activeTab, setActiveTab] = useState<"inventory" | "add" | "borrowers">("inventory");
  const [searchTerm, setSearchTerm] = useState("");
  const [borrowerSearch, setBorrowerSearch] = useState("");
  const [borrowerFilter, setBorrowerFilter] = useState<"all" | "active" | "overdue" | "returned">("all");
  const [selectedStudent, setSelectedStudent] = useState<BorrowRecord | null>(null);
  const router = useRouter();

  // Add Book Form State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "Computer Science",
    copies: "3",
    description: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showToast, setShowToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Preset covers for rapid selection
  const presetCovers = [
    { name: "Classic Literature", url: "/gatsby_cover.jpg" },
    { name: "Algorithms & Tech", url: "/algo_cover.jpg" },
    { name: "Science & Cosmos", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80" },
    { name: "Philosophy & History", url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80" },
    { name: "Modern Architecture", url: "https://images.unsplash.com/photo-1532012164546-f432f2e37274?w=600&auto=format&fit=crop&q=80" },
  ];

  // Handle Image File Upload (Base64 data url)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setNewBook((prev) => ({ ...prev, image: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage =
      newBook.image ||
      imagePreview ||
      "/gatsby_cover.jpg";

    addBook({
      title: newBook.title,
      author: newBook.author,
      isbn: newBook.isbn,
      category: newBook.category,
      copies: parseInt(newBook.copies) || 1,
      totalCopies: parseInt(newBook.copies) || 1,
      image: finalImage,
      description: newBook.description,
    });

    setNewBook({
      title: "",
      author: "",
      isbn: "",
      category: "Computer Science",
      copies: "3",
      description: "",
      image: "",
    });
    setImagePreview("");
    setShowToast({ message: "Book and cover image successfully added to catalog!", type: "success" });
    setTimeout(() => setShowToast(null), 3500);
    setActiveTab("inventory");
  };

  const activeLoans = borrowRecords.filter((r) => r.status === "active");
  const overdueLoans = borrowRecords.filter((r) => r.status === "overdue");

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.isbn.includes(searchTerm) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBorrowers = borrowRecords.filter((rec) => {
    const matchesFilter =
      borrowerFilter === "all" ? true : rec.status === borrowerFilter;
    const matchesSearch =
      rec.studentName.toLowerCase().includes(borrowerSearch.toLowerCase()) ||
      rec.studentId.toLowerCase().includes(borrowerSearch.toLowerCase()) ||
      rec.studentEmail.toLowerCase().includes(borrowerSearch.toLowerCase()) ||
      rec.bookTitle.toLowerCase().includes(borrowerSearch.toLowerCase()) ||
      rec.department.toLowerCase().includes(borrowerSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 z-50 bg-amber-500 text-slate-950 px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-2 border border-amber-300"
          >
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
            {showToast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
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
                <span className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase">
                  Library Manager Console
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                View Landing Page
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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Total Book Titles</p>
              <p className="text-2xl font-black text-white">{books.length}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Active Borrowers</p>
              <p className="text-2xl font-black text-white">{activeLoans.length}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Overdue Books</p>
              <p className="text-2xl font-black text-rose-400">{overdueLoans.length}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Total Records Logged</p>
              <p className="text-2xl font-black text-white">{borrowRecords.length}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 gap-2">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === "inventory"
                ? "text-amber-400 border-amber-400 bg-amber-500/5 rounded-t-xl"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Catalog Inventory ({books.length})
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === "add"
                ? "text-amber-400 border-amber-400 bg-amber-500/5 rounded-t-xl"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Book & Cover Image
          </button>

          <button
            onClick={() => setActiveTab("borrowers")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === "borrowers"
                ? "text-amber-400 border-amber-400 bg-amber-500/5 rounded-t-xl"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Student Borrow Details ({borrowRecords.length})
          </button>
        </div>

        {/* TAB 1: INVENTORY */}
        {activeTab === "inventory" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search book title, author, ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                />
              </div>

              <button
                onClick={() => setActiveTab("add")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all"
              >
                <Plus className="w-4 h-4" /> Add New Book
              </button>
            </div>

            {/* Inventory Grid with Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="rounded-2xl p-5 bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-all flex gap-4 group"
                >
                  {/* Book Image */}
                  <div className="w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-white/10 relative shadow-md">
                    <img
                      src={book.image || "/gatsby_cover.jpg"}
                      alt={book.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80";
                      }}
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {book.category}
                      </span>
                      <h4 className="font-bold text-white text-base leading-snug mt-2 line-clamp-2">
                        {book.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{book.author}</p>
                      <p className="text-[11px] font-mono text-slate-500 mt-1">ISBN: {book.isbn}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Stock Copies</span>
                        <span
                          className={`text-sm font-bold ${
                            book.copies > 0 ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {book.copies} available
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => deleteBook(book.id)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                          title="Delete book"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredBooks.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-500">
                  No books found in catalog. Click "Add New Book" to add one!
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: ADD BOOK & COVER IMAGE */}
        {activeTab === "add" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto rounded-3xl bg-white/[0.03] border border-white/10 p-8 sm:p-10 shadow-2xl"
          >
            <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Add New Book to Inventory</h3>
                <p className="text-xs text-slate-400">
                  Enter complete book metadata and upload or select its cover artwork.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddBook} className="space-y-8">
              {/* IMAGE UPLOAD & PREVIEW SECTION */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <label className="block text-sm font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-400" /> Book Cover Artwork / Image
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Visual Preview */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-36 h-52 rounded-xl border-2 border-dashed border-white/20 bg-slate-900 flex items-center justify-center overflow-hidden relative group">
                      {imagePreview || newBook.image ? (
                        <img
                          src={imagePreview || newBook.image}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-3">
                          <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                          <span className="text-[11px] text-slate-400 font-medium">
                            No image selected
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-2 font-mono">Live Preview</span>
                  </div>

                  {/* Upload Controls */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <p className="text-xs text-slate-300 font-semibold mb-2">
                        Option A: Upload Image File from Computer
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all"
                      >
                        <Upload className="w-4 h-4 text-amber-400" /> Choose Image File (.jpg, .png, .webp)
                      </button>
                    </div>

                    <div>
                      <p className="text-xs text-slate-300 font-semibold mb-2">
                        Option B: Or Enter Image URL
                      </p>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={newBook.image}
                        onChange={(e) => {
                          setNewBook({ ...newBook, image: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Preset covers */}
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-2">
                        Or Pick a High-Res Preset Cover:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {presetCovers.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setImagePreview(preset.url);
                              setNewBook({ ...newBook, image: preset.url });
                            }}
                            className="text-[11px] px-3 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-white/10 transition-colors"
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOOK DETAILS FORM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Book Title *
                  </label>
                  <input
                    required
                    placeholder="e.g. Clean Architecture & Software Design"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Author(s) *
                  </label>
                  <input
                    required
                    placeholder="e.g. Robert C. Martin"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    ISBN Number *
                  </label>
                  <input
                    required
                    placeholder="978-0134494166"
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Category *
                    </label>
                    <select
                      value={newBook.category}
                      onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                      className="w-full px-4 py-3 bg-[#121620] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Classic Literature">Classic Literature</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="Economics">Economics</option>
                      <option value="Mathematics">Mathematics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Copies in Stock *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={newBook.copies}
                      onChange={(e) => setNewBook({ ...newBook, copies: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Synopsis / Summary
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of the book content and syllabus alignment..."
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab("inventory")}
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
                >
                  <Plus className="w-4 h-4" /> Save Book to Catalog
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 3: STUDENT BORROW DETAILS */}
        {activeTab === "borrowers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Search and Filters Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student name, ID, book title, dept..."
                  value={borrowerSearch}
                  onChange={(e) => setBorrowerSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-2">
                {(["all", "active", "overdue", "returned"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setBorrowerFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      borrowerFilter === filter
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                        : "bg-white/5 hover:bg-white/10 text-slate-400"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Students Borrow Table */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-5">Student Information</th>
                      <th className="py-4 px-5">Borrowed Book</th>
                      <th className="py-4 px-5">Issue Date</th>
                      <th className="py-4 px-5">Due Date</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {filteredBorrowers.map((rec) => (
                      <tr
                        key={rec.id}
                        className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                        onClick={() => setSelectedStudent(rec)}
                      >
                        {/* Student Details */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 text-xs flex-shrink-0">
                              {rec.studentName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="font-bold text-white group-hover:text-amber-300 transition-colors">
                                {rec.studentName}
                              </p>
                              <p className="text-xs text-slate-400 font-mono">{rec.studentId}</p>
                              <p className="text-[11px] text-slate-500">{rec.department}</p>
                            </div>
                          </div>
                        </td>

                        {/* Borrowed Book */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={rec.bookImage || "/gatsby_cover.jpg"}
                              alt={rec.bookTitle}
                              className="w-9 h-13 object-cover rounded-md border border-white/10 flex-shrink-0"
                            />
                            <div>
                              <p className="font-semibold text-white leading-tight line-clamp-1">
                                {rec.bookTitle}
                              </p>
                              <p className="text-xs text-slate-400">{rec.bookAuthor}</p>
                            </div>
                          </div>
                        </td>

                        {/* Borrow Date */}
                        <td className="py-4 px-5 text-slate-300 text-xs font-mono">
                          {rec.borrowDate}
                        </td>

                        {/* Due Date */}
                        <td className="py-4 px-5 text-slate-300 text-xs font-mono">
                          {rec.dueDate}
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-5">
                          {rec.status === "active" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Active Loan
                            </span>
                          )}
                          {rec.status === "overdue" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Overdue
                            </span>
                          )}
                          {rec.status === "returned" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-slate-400 border border-white/10">
                              <Check className="w-3.5 h-3.5" />
                              Returned
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedStudent(rec)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                            title="View student profile & contact"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {rec.status !== "returned" ? (
                            <button
                              onClick={() => {
                                returnBook(rec.id);
                                setShowToast({
                                  message: `Book returned! Stock updated for "${rec.bookTitle}".`,
                                  type: "success",
                                });
                                setTimeout(() => setShowToast(null), 3000);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all inline-flex items-center gap-1"
                              title="Mark as Returned"
                            >
                              <RotateCcw className="w-3 h-3" /> Mark Returned
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-500 font-mono">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}

                    {filteredBorrowers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500">
                          No student borrower records found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* STUDENT PROFILE & BORROW DETAIL MODAL */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-[#121620] border border-white/15 p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="flex justify-between items-start pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-base">
                    {selectedStudent.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedStudent.studentName}</h3>
                    <p className="text-xs font-mono text-amber-400">{selectedStudent.studentId}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Student Details Grid */}
              <div className="py-5 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="space-y-1">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Department / Class
                    </span>
                    <p className="font-semibold text-white text-sm">{selectedStudent.department}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-400" /> Email Address
                    </span>
                    <p className="font-semibold text-white text-sm truncate">{selectedStudent.studentEmail}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" /> Phone Number
                    </span>
                    <p className="font-semibold text-white text-sm">{selectedStudent.studentPhone}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" /> Due Date
                    </span>
                    <p className="font-semibold text-white text-sm font-mono">{selectedStudent.dueDate}</p>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex gap-4 items-center">
                  <img
                    src={selectedStudent.bookImage || "/gatsby_cover.jpg"}
                    alt={selectedStudent.bookTitle}
                    className="w-14 h-20 object-cover rounded-lg border border-white/10"
                  />
                  <div>
                    <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                      Borrowed Title
                    </span>
                    <h4 className="font-bold text-white text-base leading-snug">
                      {selectedStudent.bookTitle}
                    </h4>
                    <p className="text-xs text-slate-400">{selectedStudent.bookAuthor}</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">
                      Loaned on {selectedStudent.borrowDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Current Status:</span>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      selectedStudent.status === "active"
                        ? "text-emerald-400"
                        : selectedStudent.status === "overdue"
                        ? "text-rose-400"
                        : "text-slate-400"
                    }`}
                  >
                    {selectedStudent.status}
                  </span>
                </div>

                {selectedStudent.status !== "returned" && (
                  <button
                    onClick={() => {
                      returnBook(selectedStudent.id);
                      setSelectedStudent(null);
                      setShowToast({
                        message: `Marked "${selectedStudent.bookTitle}" as returned!`,
                        type: "success",
                      });
                      setTimeout(() => setShowToast(null), 3000);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
                  >
                    Mark Book as Returned
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
