import Link from "next/link";
import { books } from "@/data/books";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold tracking-widest text-indigo-900">
          JEONGSEOK MALL
        </p>
        <h1 className="mt-4 text-5xl font-bold">정석몰</h1>
        <p className="mt-4 text-lg text-slate-600">
          기본을 다지는 PDF 전자책, 정석강의.
        </p>

        <h2 className="mt-16 text-xl font-bold">전체 전자책 {books.length}종</h2>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <li key={book.id}>
              <Link
                href={`/books/${book.id}`}
                className="block h-full rounded-lg border border-slate-200 p-5 transition hover:border-indigo-900 hover:shadow-sm"
              >
                <h3 className="text-base font-bold">{book.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{book.subtitle}</p>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-indigo-900">
                    {book.price.toLocaleString()}원
                  </span>
                  <span className="text-xs text-slate-400">{book.pages}쪽</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}