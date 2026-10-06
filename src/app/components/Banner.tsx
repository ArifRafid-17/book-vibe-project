import Image from "next/image";
import Link from "next/link";
import heroBook from "../assets/heroBook.png"; 

export default function Banner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-16">
      <div className="bg-[#131313]/[0.05] rounded-3xl px-8 py-14 sm:px-14 sm:py-20 lg:py-24 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[52px] lg:leading-[68px] font-bold text-[#131313] font-serif">
            Books to freshen up your bookshelf
          </h1>

          <div>
            <Link
              href="#books"
              className="inline-block px-7 py-4 rounded-xl text-white font-bold text-lg bg-[#23BE0A] hover:bg-[#1fa308] transition-all active:scale-95 shadow-sm"
            >
              View The List
            </Link>
          </div>
        </div>

        {/* Right Featured Book Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-56 sm:w-72 lg:w-80 aspect-[3/4] drop-shadow-2xl">
            <Image
              src={heroBook}
              alt="The Dating Playbook for Men"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}