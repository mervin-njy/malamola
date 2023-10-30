"use server";
// server action: Fetch the cart => getCart() || createCart if undefined
// since the functions are used at different places => they will be created at lib/db

import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const updateProductQuantity = async (productId: string) => {
  // 1. user's cart (whether existing or new)
  const cart = (await getCart()) ?? (await createCart()); // creates cart if get cart returns null

  // 2. check if the item to change qty of (cartItem) is already in the cart
  const articleInCart = cart.items.find((item) => item.productId === productId);

  // 3. update cartItem schema
  // TODO: change to varying qty
  if (articleInCart) {
    // a. if exists => UPDATE the cartItem's qty
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: { increment: 1 } }, // TODO: change 1 to qty amt (from client compoent to be added)
    });
  } else {
    // b. else undefined => CREATE new cartItem (associated w/ the cart & product) w/ qty
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity: 1 }, // TODO: change to qty amt
    });
  }

  // 4. revalidate path to show changes
  revalidatePath("/products/[id]", "page");
  return;
};
