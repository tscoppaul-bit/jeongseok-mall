import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "@/data/books";
import AddToCartButton from "@/components/AddToCartButton";

export default async function BookDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = books.find((b) => b.id === id);

  if (!book) notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="text-sm text-slate-500 hover:text-indigo-900">
          ← 전체 목록으로
        </Link>

        <h1 className="mt-8 text-4xl font-bold">{book.title}</h1>
        <p className="mt-2 text-lg text-slate-600">{book.subtitle}</p>

        <div className="mt-8 rounded-lg border border-slate-200 p-6">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-indigo-900">
              {book.price.toLocaleString()}원
            </span>
            <span className="text-sm text-slate-500">PDF · {book.pages}쪽</span>
          </div>

          <AddToCartButton id={book.id} title={book.title} price={book.price} />

          <p className="mt-3 text-center text-xs text-slate-400">
            구매 후 30일 이내 재다운로드 가능
          </p>
        </div>
      </div>
    </main>
  );
}