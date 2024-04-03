"use server";
// server action: Fetch the cart => getCart() || createCart if undefined
// since the functions are used at different places => they will be created at lib/db

// *** this is used for both cart & product/[id] pages to update product quantity, hence we have revalidateUrl arg to check where the action is called from

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const updateProductQuantity = async (
  revalidateUrl: string,
  productOptionID: string,
  quantity: number,
) => {
  // 1. user's cart (whether existing or new)
  const cart = (await getCart()) ?? (await createCart()); // creates cart if get cart returns null

  // 2. check if the item to change qty of (cartItem) is already in the cart
  const articleInCart = cart.items.find(
    (item) => item.productOptionID === productOptionID,
  );

  // 3. update cartItem schema
  if (quantity === 0) {
    if (articleInCart) {
      // a. REMOVE cartItem (if cartItem exists)
      // await prisma.cartItem.delete({ where: { id: articleInCart.id } });

      // instead of updating on the cartItem model, we do a relation query so the cart itself's' updatedAt timeStamp is changed => so we know when to remove unused carts
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id },
          },
        },
      });
    }
  } else {
    if (articleInCart) {
      // b. UPDATE cartItem w/ new quantity (if cartItem exists)
      // await prisma.cartItem.update({
      //   where: { id: articleInCart.id },
      //   data: revalidateUrl.includes("cart")
      //     ? { quantity } // i. for /cart => dropdown select changes
      //     : { quantity: { increment: quantity } }, // ii. for /product/[id] => BtnAddToCart changes
      // });

      // similarly update within cart itself
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: revalidateUrl.includes("cart")
                ? { quantity } // i. for /cart => dropdown select changes
                : { quantity: { increment: quantity } }, // ii. for /product/[id] => BtnAddToCart changes,
            },
          },
        },
      });
    } else {
      // c. CREATE cartItem w/ selected quantity (if cartItem doesn't) associated w/ the cart & product
      // await prisma.cartItem.create({
      //   data: { cartId: cart.id, productOptionID, quantity },
      // });

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: { productOptionID, quantity, status: "InCart" },
          },
        },
      });
    }
  }

  // 4. revalidate path to show changes
  revalidatePath(revalidateUrl, "page");
};
