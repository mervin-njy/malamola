import { getCart } from "@/lib/db/cart";
import React from "react";
import CartEntry from "./CartEntry";

export const metadata = {
  title: "Your cart - Filly Flower Crafts",
};

const CartPage = async () => {
  // variables ----------------------------------------------------------------------------------------
  const cart = await getCart();

  // render component ----------------------------------------------------------------------------------------
  return (
    <div>
      {/* 1. Title */}
      <h1 className="mb-4 text-3xl font-bold">Your Cart</h1>
      <div className="divider" />

      {/* 2. Cart body - List items */}
      {!cart?.items.length ? (
        <div className="bg-neutral bg-opacity-5 p-4 text-2xl">
          There are no items in your cart. Browse our shop now!
        </div>
      ) : (
        cart?.items.map((item) => {
          return <CartEntry key={item.id} cartItem={item} />;
        })
      )}

      {/* 3. Checkout button */}
    </div>
  );
};

export default CartPage;
