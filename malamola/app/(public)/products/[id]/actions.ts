"use server";
// server action: Fetch the cart => getCart() || createCart if undefined
// since the functions are used at different places => they will be created at lib/db

import { createCart, getCart } from "@/lib/db/cart";

export const incrementProductQuantity = async (productId: string) => {
  const cart = (await getCart()) ?? (await createCart()); // creates cart if get cart returns null

  return;
};
