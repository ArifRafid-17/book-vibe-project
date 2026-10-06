import React from "react";
import { BookType } from "../types";
import BookCard from "../components/BookCard";

const getBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/booksData.json`);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
};

const BookPage = async () => {
  const booksData = await getBooks();
  console.log(booksData); // Log the fetched data to the console
  return (
    <div>
      <section
        id="books"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#131313] font-serif mb-10">
          Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {booksData.map((book: BookType) => (
            <BookCard key={book.bookId} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BookPage;
