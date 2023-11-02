import React from "react";
import CartDisplay from "./CartDisplay";
import DeliveryOptions from "./DeliveryOptions";

export const metadata = {
  title: "Your cart - Filly Flower Crafts",
};

const CartPage = async () => {
  // variables -----------------------------------------------------------------------------------------------

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-4 laptop:flex-row">
      {/* 1. Main Cart Details on the left */}
      <CartDisplay />

      {/* Other options on the right */}
      <div>
        {/* 2. Delivery Options */}
        <DeliveryOptions />
      </div>
    </div>
  );
};

export default CartPage;
