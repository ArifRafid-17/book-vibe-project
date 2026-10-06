"use client";

import React, { useContext, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { booksContext } from "@/src/Context/BooksContext";
import { BookType } from "../types";

type TabType = "read" | "wishlist";
type SortType = "rating" | "totalPages" | "yearOfPublishing";

const sortOptions: { label: string; value: SortType }[] = [
  { label: "Rating", value: "rating" },
  { label: "Number of pages", value: "totalPages" },
  { label: "Publisher year", value: "yearOfPublishing" },
];

const ListedBooksPage = () => {
  const { readBooks, wishlistBooks } = useContext(booksContext) as {
    readBooks: BookType[];
    wishlistBooks: BookType[];
  };

  const [activeTab, setActiveTab] = useState<TabType>("read");
  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const books = useMemo(() => {
    const list = [...(activeTab === "read" ? readBooks : wishlistBooks)];
    if (sortBy) list.sort((a, b) => b[sortBy] - a[sortBy]);
    return list;
  }, [activeTab, readBooks, wishlistBooks, sortBy]);

  const activeSortLabel = sortOptions.find((o) => o.value === sortBy)?.label;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Heading */}
      <div className="bg-[#131313]/[0.05] rounded-2xl py-5 sm:py-7">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#131313]">
          Books
        </h2>
      </div>

      {/* Sort By Dropdown */}
      <div className="flex justify-center mt-8">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSortOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-[#23BE0A] hover:bg-[#1fa308] text-white font-semibold transition-colors cursor-pointer"
          >
            {activeSortLabel ? `Sort By : ${activeSortLabel}` : "Sort By"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isSortOpen && (
            <ul
              role="listbox"
              className="absolute left-0 right-0 top-full mt-2 z-10 rounded-lg bg-[#F3F3F3] shadow-md p-2 min-w-48"
            >
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={sortBy === option.value}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-center text-sm px-4 py-2 rounded-md hover:bg-white transition-colors cursor-pointer ${
                      sortBy === option.value
                        ? "text-[#23BE0A] font-semibold"
                        : "text-gray-600 font-medium"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mt-10 border-b border-gray-300">
        {(
          [
            { id: "read", label: "Read Books" },
            { id: "wishlist", label: "Wishlist Books" },
          ] as { id: TabType; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm sm:text-base cursor-pointer transition-colors ${
              activeTab === tab.id
                ? "border border-gray-300 border-b-white -mb-px rounded-t-lg text-[#131313] font-semibold bg-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Book List */}
      <div className="flex flex-col gap-6 mt-8">
        {books.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
            <p className="text-lg font-semibold text-[#131313] font-serif">
              {activeTab === "read"
                ? "No books marked as read yet"
                : "Your wishlist is empty"}
            </p>
            <p className="text-gray-500 mt-2">
              Open a book and use the{" "}
              {activeTab === "read" ? "Read" : "Wishlist"} button to add it
              here.
            </p>
            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 rounded-lg bg-[#23BE0A] hover:bg-[#1fa308] text-white font-semibold transition-colors"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          books.map((book) => (
            <article
              key={book.bookId}
              className="flex flex-col md:flex-row gap-6 p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white"
            >
              {/* Cover */}
              <div className="md:w-56 shrink-0 bg-[#F3F3F3] rounded-2xl flex items-center justify-center py-6">
                <div className="relative w-32 h-44 drop-shadow-sm">
                  <Image
                    src={book.image}
                    alt={book.bookName}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-[#131313] font-serif">
                  {book.bookName}
                </h3>
                <p className="text-sm font-medium text-gray-600 mt-2">
                  By : {book.author}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-[#131313]">
                      Tag
                    </span>
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#23BE0A]/5 text-[#23BE0A] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    Year of Publishing: {book.yearOfPublishing}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                    Publisher: {book.publisher}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    Page {book.totalPages}
                  </div>
                </div>

                {/* Dashed Divider */}
                <div className="border-t border-dashed border-gray-200 my-4" />

                {/* Category, Rating, Action */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1.5 rounded-full">
                    Category: {book.category}
                  </span>
                  <span className="bg-orange-50 text-orange-400 text-sm font-medium px-4 py-1.5 rounded-full">
                    Rating: {book.rating}
                  </span>
                  <Link
                    href={`/Books/${book.bookId}`}
                    className="px-5 py-1.5 rounded-full bg-[#23BE0A] hover:bg-[#1fa308] text-white text-sm font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default ListedBooksPage;
