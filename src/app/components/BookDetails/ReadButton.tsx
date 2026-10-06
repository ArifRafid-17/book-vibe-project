"use client";
import React, { useContext } from "react";
import { BookType } from "../../types";
import { booksContext } from "@/src/Context/BooksContext";
import { Bounce, toast } from "react-toastify";

type ReadButtonProps = {
  book: BookType;
};

const ReadButton = ({ book }: ReadButtonProps) => {
  interface readBookType {
    readBooks: BookType[];
    setReadBooks: React.Dispatch<React.SetStateAction<BookType[]>>;
  }

  const { readBooks, setReadBooks } = useContext(booksContext) as readBookType;

  const handleReadBook = () => {
    setReadBooks([...readBooks, book]);

    toast.success(`${book.bookName} has been added to your read list!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <button
      onClick={() => handleReadBook()}
      className="px-7 py-3 rounded-lg border border-gray-300 text-[#131313] font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
    >
      Read
    </button>
  );
};

export default ReadButton;
