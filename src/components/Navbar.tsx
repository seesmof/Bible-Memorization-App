import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white rounded-md flex gap-3 w-full">
      <Link href={"/"} className="flex-1 text-center p-3 hover:bg-stone-50">
        Free
      </Link>
      <Link
        href={"/books"}
        className="flex-1 text-center p-3 hover:bg-stone-50"
      >
        By Book
      </Link>
    </nav>
  );
}
