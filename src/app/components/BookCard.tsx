import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookType } from '../types';

interface BookCardProps {
    book: BookType;
}

const BookCard = ({ book }: BookCardProps) => {
    const { bookId, bookName, author, image, rating, category, tags } = book;

    return (
        <Link
            href={`/Books/${bookId}`}
            className="flex flex-col p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#23BE0A]/50 hover:shadow-md transition-all duration-300"
        >
            {/* Book Image Container */}
            <div className="w-full h-56 bg-[#F3F3F3] rounded-2xl flex items-center justify-center p-6 relative overflow-hidden">
                <div className="relative w-32 h-44 drop-shadow-sm">
                    <Image
                        src={image}
                        alt={bookName}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
                {tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-[#23BE0A]/5 text-[#23BE0A] text-xs font-semibold px-3 py-1 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Book Title & Author */}
            <div className="mt-4 flex-grow">
                <h3 className="text-xl font-bold text-[#131313] font-serif line-clamp-1">
                    {bookName}
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-2">
                    By : {author}
                </p>
            </div>

            {/* Dashed Divider */}
            <div className="border-t border-dashed border-gray-200 my-4" />

            {/* Category & Rating */}
            <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                <span>{category}</span>
                <div className="flex items-center gap-1.5">
                    <span>{rating.toFixed(2)}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
};

export default BookCard;