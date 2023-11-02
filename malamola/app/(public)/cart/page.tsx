import { getCart } from "@/lib/db/cart";
import React from "react";
import Link from "next/link";
import CartEntry from "./CartEntry";
import { updateProductQuantity } from "@/app/components/products/actions";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Your cart - Filly Flower Crafts",
};

const CartPage = async () => {
  // variables -----------------------------------------------------------------------------------------------
  const cart = await getCart();

  // render component ----------------------------------------------------------------------------------------
  return (
    <div>
      {/* 1. Title */}
      <h1 className="mb-4 text-3xl font-bold tracking-wider">Your Cart</h1>
      <div className="divider font-bold" />

      {/* 2. Cart body - List items */}
      {!cart?.items.length ? (
        // for empty cart
        <div className="mt-10 flex items-center justify-between text-xl tracking-wide">
          <h2>There are no items in your cart. Browse our shop now!</h2>
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
      <div className="flex flex-col items-end">
        <h2 className="mb-4 text-2xl font-bold tracking-wider">
          Total:
          <span className="ml-4 w-16">{formatPrice(cart?.subtotal || 0)}</span>
        </h2>
        <Link href={"/checkout"} className="btn btn-accent tablet:w-[200px]">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
