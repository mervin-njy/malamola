import React from "react";
import CartDisplay from "./CartDisplay";
import DeliveryOptions from "./DeliveryOptions";
import PaymentOptions from "./PaymentOptions";

export const metadata = {
  title: "Your cart - Filly Flower Crafts",
};

const CartPage = async () => {
  // variables -----------------------------------------------------------------------------------------------

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-5 laptop:flex-row">
      {/* 1. Main Cart Details on the left */}
      <CartDisplay />

      {/* Other options on the right */}
      <div className="flex w-full flex-col gap-5">
        {/* 2. Delivery Options */}
        <DeliveryOptions />
        {/* 3. Payment Options */}
        <PaymentOptions />
      </div>
    </div>
  );
};

export default CartPage;
