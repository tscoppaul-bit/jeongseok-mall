"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function FailPage() {
  const params = useSearchParams();
  const message = params.get("message") ?? "결제가 취소되었거나 실패했습니다.";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">결제가 완료되지 않았습니다</h1>
        <p className="mt-3 text-sm text-slate-500">{message}</p>

        <Link
          href="/cart"
          className="mt-8 inline-block rounded-md bg-indigo-900 px-8 py-3 font-bold text-white hover:bg-indigo-800"
        >
          장바구니로 돌아가기
        </Link>
      </div>
    </main>
  );
}