"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatImageUrl, formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// types -----------------------------------------------------------------------------------------------------
interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

const CartEntry = ({ cartItem: { product, quantity } }: CartEntryProps) => {
  // functions -----------------------------------------------------------------------------------------------
  const getQuantityOptions = (max: number, stock: number) => {
    // generate options for each cartItem quantity based on stock left
    const options: JSX.Element[] = [];
    for (let i = 1; i <= max; i++) {
      options.push(
        i <= stock ? (
          <option key={i} value={i}>
            {i}
          </option>
        ) : (
          <option key={i} value={i} disabled>
            {i}
          </option>
        ),
      );
    }

    return options;
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div>
      {/* Each entry div w/ border */}
      <div className="items-top my-3 flex flex-wrap gap-10 rounded-xl p-4 odd:bg-neutral odd:bg-opacity-10">
        {/* Image on the left */}
        <Image
          src={formatImageUrl(product.imageUrl)}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg object-cover"
        />

        {/* Options on the right */}
        <div className="h-full flex-col justify-between tracking-wide">
          {/* Title at the top links to the product/[id] page */}
          <Link href={"/products/" + product.id} className="text-xl font-bold">
            {product.name}
          </Link>

          {/* Details of cartItem */}
          <div className="mt-10 flex w-[400px] items-end justify-between laptop:w-[550px] desktop:w-[800px]">
            {/* Options on the left */}
            <div>
              <div className="mb-1 flex flex-wrap items-center">
                <p className="w-20 font-semibold">Price:</p>
                <p>{formatPrice(product.price)}</p>
              </div>
              <div className="flex flex-wrap items-center">
                <p className="w-20 font-semibold">Quantity:</p>
                <select
                  className="select select-bordered max-w-[100px]"
                  defaultValue={quantity}
                >
                  {getQuantityOptions(20, product.stock)}
                </select>
              </div>
            </div>

            {/* Subtotal of cartItem on the bottom right */}
            <div>
              <div className="flex flex-wrap">
                <p className="w-20 font-semibold">Subtotal:</p>
                <p>{formatPrice(product.price * quantity)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartEntry;
