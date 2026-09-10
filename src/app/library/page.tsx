"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

type Order = {
  id: string;
  book_id: string;
  price: number;
  created_at: string;
  books: { title: string; subtitle: string | null } | null;
};

export default function LibraryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      setLoggedIn(true);

      const { data } = await supabase
        .from("orders")
        .select("id, book_id, price, created_at, books(title, subtitle)")
        .order("created_at", { ascending: false });

      setOrders((data ?? []) as unknown as Order[]);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">내 서재</h1>
        <p className="mt-2 text-sm text-slate-500">
          구매하신 전자책 목록입니다.
        </p>

        {loading && (
          <p className="mt-12 text-center text-slate-400">불러오는 중...</p>
        )}

        {!loading && !loggedIn && (
          <div className="mt-12 rounded-lg border border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-500">로그인이 필요합니다.</p>
            <Link
              href="/login"
              className="mt-4 inline-block rounded-md bg-indigo-900 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-800"
            >
              로그인하기
            </Link>
          </div>
        )}

        {!loading && loggedIn && orders.length === 0 && (
          <div className="mt-12 rounded-lg border border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-500">아직 구매한 전자책이 없습니다.</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-md bg-indigo-900 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-800"
            >
              전자책 둘러보기
            </Link>
          </div>
        )}

        {!loading && loggedIn && orders.length > 0 && (
          <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {orders.map((order) => (
              <li key={order.id} className="py-5">
                <p className="font-bold">
                  {order.books?.title ?? order.book_id}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {order.books?.subtitle}
                </p>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-sm text-slate-500">
                    {new Date(order.created_at).toLocaleDateString("ko-KR")} 구매
                  </span>
                  <span className="text-sm font-bold text-indigo-900">
                    {order.price.toLocaleString()}원
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}