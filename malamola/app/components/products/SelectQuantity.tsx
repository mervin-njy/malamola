"use client";

import React, { useState } from "react";

interface SelectQuantityProps {
  quantity: number;
  stock: number;
}

const SelectQuantity = ({ quantity, stock }: SelectQuantityProps) => {
  // react hook ----------------------------------------------------------------------------------------------


  // functions -----------------------------------------------------------------------------------------------
  const getQuantityOptions = (max: number, stock: number) => {
    // generate options for each cartItem quantity based on stock left
    const options: JSX.Element[] = [];
    for (let i = 1; i <= max; i++) {
      options.push(
        i <= stock ? (
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

    // startTransition(async () => {
    //   // call server action to update cartItem qty
    //   await updateProductQuantity("/cart", product.id, newQuantity);
    // });
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
        {getQuantityOptions(10, stock)}
      </select>
    </div>
  );
};

export default SelectQuantity;
