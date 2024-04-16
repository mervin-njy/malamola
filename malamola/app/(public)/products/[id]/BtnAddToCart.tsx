"use client";

import React, { useState, useTransition } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import ToastSuccess from "./ToastSuccess";

interface BtnAddToCartProps {
  quantity: number;
  productID: string;
  productOptionID: string;
  updateProductQuantity: (
    revalidateUrl: string,
    productOptionID: string,
    productId: string,
    quantity: number,
  ) => Promise<void>;
}

const BtnAddToCart = ({
  quantity,
  productID,
  productOptionID,
  updateProductQuantity,
}: BtnAddToCartProps) => {
  // react hooks ---------------------------------------------------------------------------------------------
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  // const [toasts, setToasts] = useState<
  //   { display: boolean; quantity: number }[]
  // >([]);

  // event handlers ------------------------------------------------------------------------------------------
  const handleAddToCart = () => {
    setSuccess(false);
    startTransition(async () => {
      // TODO: change 1 to quantity according to dropdown select
      await updateProductQuantity(
        "/product/[id]",
        productOptionID,
        productID,
        quantity,
      );
      setSuccess(true);

      // // account for multiple btn click entries for many items added
      // setToasts((prevToasts) => {
      //   return [...prevToasts, { display: true, quantity: 1 }];
      // });
    });
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex items-center">
      {/* Pending: loading indicator */}
      {isPending && (
        <span className="loading loading-ring loading-md ml-4 text-info" />
      )}

      {/* Button to add to cart */}
      <button className="btn btn-accent btn-sm" onClick={handleAddToCart}>
        Add to Cart
        <RiShoppingCart2Fill />
      </button>

      {/* {toasts.length > 0 &&
        toasts.slice(0, -1).map((toast, ind) => {
          if (toast.display) <ToastSuccess key={ind} />;
        })} */}

      {/* Success: toast to signify item added - close automatically in 5s */}
      {!isPending && success && <ToastSuccess />}
    </div>
  );
};

export default BtnAddToCart;
