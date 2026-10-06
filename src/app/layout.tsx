import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import BooksProvider from "../Context/BooksContext";
import { ToastContainer } from "react-toastify";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Vibe",
  description: "A book review website that allows users to share their thoughts and opinions on books they've read.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`
      style={{ colorScheme: "light" }}
    >
      <body>
        <BooksProvider>
          <Navbar></Navbar>
          <div> {children} </div>
        </BooksProvider>


        <ToastContainer/>
      </body>
    </html>
  );
}
