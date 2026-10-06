"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  copies: number;
  totalCopies: number;
  image: string;
  description?: string;
  publishedYear?: string;
};

export type BorrowRecord = {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookImage: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  department: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: "active" | "returned" | "overdue";
};

type LibraryContextType = {
  books: Book[];
  borrowRecords: BorrowRecord[];
  currentStudent: {
    name: string;
    id: string;
    email: string;
    phone: string;
    department: string;
  };
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  borrowBook: (bookId: string, studentDetails?: {
    name: string;
    id: string;
    email: string;
    phone: string;
    department: string;
  }) => boolean;
  returnBook: (recordId: string) => void;
  returnBookByBookId: (bookId: string) => void;
};

const initialBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    category: "Classic Literature",
    copies: 2,
    totalCopies: 4,
    image: "/gatsby_cover.jpg",
    description: "The timeless American classic following Jay Gatsby and his obsession with Daisy Buchanan.",
    publishedYear: "1925",
  },
  {
    id: "2",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson",
    isbn: "978-0262033848",
    category: "Computer Science",
    copies: 4,
    totalCopies: 6,
    image: "/algo_cover.jpg",
    description: "A comprehensive guide to algorithmic foundations, design, graph analysis, and dynamic programming.",
    publishedYear: "2022",
  },
  {
    id: "3",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn: "978-0062316097",
    category: "History",
    copies: 3,
    totalCopies: 5,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    description: "Surveying the history of humankind from the Stone Age up to the twenty-first century.",
    publishedYear: "2015",
  },
  {
    id: "4",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    isbn: "978-1449373320",
    category: "Software Engineering",
    copies: 1,
    totalCopies: 3,
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e37274?w=600&auto=format&fit=crop&q=80",
    description: "The big ideas behind reliable, scalable, and maintainable data systems.",
    publishedYear: "2017",
  },
  {
    id: "5",
    title: "Cosmos",
    author: "Carl Sagan",
    isbn: "978-0345539434",
    category: "Science",
    copies: 5,
    totalCopies: 5,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    description: "Exploration of the universe, science civilization, and human history by renowned astrophysicist Carl Sagan.",
    publishedYear: "1980",
  },
];

const initialBorrowRecords: BorrowRecord[] = [
  {
    id: "rec-1",
    bookId: "1",
    bookTitle: "The Great Gatsby",
    bookAuthor: "F. Scott Fitzgerald",
    bookImage: "/gatsby_cover.jpg",
    studentId: "STU-2024-1042",
    studentName: "Liam Henderson",
    studentEmail: "liam.henderson@university.edu",
    studentPhone: "+1 (555) 234-8901",
    department: "English Literature",
    borrowDate: "2026-09-28",
    dueDate: "2026-10-12",
    status: "active",
  },
  {
    id: "rec-2",
    bookId: "2",
    bookTitle: "Introduction to Algorithms",
    bookAuthor: "Thomas H. Cormen",
    bookImage: "/algo_cover.jpg",
    studentId: "STU-2024-0891",
    studentName: "Aarav Sharma",
    studentEmail: "aarav.sharma@university.edu",
    studentPhone: "+1 (555) 489-3210",
    department: "Computer Science & AI",
    borrowDate: "2026-09-25",
    dueDate: "2026-10-09",
    status: "active",
  },
  {
    id: "rec-3",
    bookId: "4",
    bookTitle: "Designing Data-Intensive Applications",
    bookAuthor: "Martin Kleppmann",
    bookImage: "https://images.unsplash.com/photo-1532012164546-f432f2e37274?w=600&auto=format&fit=crop&q=80",
    studentId: "STU-2024-2190",
    studentName: "Elena Rostova",
    studentEmail: "elena.rostova@university.edu",
    studentPhone: "+1 (555) 672-9904",
    department: "Information Technology",
    borrowDate: "2026-09-15",
    dueDate: "2026-09-29",
    status: "overdue",
  },
  {
    id: "rec-4",
    bookId: "3",
    bookTitle: "Sapiens: A Brief History of Humankind",
    bookAuthor: "Yuval Noah Harari",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    studentId: "STU-2024-1502",
    studentName: "Marcus Vance",
    studentEmail: "marcus.v@university.edu",
    studentPhone: "+1 (555) 891-2309",
    department: "Humanities & History",
    borrowDate: "2026-09-10",
    dueDate: "2026-09-24",
    returnDate: "2026-09-23",
    status: "returned",
  },
];

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>(initialBorrowRecords);

  const [currentStudent] = useState({
    name: "Alex Morgan",
    id: "STU-2024-7749",
    email: "alex.morgan@university.edu",
    phone: "+1 (555) 782-9014",
    department: "Computer Science",
  });

  // Load from local storage
  useEffect(() => {
    try {
      const storedBooks = localStorage.getItem("lib_books_v2");
      const storedRecords = localStorage.getItem("lib_borrow_records_v2");
      if (storedBooks) setBooks(JSON.parse(storedBooks));
      if (storedRecords) setBorrowRecords(JSON.parse(storedRecords));
    } catch {
      // fallback
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem("lib_books_v2", JSON.stringify(books));
      localStorage.setItem("lib_borrow_records_v2", JSON.stringify(borrowRecords));
    } catch {
      // ignore
    }
  }, [books, borrowRecords]);

  const addBook = (bookData: Omit<Book, "id">) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
      totalCopies: bookData.totalCopies || bookData.copies,
    };
    setBooks((prev) => [newBook, ...prev]);
  };

  const updateBook = (id: string, updatedFields: Partial<Book>) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const borrowBook = (
    bookId: string,
    studentDetails = currentStudent
  ): boolean => {
    const book = books.find((b) => b.id === bookId);
    if (!book || book.copies <= 0) return false;

    // Check if student already borrowed this active book
    const existingActive = borrowRecords.find(
      (r) => r.bookId === bookId && r.studentId === studentDetails.id && r.status === "active"
    );
    if (existingActive) return false;

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 14);

    const newRecord: BorrowRecord = {
      id: `rec-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookImage: book.image || "/gatsby_cover.jpg",
      studentId: studentDetails.id,
      studentName: studentDetails.name,
      studentEmail: studentDetails.email,
      studentPhone: studentDetails.phone,
      department: studentDetails.department,
      borrowDate: today.toISOString().split("T")[0],
      dueDate: due.toISOString().split("T")[0],
      status: "active",
    };

    setBorrowRecords((prev) => [newRecord, ...prev]);
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId ? { ...b, copies: Math.max(0, b.copies - 1) } : b
      )
    );
    return true;
  };

  const returnBook = (recordId: string) => {
    const record = borrowRecords.find((r) => r.id === recordId);
    if (!record || record.status === "returned") return;

    setBorrowRecords((prev) =>
      prev.map((r) =>
        r.id === recordId
          ? {
              ...r,
              status: "returned",
              returnDate: new Date().toISOString().split("T")[0],
            }
          : r
      )
    );

    setBooks((prev) =>
      prev.map((b) =>
        b.id === record.bookId ? { ...b, copies: b.copies + 1 } : b
      )
    );
  };

  const returnBookByBookId = (bookId: string) => {
    const activeRecord = borrowRecords.find(
      (r) => r.bookId === bookId && r.status === "active"
    );
    if (activeRecord) {
      returnBook(activeRecord.id);
    }
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        borrowRecords,
        currentStudent,
        addBook,
        updateBook,
        deleteBook,
        borrowBook,
        returnBook,
        returnBookByBookId,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}
