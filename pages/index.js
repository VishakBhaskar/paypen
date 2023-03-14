// import Header from "../components/Header";

// export default function Home() {
//   return <Header />;
// }
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="text-white body-font ">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link
          className="flex title-font font-medium items-center md:justify-start justify-center"
          href="/"
        >
          <span className="ml-3 text-xl">SAFE STRING</span>
        </Link>
      </div>
    </footer>
  );
}
