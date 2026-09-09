"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setMessage("");

    if (password.length < 6) {
      setMessage("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setMessage("가입 실패: " + error.message);
    } else {
      setMessage("가입이 완료되었습니다.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-3xl font-bold">회원가입</h1>
        <p className="mt-2 text-sm text-slate-500">
          정석몰 계정을 만들어 구매 내역을 관리하세요.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-bold">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-indigo-900"
            />
          </div>

          <div>
            <label className="text-sm font-bold">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상"
              className="mt-1 w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-indigo-900"
            />
          </div>

          <button
            onClick={handleSignup}
            disabled={loading || !email || !password}
            className="w-full rounded-md bg-indigo-900 py-3 font-bold text-white hover:bg-indigo-800 disabled:bg-slate-300"
          >
            {loading ? "처리 중..." : "가입하기"}
          </button>

          {message && (
            <p className="rounded-md bg-slate-100 p-3 text-sm text-slate-700">
              {message}
            </p>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-bold text-indigo-900">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}