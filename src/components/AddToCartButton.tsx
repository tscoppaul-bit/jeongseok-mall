"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function AddToCartButton({
  id,
  title,
  price,
}: {
  id: string;
  title: string;
  price: number;
}) {
  const { items, addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const alreadyInCart = items.some((item) => item.id === id);

  const handleClick = () => {
    addItem({ id, title, price });
    setJustAdded(true);
  };

  if (alreadyInCart) {
    return (
      <button
        disabled
        className="mt-6 w-full rounded-md bg-slate-200 py-3 font-bold text-slate-500"
      >
        {justAdded ? "장바구니에 담았습니다" : "이미 장바구니에 있습니다"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="mt-6 w-full rounded-md bg-indigo-900 py-3 font-bold text-white hover:bg-indigo-800"
    >
      장바구니 담기
    </button>
  );
}