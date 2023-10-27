"use client";
import React, { useState, useTransition } from "react";
import { RiShoppingCartFill } from "react-icons/ri";

interface BtnAddToCartProps {
  productId: string;
  updateProductQuantity: (productId: string) => Promise<void>;
}

const BtnAddToCart = ({
  productId,
  updateProductQuantity,
}: BtnAddToCartProps) => {
  // react hooks ---------------------------------------------------------------------------------------------
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  // event handlers ------------------------------------------------------------------------------------------
  const handleAddToCart = () => {
    setSuccess(false);
    startTransition(async () => {
      await updateProductQuantity(productId);
      setSuccess(true);
    });
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex items-center">
      {!success && (
        <button className="btn btn-accent" onClick={handleAddToCart}>
          Add to Cart
          <RiShoppingCartFill />
        </button>
      )}
      {isPending && (
        <span className="loading loading-ring loading-md text-info" />
      )}
      {!isPending && success && (
        <span className="text-success">Added to Cart</span>
      )}
    </div>
  );
};

export default BtnAddToCart;
