"use client";

import React from "react";
import { formatPrice } from "@/app/helper/format";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { ShoppingCart } from "@/lib/db/cart";

// types -----------------------------------------------------------------------------------------------------
interface CartSubTotalProps {
  cart: ShoppingCart | null;
}

const CartSubTotal = ({ cart }: CartSubTotalProps) => {
  // variables -----------------------------------------------------------------------------------------------
  const language = useSelector((state: RootState) => state.language.current);
  const price = language === "en" ? cart?.subtotalSGD : cart?.subtotalTWD;
  const currency = language === "en" ? "SGD" : "TWD";
  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="mb-4 flex flex-row text-2xl font-bold tracking-wider items-center">
      <h2 className="mr-4">Total:</h2>
      <h2 className="w-[12rem] text-right badge badge-lg badge-secondary p-4">{formatPrice(price || 0, currency)}</h2>
    </div>
  );
};

export default CartSubTotal;
