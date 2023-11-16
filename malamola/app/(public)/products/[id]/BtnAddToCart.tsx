"use client";
import React, { useState, useTransition } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import ToastSuccess from "./ToastSuccess";

interface BtnAddToCartProps {
  productId: string;
  updateProductQuantity: (
    revalidateUrl: string,
    productId: string,
    quantity: number,
  ) => Promise<void>;
}

const BtnAddToCart = ({
  productId,
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
      await updateProductQuantity("/product/[id]", productId, 1);
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
      <button className="btn btn-accent" onClick={handleAddToCart}>
        Add to Cart
        <RiShoppingCart2Fill />
      </button>

      {/* Pending: loading indicator */}
      {isPending && (
        <span className="ml-4 loading loading-ring loading-md text-info" />
      )}

      {/* {toasts.length > 0 &&
        toasts.slice(0, -1).map((toast, ind) => {
          if (toast.display) <ToastSuccess key={ind} />;
        })} */}

      {/* Success: toast to signify item added */}
      {!isPending && success && <ToastSuccess />}
    </div>
  );
};

export default BtnAddToCart;
