"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Listed Books", href: "/listed-books" },
    { name: "Pages to Read", href: "/read-books" },
  ];

  const renderLinks = () => (
    <>
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`px-4 py-2 rounded-lg text-base transition-colors ${
                isActive
                  ? "border border-[#23BE0A] text-[#23BE0A] font-semibold hover:bg-[#23BE0A]/10"
                  : "text-gray-600 hover:text-gray-900 font-medium border border-transparent"
              }`}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <header className="w-full bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile menu dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} role="button" className="btn btn-ghost p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg bg-base-100 rounded-box w-52 gap-2 z-50"
            >
              {renderLinks()}
            </ul>
          </div>

          <Link href="/" className="text-2xl sm:text-3xl font-extrabold text-[#131313]">
            Book Vibe
          </Link>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <ul className="hidden lg:flex items-center gap-3 list-none m-0 p-0">
          {renderLinks()}
        </ul>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 sm:px-7 sm:py-3 rounded-lg text-white font-semibold text-sm sm:text-base bg-[#23BE0A] hover:bg-[#1fa308] transition-colors inline-flex items-center justify-center"
          >
            Sign In
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 sm:px-7 sm:py-3 rounded-lg text-white font-semibold text-sm sm:text-base bg-[#59C6D2] hover:bg-[#48b5c1] transition-colors inline-flex items-center justify-center"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}