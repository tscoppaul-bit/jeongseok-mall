"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { createClient } from "@/lib/supabase";

export default function Header() {
  const { items } = useCart();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setEmail(session?.user?.email ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold tracking-widest text-indigo-900">
          JEONGSEOK MALL
        </Link>

        <div className="flex items-center gap-3">
          {email ? (
            <>
              <span className="hidden text-sm text-slate-500 sm:inline">
                {email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-500 hover:text-indigo-900"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-bold text-slate-500 hover:text-indigo-900"
            >
              로그인
            </Link>
          )}

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
      </div>
    </header>
  );
}