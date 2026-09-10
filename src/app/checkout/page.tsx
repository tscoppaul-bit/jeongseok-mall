"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useCart } from "@/lib/cart";
import { createClient } from "@/lib/supabase";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [email, setEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const check = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
      setChecking(false);
    };
    check();
  }, []);

  const handlePay = async () => {
    setMessage("");

    try {
      sessionStorage.setItem("pendingOrder", JSON.stringify(items));

      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
      const tossPayments = await loadTossPayments(clientKey);

      const payment = tossPayments.payment({
        customerKey: "jeongseok_" + Date.now(),
      });

      const orderId = "order_" + Date.now();
      const orderName =
        items.length === 1
          ? items[0].title
          : items[0].title + " 외 " + (items.length - 1) + "건";

      await payment.requestPayment({
        method: "VIRTUAL_ACCOUNT",
        amount: { currency: "KRW", value: total },
        orderId,
        orderName,
        successUrl: window.location.origin + "/checkout/success",
        failUrl: window.location.origin + "/checkout/fail",
        virtualAccount: {
          cashReceipt: { type: "미발행" },
          useEscrow: false,
          validHours: 24,
        },
      });
    } catch (e) {
      setMessage("결제가 취소되었거나 결제창을 여는 중 문제가 발생했습니다.");
      console.error(e);
    }
  };

  if (checking) {
    return (
      <main className="min-h-screen bg-white">
        <p className="py-24 text-center text-slate-400">확인 중...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link href="/cart" className="text-sm text-slate-500 hover:text-indigo-900">
          ← 장바구니로
        </Link>

        <h1 className="mt-8 text-3xl font-bold">주문 결제</h1>

        <div className="mt-4 rounded-md bg-amber-50 p-4 text-sm text-amber-900">
          실습용 테스트 결제입니다. 실제 금액이 청구되지 않습니다.
        </div>

        {!email ? (
          <div className="mt-8 rounded-lg border border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-500">결제하려면 로그인이 필요합니다.</p>
            <Link
              href="/login"
              className="mt-4 inline-block rounded-md bg-indigo-900 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-800"
            >
              로그인하기
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-slate-300 p-12 text-center">
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
            <p className="mt-8 text-sm text-slate-500">주문자 {email}</p>

            <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between py-4">
                  <span className="font-bold">{item.title}</span>
                  <span className="text-slate-600">
                    {item.price.toLocaleString()}원
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-baseline justify-between">
              <span className="font-bold">총 {items.length}권</span>
              <span className="text-3xl font-bold text-indigo-900">
                {total.toLocaleString()}원
              </span>
            </div>

            <button
              onClick={handlePay}
              className="mt-8 w-full rounded-md bg-indigo-900 py-4 font-bold text-white hover:bg-indigo-800"
            >
              결제하기
            </button>

            {message && (
              <p className="mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-700">
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}