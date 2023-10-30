"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import React from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";

// types ----------------------------------------------------------------------------------------------
interface BtnShoppingCartProps {
  cart: ShoppingCart | null;
}

const BtnShoppingCart = ({ cart }: BtnShoppingCartProps) => {
  // functions ----------------------------------------------------------------------------------------
  const closeDropdown = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) elem.blur(); // this is important to close BtnshoppingCart dropdown when user is redirected away from the page
  };

  // render component ---------------------------------------------------------------------------------
  return (
    <div className="dropdown dropdown-end">
      {/* Dropdown header: Display cart icon + user's cart size */}
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        {/* tabIndex allows to navigate between items w/ tab */}
        <div className="indicator text-2xl">
          {/* indicator allows us to show something on icon (cart size in this case) */}
          <RiShoppingCart2Fill />
          <span className="badge indicator-item badge-xs py-2 text-secondary">
            {cart?.size || 0}
          </span>
        </div>
      </label>

      {/* Dropdown items: Display content of cart */}
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-30 mt-3 w-72 bg-base-100 shadow-md"
      >
        {/* z index to make sure it is on top of the page */}
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} items</span>
          {/* Dropdown items in cart */}
          <ul>
            {cart?.items.map((item, ind) => {
              return (
                <li
                  key={ind}
                  className="flex justify-between rounded-md p-1 odd:bg-base-200"
                >
                  <span className="flex-1">{item.product.name}</span>
                  <span className="mr-4">{item.quantity} *</span>
                  <span>{formatPrice(item.product.price)}</span>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-between p-1">
            <span>Subtotal:</span>
            <span className="text-sm font-semibold">
              {formatPrice(cart?.subtotal || 0)}
            </span>
          </div>
          {/* Link to /Cart page for full Cart details + checkout confirmation */}
          <Link
            href={"/cart"}
            className="btn btn-accent btn-block"
            onClick={closeDropdown}
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};
// https://drive.google.com/file/d/1q486l56OQ9gYVo9FdrrBTyfsMBw8PFnM/view?usp=sharing
export default BtnShoppingCart;
