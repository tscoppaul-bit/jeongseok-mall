"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { createClient } from "@/lib/supabase";

export default function SuccessPage() {
  const params = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [message, setMessage] = useState("");
  const requested = useRef(false);

  useEffect(() => {
    if (requested.current) return;
    requested.current = true;

    const confirm = async () => {
      const paymentKey = params.get("paymentKey");
      const orderId = params.get("orderId");
      const amount = Number(params.get("amount"));

      if (!paymentKey || !orderId || !amount) {
        setStatus("error");
        setMessage("결제 정보가 올바르지 않습니다.");
        return;
      }

      const saved = sessionStorage.getItem("pendingOrder");
      const items = saved ? JSON.parse(saved) : [];

      if (items.length === 0) {
        setStatus("error");
        setMessage("주문 정보를 찾을 수 없습니다.");
        return;
      }

      const supabase = createClient();
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      const res = await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentKey, orderId, amount, items, accessToken }),
      });

      const result = await res.json();
      console.log("서버 응답:", res.status, result);

      if (!res.ok) {
        setStatus("error");
        setMessage("[" + res.status + "] " + (result.message ?? "결제 처리에 실패했습니다."));
        return;
      }

      sessionStorage.removeItem("pendingOrder");
      clearCart();
      setStatus("done");
    };

    confirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        {status === "loading" && (
          <p className="text-slate-400">결제를 확인하는 중입니다...</p>
        )}

        {status === "done" && (
          <>
            <h1 className="text-3xl font-bold">결제가 완료되었습니다</h1>
            <p className="mt-3 text-sm text-slate-500">
              구매하신 전자책은 내 서재에서 확인하실 수 있습니다.
            </p>
            <Link
              href="/library"
              className="mt-8 inline-block rounded-md bg-indigo-900 px-8 py-3 font-bold text-white hover:bg-indigo-800"
            >
              내 서재로 가기
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold">결제를 완료하지 못했습니다</h1>
            <p className="mt-3 text-sm text-slate-500">{message}</p>
            <Link
              href="/cart"
              className="mt-8 inline-block rounded-md border border-slate-300 px-8 py-3 font-bold hover:border-indigo-900"
            >
              장바구니로 돌아가기
            </Link>
          </>
        )}
      </div>
    </main>
  );
}