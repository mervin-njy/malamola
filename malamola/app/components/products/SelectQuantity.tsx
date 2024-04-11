"use client";

import React, { useTransition } from "react";
import { updateProductQuantity } from "../actions/actions";

interface SelectQuantityProps {
  quantity: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
  max: number;
  update: boolean;
  productOptionID: string;
  productID: string;
}

const SelectQuantity = ({
  quantity,
  setQuantity,
  max,
  update,
  productOptionID,
  productID,
}: SelectQuantityProps) => {
  // react hooks ---------------------------------------------------------------------------------------------
  const [isPending, startTransition] = useTransition();

  // functions -----------------------------------------------------------------------------------------------
  const getQuantityOptions = (max: number) => {
    // generate options for each cartItem quantity based on stock left
    const options: JSX.Element[] = [];
    for (let i = 1; i <= max; i++) {
      options.push(
        i <= max ? (
          <option key={i} value={i} className="">
            {i}
          </option>
        ) : (
          <option key={i} value={i} disabled className="text-base-300">
            {i}
          </option>
        ),
      );
    }

    return options;
  };

  // event handlers-------------------------------------------------------------------------------------------
  const handleQuantityChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    // accounts for select element OR button element with delete icon
    const newQuantity = parseInt(event.currentTarget.value);

    // update local state - for non-cart page
    !update && setQuantity && setQuantity(newQuantity);

    // only update cartItem quantity when update is true - for cart page
    update &&
      startTransition(async () => {
        // call server action to update cartItem qty
        await updateProductQuantity(
          "/cart",
          productOptionID,
          productID,
          newQuantity,
        );
      });
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="mb-4 flex flex-wrap items-center">
      <p className="w-24 font-semibold laptop:w-20">Quantity:</p>
      <select
        className="select select-bordered select-sm w-24"
        defaultValue={quantity}
        onChange={handleQuantityChange}
      >
        {getQuantityOptions(max)}
      </select>

      {/* loading indicator - only when cart item's quantity is updating */}
      {update && isPending && (
        <span className="loading loading-spinner loading-sm ml-2" />
      )}
    </div>
  );
};

export default SelectQuantity;
