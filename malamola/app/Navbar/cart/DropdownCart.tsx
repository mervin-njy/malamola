"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { formatPrice } from "@/app/helper/format";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

// types ----------------------------------------------------------------------------------------------
interface BtnShoppingCartProps {
  cart: ShoppingCart | null;
}

const DropdownCart = ({ cart }: BtnShoppingCartProps) => {
  // variables ----------------------------------------------------------------------------------------
  const language = useSelector((state: RootState) => state.language.current);
  // functions ----------------------------------------------------------------------------------------
  const closeDropdown = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) elem.blur(); // this is important to close BtnshoppingCart dropdown when user is redirected away from the page
  };

  const displayPrice = (prices: number[]) => {
    const price = language === "en" ? prices[0] : prices[1];
    const currency = language === "en" ? "SGD" : "TWD";
    return formatPrice(price, currency);
  };

  // render component ---------------------------------------------------------------------------------
  return (
    <div
      tabIndex={0}
      className="card dropdown-content card-compact z-30 mt-3 w-[20rem] bg-base-100 shadow-md"
    >
      {/* z index to make sure it is on top of the page */}
      <div className="card-body">
        {/* 1. Dropdown header w/ close button */}
        <div className="flex items-center justify-between text-lg ">
          <span className="font-bold">
            {cart?.size || 0} item{(cart?.size || 0) > 1 && <span>s</span>}
          </span>
          <div
            className="cursor-pointer hover:font-black hover:text-accent"
            onClick={closeDropdown}
          >
            <MdClose />
          </div>
        </div>

        {/* 2. Dropdown items in cart */}
        <ul>
          {cart?.items.map((item, ind) => {
            return (
              <li
                key={ind}
                className="flex justify-between rounded-md p-1 italic odd:bg-secondary odd:bg-opacity-10"
              >
                <p>
                  <span className="font-semibold">{item.product.name}</span>
                  <span>
                    {item.productOption.name && ` - ${item.productOption.name}`}
                  </span>
                </p>
                <span className="mr-4">{item.quantity} x</span>
                <span>
                  {displayPrice([
                    item.productOption.priceSGD,
                    item.productOption.priceTWD,
                  ])}
                </span>
              </li>
            );
          })}
        </ul>

        {/* 3. Subtotal of cart */}
        <div className="mt-1 flex justify-between p-1">
          <span>Subtotal:</span>
          <span className="text-sm font-semibold">
            {displayPrice([cart?.subtotalSGD || 0, cart?.subtotalTWD || 0])}
          </span>
        </div>

        {/* 4. Link to /Cart page for full Cart details + checkout confirmation */}
        <Link
          href={"/cart"}
          className="btn btn-secondary btn-block"
          onClick={closeDropdown}
        >
          View Cart
        </Link>
      </div>
    </div>
  );
};

export default DropdownCart;
