"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function Header() {
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold tracking-widest text-indigo-900">
          JEONGSEOK MALL
        </Link>

        <Link
          href="/cart"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold hover:border-indigo-900 hover:text-indigo-900"
        >
          장바구니
          {items.length > 0 && (
            <span className="ml-2 rounded-full bg-indigo-900 px-2 py-0.5 text-xs text-white">
              {items.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}