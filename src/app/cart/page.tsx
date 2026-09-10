"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, removeItem, total } = useCart();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="text-sm text-slate-500 hover:text-indigo-900">
          ← 전체 목록으로
        </Link>

        <h1 className="mt-8 text-4xl font-bold">장바구니</h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-lg border border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-500">장바구니가 비어 있습니다.</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-md bg-indigo-900 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-800"
            >
              전자책 둘러보기
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.price.toLocaleString()}원
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-500 hover:border-red-400 hover:text-red-500"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-baseline justify-between">
              <span className="text-lg font-bold">
                총 {items.length}권
              </span>
              <span className="text-3xl font-bold text-indigo-900">
                {total.toLocaleString()}원
              </span>
            </div>

             <Link
              href="/checkout"
              className="mt-8 block w-full rounded-md bg-indigo-900 py-4 text-center font-bold text-white hover:bg-indigo-800"
            >
              결제하기
            </Link>
            <p className="mt-3 text-center text-xs text-slate-400">
              테스트 결제입니다. 실제 금액이 청구되지 않습니다.
            </p>
          </>
        )}
      </div>
    </main>
  );
}