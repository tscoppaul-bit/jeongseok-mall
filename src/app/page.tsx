import Link from "next/link";
import { createServerClient } from "@/lib/supabase-server";

type Book = {
  id: string;
  title: string;
  subtitle: string | null;
  price: number;
  pages: number | null;
};

export default async function Home() {
  const supabase = createServerClient();

  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    .order("id");

  if (error) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-2xl font-bold">전자책을 불러오지 못했습니다</h1>
          <p className="mt-4 text-sm text-slate-500">{error.message}</p>
        </div>
      </main>
    );
  }

  const list = (books ?? []) as Book[];

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

        <h2 className="mt-16 text-xl font-bold">전체 전자책 {list.length}종</h2>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((book) => (
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