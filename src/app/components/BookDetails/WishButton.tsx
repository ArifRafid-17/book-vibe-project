"use client";
import React, { useContext } from "react";
import { BookType } from "../../types";
import { booksContext } from "@/src/Context/BooksContext";
import { Bounce, toast } from "react-toastify";

interface WishButtonProps {
  book: BookType;
}
const WishButtonPage = ({ book }: WishButtonProps) => {
  const { wishlistBooks, setWishlistBooks } = useContext(booksContext) as {
    wishlistBooks: BookType[];
    setWishlistBooks: React.Dispatch<React.SetStateAction<BookType[]>>;
  };

  const handleWishlistBook = () => {
    setWishlistBooks([...wishlistBooks, book]);
    toast.success(`${book.bookName} has been added to your wishlist!`, {
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
      onClick={() => handleWishlistBook()}
      className="px-7 py-3 rounded-lg bg-[#59C6D2] text-white font-semibold hover:bg-[#48b5c1] transition-colors cursor-pointer"
    >
      Wishlist
    </button>
  );
};

export default WishButtonPage;
