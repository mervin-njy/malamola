"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatImageUrl, formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import React, { useTransition } from "react";

// types -----------------------------------------------------------------------------------------------------
interface CartEntryProps {
  cartItem: CartItemWithProduct;
  updateProductQuantity: (
    revalidateUrl: string,
    productId: string,
    quantity: number,
  ) => Promise<void>;
}

const CartEntry = ({
  cartItem: { product, quantity },
  updateProductQuantity,
}: CartEntryProps) => {
  // react hooks ---------------------------------------------------------------------------------------------
  const [isPending, startTransition] = useTransition();

  // functions -----------------------------------------------------------------------------------------------
  const getQuantityOptions = (max: number, stock: number) => {
    // generate options for each cartItem quantity based on stock left
    const options: JSX.Element[] = [];
    for (let i = 1; i <= max; i++) {
      options.push(
        i <= stock ? (
          <option key={i} value={i} className="">
            {i}
          </option>
        ) : (
          <option key={i} value={i} disabled className="text-base-300">
            {i}
          </option>
        ),
      );
    }

    return options;
  };

  // event handlers-------------------------------------------------------------------------------------------
  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newQuantity = parseInt(event.currentTarget.value);

    startTransition(async () => {
      // call server action to update cartItem qty
      await updateProductQuantity("/cart", product.id, newQuantity);
    });
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div>
      {/* Each entry div w/ border */}
      <div className="my-5 flex flex-wrap items-center gap-10 rounded-xl">
        {/* Image on the left */}
        <Image
          src={formatImageUrl(product.imageUrl)}
          alt={product.name}
          width={200}
          height={200}
          className="h-32 w-3/12 rounded-lg object-cover laptop:h-40"
        />

        {/* Options on the right */}
        <div className="w-8/12 flex-col justify-between tracking-wide">
          {/* Title at the top links to the product/[id] page */}
          <Link href={"/products/" + product.id} className="text-xl font-bold">
            {product.name}
          </Link>

          {/* Details of cartItem */}
          <div className="mt-10 flex justify-between">
            {/* Options on the left */}
            <div>
              <div className="mb-1 flex flex-wrap items-center">
                <p className="w-24 font-semibold">Price:</p>
                <p>{formatPrice(product.price)}</p>
              </div>

              <div className="flex flex-wrap items-center">
                <p className="w-24 font-semibold">Quantity:</p>
                <select
                  className="select select-bordered select-sm w-20"
                  defaultValue={quantity}
                  onChange={handleQuantityChange}
                >
                  {getQuantityOptions(20, product.stock)}
                </select>
                {/* loading indicator */}
                {isPending && (
                  <span className="loading loading-spinner loading-md ml-4" />
                )}
              </div>
            </div>

            {/* Subtotal of cartItem on the bottom right */}
            <div className="flex items-end">
              <p className="mr-4 font-semibold">Subtotal:</p>
              <p className="w-16">{formatPrice(product.price * quantity)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartEntry;
