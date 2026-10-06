import Image from "next/image";
import { notFound } from "next/navigation";
import { BookType } from "../../types";
import ReadButton from "../../components/BookDetails/ReadButton";
import WishButton from "../../components/BookDetails/WishButton";

const getBooks = async (): Promise<BookType[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/booksData.json`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};

interface BookDetailsPageProps {
  params: {
    bookId: string;
  };
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { bookId } = await params;

  const books = await getBooks();
  const book = books.find((b) => b.bookId === Number(bookId));

  if (!book) notFound();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="bg-[#F3F3F3] rounded-2xl flex items-center justify-center p-10">
        <div className="relative w-56 h-80">
          <Image
            src={book.image}
            alt={book.bookName}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold font-serif">{book.bookName}</h1>
        <p className="text-gray-600 font-medium">By : {book.author}</p>
        <p className="border-y border-gray-200 py-3 font-medium">
          {book.category}
        </p>
        <p className="text-gray-700 leading-relaxed">
          <span className="font-bold text-black">Review : </span>
          {book.review}
        </p>

        <div className="flex gap-3 items-center">
          <span className="font-bold">Tag</span>
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#23BE0A]/5 text-[#23BE0A] text-sm font-semibold px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-y-2 max-w-sm text-gray-600">
          <span>Number of Pages:</span>
          <span className="font-semibold text-black">{book.totalPages}</span>
          <span>Publisher:</span>
          <span className="font-semibold text-black">{book.publisher}</span>
          <span>Year of Publishing:</span>
          <span className="font-semibold text-black">
            {book.yearOfPublishing}
          </span>
          <span>Rating:</span>
          <span className="font-semibold text-black">{book.rating}</span>
        </div>

        {/* Action Buttons */}

        <div className="flex gap-4 pt-4">
          <ReadButton book={book} />
          <WishButton book={book} />
        </div>
      </div>
    </section>
  );
};

export default BookDetailsPage;
