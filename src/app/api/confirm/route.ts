import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const { paymentKey, orderId, amount, items, accessToken } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ message: "주문 정보가 없습니다." }, { status: 400 });
  }

  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ message: "결제 설정이 없습니다." }, { status: 500 });
  }

  const auth = Buffer.from(secretKey + ":").toString("base64");

  const tossRes = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: "Basic " + auth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  const payment = await tossRes.json();

  if (!tossRes.ok) {
    console.error("결제 승인 실패:", payment.message);
    return NextResponse.json(
      { message: "결제 승인에 실패했습니다." },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: "Bearer " + accessToken } } }
  );

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
  }

  const rows = items.map((item: { id: string; price: number }) => ({
    user_id: user.id,
    book_id: item.id,
    price: item.price,
  }));

  const { error } = await supabase.from("orders").insert(rows);

  if (error) {
    console.error("주문 저장 실패:", error.message, "orderId:", orderId);
    return NextResponse.json(
      { message: "결제는 완료되었으나 주문 저장에 실패했습니다. 고객센터로 문의해주세요." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}