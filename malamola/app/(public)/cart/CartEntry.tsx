"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatImageUrl } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

const CartEntry = ({ cartItem: { product, quantity } }: CartEntryProps) => {
  return (
    <div>
      <div className="my-3 flex flex-wrap items-center justify-between gap-3 rounded-xl p-4 odd:bg-neutral odd:bg-opacity-10">
        {/* Image on the left */}
        <Image
          src={formatImageUrl(product.imageUrl)}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />

        {/* Options on the right */}
        <div className="w-96 flex-col justify-end">
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEntry;
