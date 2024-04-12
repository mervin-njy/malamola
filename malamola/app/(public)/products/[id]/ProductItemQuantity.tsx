"use client";

import React, { useState } from "react";
import BtnAddToCart from "./BtnAddToCart";
import SelectQuantity from "@/app/components/products/SelectQuantity";
import { updateProductQuantity } from "@/app/components/actions/actions";

// types ---------------------------------------------------------------------------------------------------
interface ProductItemQuantityProps {
  optionID: string;
  productID: string;
}

// updates product id's quantity in cart
const ProductItemQuantity = ({
  optionID,
  productID,
}: ProductItemQuantityProps) => {
  // react hooks ---------------------------------------------------------------------------------------------
  const [quantity, setQuantity] = useState<number>(1);

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex flex-row items-center justify-between tablet:w-[20rem]">
      {/* 1. Quantity to add */}
      {/* TODO: if (productOption.action === "order") { ShowStock() } */}
      <SelectQuantity
        quantity={quantity}
        setQuantity={setQuantity}
        max={10}
        update={false} // only update once BtnAddToCart is clicked
        productOptionID={optionID}
        productID={productID}
      />
      {/* 2. Button to confirm add */}
      {/* TODO: if (productOption.action === "Order") { <BtnAddToCart /> } */}
      {/* TODO: if (productOption.action === "Enquire") { <EnquireProduct /> } */}
      {/* TODO: if (productOption.action === "Wish") { <FavouriteOption /> } */}
      {/* TODO: btnName={(formatCategory("db", product.category) === "DIY" ? "Add to Cart" : "Preorder" */}
      <BtnAddToCart
        quantity={quantity}
        productOptionID={optionID}
        productID={productID}
        updateProductQuantity={updateProductQuantity}
      />
    </div>
  );
};

export default ProductItemQuantity;
