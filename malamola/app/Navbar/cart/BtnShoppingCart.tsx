import { ShoppingCart } from "@/lib/db/cart";
import React from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import DropdownCart from "./DropdownCart";

// types ----------------------------------------------------------------------------------------------
interface BtnShoppingCartProps {
  cart: ShoppingCart | null;
}

const BtnShoppingCart = ({ cart }: BtnShoppingCartProps) => {
  // render component ---------------------------------------------------------------------------------
  return (
    <div className="dropdown-end dropdown">
      {/* Dropdown header: Display cart icon + user's cart size */}
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        {/* tabIndex allows to navigate between items w/ tab */}
        <div className="indicator text-base tablet:text-2xl">
          {/* indicator allows us to show something on icon (cart size in this case) */}
          <RiShoppingCart2Fill />
          <span className="badge indicator-item badge-xs py-2 text-secondary">
            {cart?.size || 0}
          </span>
        </div>
      </label>

      {/* Dropdown items: Display content of cart */}
      <DropdownCart cart={cart} />
    </div>
  );
};

export default BtnShoppingCart;
