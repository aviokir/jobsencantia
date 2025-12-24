import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-6 left-0 w-full flex justify-center z-50 pointer-events-auto">
      <nav className="
        flex items-center justify-between
        w-full max-w-4xl
        px-6 py-3
        bg-slate-900/80 backdrop-blur-sm
        border border-slate-800
        rounded-2xl
        text-white
        shadow-lg
      ">
        <Link href="/" className="text-lg font-bold">
          Encantia Careers
        </Link>

        <a
          href="https://encantia.xyz"
          className="text-slate-300 hover:text-white transition"
        >
          Volver a Encantia
        </a>
      </nav>
    </header>
  );
}

