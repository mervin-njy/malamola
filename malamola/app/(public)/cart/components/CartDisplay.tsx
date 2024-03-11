import { getCart } from "@/lib/db/cart";
import React from "react";
import Link from "next/link";
import CartEntry from "./CartEntry";
import { updateProductQuantity } from "@/app/components/actions/actions";
import { formatPrice } from "@/app/helper/format";

export const metadata = {
  title: "Your cart - Filly Flower Crafts",
};

const CartDisplay = async () => {
  // variables -----------------------------------------------------------------------------------------------
  const cart = await getCart();

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="w-full min-w-[525px] rounded-xl border-2 border-accent border-opacity-10 bg-neutral bg-opacity-5 p-5">
      {/* 1. Title */}
      <div className="text-3xl font-bold tracking-wider">
        <h1>Your Cart</h1>
      </div>

      {/* 2. Cart body - List items */}
      <div className="divider font-bold" />
      {!cart?.items.length ? (
        // for empty cart
        <div className="mt-10 flex items-center justify-between text-xl tracking-wide">
          <h2>There are no items in your cart.</h2>
          <Link href={"/products"} className="btn btn-accent w-36">
            Shop now!
          </Link>
        </div>
      ) : (
        // populate cart items
        cart?.items.map((item) => {
          return (
            <div key={item.id}>
              <CartEntry
                cartItem={item}
                updateProductQuantity={updateProductQuantity}
              />
              <div className="divider" />
            </div>
          );
        })
      )}

      {/* 3. Total + Checkout button */}
      {cart?.size !== 0 && cart?.size && (
        <div className="flex flex-col items-end">
          <h2 className="mb-4 text-2xl font-bold tracking-wider">
            Total:
            <span className="ml-4 w-16">
              {formatPrice(cart?.subtotal || 0)}
            </span>
          </h2>
          <Link href={"/checkout"} className="btn btn-accent tablet:w-[200px]">
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartDisplay;
