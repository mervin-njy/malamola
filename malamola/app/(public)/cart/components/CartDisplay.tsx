import { getCart } from "@/lib/db/cart";
import React from "react";
import Link from "next/link";
import CartEntry from "./CartEntry";
import { updateProductQuantity } from "@/app/components/actions/actions";
import CartSubTotal from "./CartSubTotal";

export const metadata = {
  title: "Your cart - Filly Flower Crafts",
};

const CartDisplay = async () => {
  // variables -----------------------------------------------------------------------------------------------
  const cart = await getCart();

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="w-full min-w-[32.8rem] rounded-xl border-2 border-accent border-opacity-10 bg-neutral bg-opacity-5 p-5">
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
          <CartSubTotal cart={cart} />
          <Link href={"/checkout"} className="btn btn-sm btn-accent w-[12rem]">
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartDisplay;
