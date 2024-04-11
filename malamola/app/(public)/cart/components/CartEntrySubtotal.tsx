"use client";

import React from "react";
import { Cart, ProductOptions } from "@prisma/client";
import { formatPrice } from "@/app/helper/format";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

// types -----------------------------------------------------------------------------------------------------
interface CartEntrySubTotalProps {
  productOption: ProductOptions;
  quantity: number;
}

const CartEntrySubTotal = ({
  productOption,
  quantity,
}: CartEntrySubTotalProps) => {
  // variables -----------------------------------------------------------------------------------------------
  const language = useSelector((state: RootState) => state.language.current);
  const price =
    (language === "en" ? productOption.priceSGD : productOption.priceTWD) *
    quantity;
  const currency = language === "en" ? "SGD" : "TWD";
  
  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex flex-wrap items-center">
      <p className="w-24 font-semibold laptop:w-20">Subtotal:</p>
      <p className="badge badge-secondary p-3">
        {formatPrice(price, currency)}
      </p>
    </div>
  );
};

export default CartEntrySubTotal;
