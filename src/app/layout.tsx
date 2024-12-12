import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import SessionProvider from "./SessionProvider";
// import ThemeProvider from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookRunner",
  description: "All or Nothing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <SessionProvider>
            <Navbar />
            <main className="m-auto min-w-[300px] max-w-7xl p-4">
              {children}
            </main>
            <Footer />
          </SessionProvider>
      </body>
    </html>
  );
}
