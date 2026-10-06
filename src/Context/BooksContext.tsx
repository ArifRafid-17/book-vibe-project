"use client";
import React, { createContext, useState } from 'react';

export const booksContext = createContext ({});

interface BooksContextProps {
    children: React.ReactNode;
}
const BooksContext = ({children}: BooksContextProps) => {

    const [readBooks, setReadBooks] = useState([]);
    const [wishlistBooks, setWishlistBooks] = useState([]);


    const sharedData = {
        readBooks,
        setReadBooks,
        wishlistBooks,
        setWishlistBooks,
    };

    return (
        <booksContext.Provider value={sharedData}>
            {children}
        </booksContext.Provider>
    );
};

export default BooksContext;
