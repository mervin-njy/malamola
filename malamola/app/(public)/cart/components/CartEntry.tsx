"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatImageUrl, formatPrice } from "@/app/helper/format";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import React, { useTransition } from "react";
import SelectQuantity from "@/app/components/products/SelectQuantity";
import PriceTag from "@/app/components/badges/PriceTag";
import CartEntrySubTotal from "./CartEntrySubtotal";

// types -----------------------------------------------------------------------------------------------------
interface CartEntryProps {
  cartItem: CartItemWithProduct;
  updateProductQuantity: (
    revalidateUrl: string,
    productOptionID: string,
    productID: string,
    quantity: number,
  ) => Promise<void>;
}

const CartEntry = ({
  cartItem: { product, productOption, quantity },
  updateProductQuantity,
}: CartEntryProps) => {
  // react hooks ---------------------------------------------------------------------------------------------
  const [isPending, startTransition] = useTransition();

  // event handlers-------------------------------------------------------------------------------------------
  const handleQuantityChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    // accounts for button element with delete icon
    const newQuantity = parseInt(event.currentTarget.value);

    startTransition(async () => {
      // call server action to update cartItem qty
      await updateProductQuantity(
        "/cart",
        productOption.id,
        product.id,
        newQuantity,
      );
    });
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div>
      {/* Each entry div w/ border */}
      <div className="my-5 flex flex-wrap items-center gap-10 rounded-xl">
        {/* Image on the left */}
        <Image
          src={formatImageUrl(productOption.imageUrl)}
          alt={productOption.name || product.name} // if no productOption name, fallback to product name
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
              {`${product.name} ${productOption.name && `- ${productOption.name}`}`}
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
                <PriceTag
                  prices={[productOption.priceSGD, productOption.priceTWD]}
                />
              </div>

              {/* QUANTITY */}
              <SelectQuantity
                quantity={quantity}
                max={10}
                update={true}
                productOptionID={productOption.id}
                productID={product.id}
              />

              {/* SUBTOTAL */}
              <CartEntrySubTotal
                productOption={productOption}
                quantity={quantity}
              />
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
