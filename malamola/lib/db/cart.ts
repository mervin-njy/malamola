import { cookies } from "next/dist/client/components/headers";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";

// 0. export types for use at multiple locations

export type CartWithProducts = Prisma.CartGetPayload<{
  // a. this extends the existing Cart schema w/ the cartItems along w/ product info
  include: { items: { include: { product: true } } }; // same as cart query at 1b.
}>;

export type ShoppingCart = CartWithProducts & {
  // b. this extends Cart type in prisma schema (along w/ 0a.) that we will need in 1c.
  size: number;
  subtotal: number;
};

// 1. getCart from cookie (if it exists)
export const getCart = async (): Promise<ShoppingCart | null> => {
  // a. check if localCart exists in cookie
  const localCartId = cookies().get("localCartId")?.value; // safe call operator since it may be undefined

  // b. if undefined: generate cart, else: cart = null
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } }, // pass cartItems into cart + pass product info into cartItem (via their id)
      })
    : null;

  // c. return cart object extending additional info: { size, subtotal }
  if (!cart) return null;
  return {
    ...cart,
    size: cart.items.reduce((acc, i) => acc + i.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, i) => acc + i.quantity * i.product.price,
      0,
    ),
  };
};

// 2. if doesn't exist, createCart() => which stores newCart in cookie
export const createCart = async (): Promise<ShoppingCart> => {
  // a. create empty cart w/ no data, but timestamps will be created according to schema
  const newCart = await prisma.cart.create({ data: {} });

  // b. store in cookie for reuse => annonymous cart becomes user cart when logged in
  cookies().set("localCartId", newCart.id);
  // TODO: ADD encryption + secure settings for production
  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
};
