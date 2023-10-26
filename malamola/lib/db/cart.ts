import { cookies } from "next/dist/client/components/headers";
import prisma from "./prisma";

// ShoppingCart type for use at multiple locations

// 1. getCart from cookie (if it exists)
export const getCart = async () => {
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
export const createCart = async () => {
  // a. create empty cart w/ no data, but timestamps will be created according to schema
  const newCart = await prisma.cart.create({ data: {} });

  // b. store in cookie for reuse => annonymous cart becomes user cart when logged in
  cookies().set("localCartId", newCart.id);
  // TODO: ADD encryption + secure settings for production
};
