"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import { RiDeleteBin6Line } from "react-icons/ri";
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
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    // accounts for select element OR button element with delete icon
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
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="h-44 w-6/12 rounded-lg object-cover tablet:h-56 laptop:w-5/12"
        />

        {/* Options on the right */}
        <div className="flex-col justify-between tracking-wide">
          <div className="flex justify-between">
            {/* Title at the top links to the product/[id] page */}
            <Link
              href={"/products/" + product.id}
              className="text-xl font-bold"
            >
              {product.name}
            </Link>
            {/* loading indicator */}
            {isPending && (
              <span className="loading loading-spinner loading-md" />
            )}
          </div>

          {/* Details of cartItem */}
          <div className="mt-12 flex w-60 justify-between text-sm laptop:text-base">
            {/* Options on the left */}
            <div>
              {/* PRICE */}
              <div className="mb-3 flex flex-wrap items-center">
                <p className="w-24 font-semibold laptop:w-20">Price:</p>
                <p>{formatPrice(product.price)}</p>
              </div>

              {/* QUANTITY */}
              <div className="mb-4 flex flex-wrap items-center">
                <p className="w-24 font-semibold laptop:w-20">Quantity:</p>
                <select
                  className="select select-bordered select-sm w-24"
                  defaultValue={quantity}
                  onChange={handleQuantityChange}
                >
                  {getQuantityOptions(10, product.stock)}
                </select>
              </div>

              {/* SUBTOTAL */}
              <div className="flex flex-wrap items-center">
                <p className="w-24 font-semibold laptop:w-20">Subtotal:</p>
                <p className="badge badge-secondary p-3">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            </div>

            {/* Delete button on the right */}
            <div className="flex items-center">
              <button
                className="btn btn-circle btn-ghost btn-sm border-error border-opacity-10 text-xl text-error hover:bg-error hover:text-white"
                value={0}
                onClick={handleQuantityChange}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartEntry;
