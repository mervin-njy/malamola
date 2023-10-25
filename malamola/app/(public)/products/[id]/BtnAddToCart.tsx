"use client";
import React from "react";
import { RiShoppingCartFill } from "react-icons/ri";

interface BtnAddToCartProps {
  productId: string;
}

const BtnAddToCart = ({ productId }: BtnAddToCartProps) => {
  // event handlers ------------------------------------------------------------------------------------------
  const handleAddToCart = () => {
    console.log();
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex items-center">
      <button className="btn btn-accent" onClick={handleAddToCart}>
        Add to Cart
        <RiShoppingCartFill />
      </button>
    </div>
  );
};

export default BtnAddToCart;
