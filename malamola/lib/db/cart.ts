import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./prisma";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../configs/auth";

// TYPES ----------------------------------------------------------------------------------------------------------------------------------------------
// 0. export types for use at multiple locations
export type CartWithProducts = Prisma.CartGetPayload<{
  // a. this extends the existing Cart schema w/ the cartItems along w/ product info
  include: { items: { include: { productOption: true; product: true } } }; // same as cart query at 1b.
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { productOption: true; product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  // b. this extends Cart type in prisma schema (along w/ 0a.) that we will need in 1c.
  size: number;
  subtotalSGD: number;
  subtotalTWD: number;
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
      include: { items: { include: { productOption: true, product: true } } }, // pass cartItems into cart + pass product info into cartItem (via their id)
    });
  } else {
    // b. Anonymous Cart --------------------------------------------------------------------
    // i. check if localCart exists in cookie
    const localCartId = cookies().get("localCartId")?.value; // safe call operator since it may be undefined

    // ii. if undefined: generate cart, else: cart = null
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: {
            items: { include: { productOption: true, product: true } },
          }, // pass cartItems into cart + pass product info into cartItem (via their id)
        })
      : null;
  }

  // c. return cart object extending additional info: { size, subtotal }
  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, i) => acc + i.quantity, 0),
    subtotalSGD: cart.items.reduce(
      (acc, i) => acc + i.quantity * i.productOption.priceSGD,
      0,
    ),
    subtotalTWD: cart.items.reduce(
      (acc, i) => acc + i.quantity * i.productOption.priceTWD,
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
    // TODO: ADD encryption + secure settings for production
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotalSGD: 0,
    subtotalTWD: 0,
  };
};

// call this right after log in => session begins so data is already updated before page starts loading on client => route handler
export const mergeAnonymousCartIntoUserCart = async (userId: string) => {
  // scenarios:
  //    1. localCart doesn't exist => userCart created as per normal
  //    2. localCart exists + userCart doesn't exist yet => userCart created w/ existing localCart items
  //    3. localCart exists + userCart exists => mergeCarts()

  // CHECK ANONYMOUS CART -------------------------
  const localCartId = cookies().get("localCartId")?.value;

  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: true }, // pass cartItems into cart WITHOUT product details => only qty & productId
      })
    : null;

  console.log("mergeCarts() - local cart:", localCart);

  // SCENARIO 1 => no local cart to merge into user cart *****************************************
  if (!localCart) return;

  // CHECK USER CART ------------------------------
  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true }, // pass cartItems without product info again
  });
  console.log("mergeCarts() - userId:", userId, "user's cart:", userCart);

  // several db operations to be done =>
  //    1. merge anonymous + user cart
  //    2. delete all items in current user cart + replace w/ merged
  //    3. empty all items in current anonymouse cart
  // database transactrion: process where multiple operations are executed, but if any one fails, the whole transaction is rolled back === no changes applies
  await prisma.$transaction(async (tx) => {
    // SCENARIO 3 => MERGE BOTH CARTS *************************************************************
    if (userCart) {
      // (step 1)
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);
      // (step 2)
      await tx.cartItem.deleteMany({
        where: { cartID: userCart.id }, // delete all items that belong to userCart => before replacing with mergedCartItems
      });

      // await tx.cartItem.createMany({
      //   data: mergedCartItems.map((item) => ({
      //     // ignore id => let it auto generate new cartItem.id
      //     cartId: userCart.id,
      //     productId: item.productId,
      //     quantity: item.quantity,
      //   })),
      // });

      // update the cart's updatedAt timestamp along with cartItem creation => lib/db/prisma.ts to include prisma extension
      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((i) => ({
                productOptionID: i.productOptionID,
                productID: i.productID,
                quantity: i.quantity,
                status: "InCart",
              })),
            },
          },
        },
      });

      // SCENARIO 2 => create userCart w/ localCart ************************************************
    } else {
      // (step 1 + 2) => merge anonymous cart into user cart to be created here
      await tx.cart.create({
        data: {
          userId,
          items: {
            // relation query => create cart & cartItems in their own collections in one operation
            createMany: {
              data: localCart.items.map((i) => ({
                // ignore id again
                // ignore cartId => auto generated
                productOptionID: i.productOptionID,
                productID: i.productID,
                quantity: i.quantity,
                status: "InCart",
              })),
            },
          },
        },
      });
    }

    // (step 3) delete anonymous cart + empty cart in cookie
    await tx.cart.delete({
      where: { id: localCart.id },
    });

    cookies().set("localCartId", "");
  });
};

function mergeCartItems(...cartItems: CartItem[][]): CartItem[] {
  // can merge any arbitrary number of carts => array of [cartItems]
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      // get existing item that is already in accumulating mergeCartItem (acc)
      const existingItem = acc.find(
        (i) => i.productOptionID === item.productOptionID,
      );

      if (existingItem) {
        // if item is in mergedCart => combine quantity
        existingItem.quantity += item.quantity;
      } else {
        // add item if it's not in mergedCart yet
        acc.push(item);
      }
    });

    return acc;
  }, [] as CartItem[]);
}
