"use server";
// server action: Fetch the cart => getCart() || createCart if undefined
// since the functions are used at different places => they will be created at lib/db

import { createCart, getCart } from "@/lib/db/cart";

export const updateProductQuantity = async (
  revalidateUrl: string,
  productId: string,
  quantity: number,
) => {
  // 1. user's cart (whether existing or new)
  const cart = (await getCart()) ?? (await createCart()); // creates cart if get cart returns null

  // 2. check if the item to change qty of (cartItem) is already in the cart
  const articleInCart = cart.items.find((item) => item.productId === productId);

  // 3. update cartItem schema



  // 4. revalidate path to show changes
  
};
