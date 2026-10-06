import type { Metadata } from "next";
import "./globals.css";
import { LibraryProvider } from "./context/LibraryContext";

export const metadata: Metadata = {
  title: "LibraCore — Smart Library Experience",
  description: "The Next-Gen Smart Library Experience. Discover, borrow, and manage academic resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen font-sans bg-[#0B0E14] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
        <LibraryProvider>{children}</LibraryProvider>
      </body>
    </html>
  );
}
