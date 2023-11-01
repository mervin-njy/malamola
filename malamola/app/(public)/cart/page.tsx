import { getCart } from "@/lib/db/cart";
import React from "react";
import Link from "next/link";
import CartEntry from "./CartEntry";
import { updateProductQuantity } from "@/app/components/products/actions";

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

      {/* 2. Cart body - List items */}
      {!cart?.items.length ? (
        <div className="mt-10 flex items-center justify-between text-xl tracking-wide">
          <h2>There are no items in your cart. Browse our shop now!</h2>
          <Link href={"/products"} className="btn btn-accent w-36">
            Shop now!
          </Link>
        </div>
      ) : (
        cart?.items.map((item) => {
          return (
            <CartEntry
              key={item.id}
              cartItem={item}
              updateProductQuantity={updateProductQuantity}
            />
          );
        })
      )}

      {/* 3. Checkout button */}
    </div>
  );
};

export default CartPage;
