import { cookies } from "next/dist/client/components/headers";
import prisma from "./prisma";
import { Cart, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// TYPES ----------------------------------------------------------------------------------------------------------------------------------------------
// 0. export types for use at multiple locations
export type CartWithProducts = Prisma.CartGetPayload<{
  // a. this extends the existing Cart schema w/ the cartItems along w/ product info
  include: { items: { include: { product: true } } }; // same as cart query at 1b.
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  // b. this extends Cart type in prisma schema (along w/ 0a.) that we will need in 1c.
  size: number;
  subtotal: number;
};

// FUNCTIONS ------------------------------------------------------------------------------------------------------------------------------------------
// 1. getCart() from cookie (if it exists)
export const getCart = async (): Promise<ShoppingCart | null> => {
  // check user session whether to assign userID to new empty cart
  const session = await getServerSession(authOptions);

  // cart w/ products type from prisma schema before assigning annonymouse / user Cart
  let cart: CartWithProducts | null = null;

  if (session) {
    // a. User's Cart -----------------------------------------------------------------------
    cart = await prisma.cart.findFirst({
      // only the first cart since user may have multiple
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } }, // pass cartItems into cart + pass product info into cartItem (via their id)
    });
  } else {
    // b. Anonymous Cart --------------------------------------------------------------------
    // i. check if localCart exists in cookie
    const localCartId = cookies().get("localCartId")?.value; // safe call operator since it may be undefined

    // ii. if undefined: generate cart, else: cart = null
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { items: { include: { product: true } } }, // pass cartItems into cart + pass product info into cartItem (via their id)
        })
      : null;
  }

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

// 2. createCart() and set to cookie (if cart doesn't exist)
export const createCart = async (): Promise<ShoppingCart> => {
  // check user session whether to assign userID to new empty cart
  const session = await getServerSession(authOptions);

  // empty variable of type Cart from prisma schema before assigning annonymouse / user Cart
  let newCart: Cart;

  if (session) {
    // a. User's Cart -----------------------------------------------------------------------
    // create empty cart w/ user's id
    newCart = await prisma.cart.create({
      data: { userId: session.user.id }, // session.user.id is not there by default => modify object to be returned at route handler's session callback
    });
  } else {
    // b. Anonymous Cart --------------------------------------------------------------------
    // i. create empty cart w/ no data, but timestamps will be created according to schema
    newCart = await prisma.cart.create({ data: {} });
    // ii. store in cookie for reuse => annonymous cart becomes user cart when logged in
    cookies().set("localCartId", newCart.id);
  }

  // TODO: ADD encryption + secure settings for production
  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
};
