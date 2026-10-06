import Banner from "./components/Banner";
import Books from "./Books/page";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
     <div>
        <Banner></Banner>
        <Books></Books>
     </div>
  );
}
