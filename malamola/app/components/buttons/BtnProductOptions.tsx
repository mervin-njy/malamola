import { ProductOptions } from "@prisma/client";
import React from "react";

// types ----------------------------------------------------------------------------------------------
interface BtnProductOptionsProps {
  options: ProductOptions[]; // get options from product
  optionIndex: number; // to track option index for rendering within card
  setOptionIndex: React.Dispatch<React.SetStateAction<number>>; // to change optionIndex state
}

// component takes in list of options and map buttons to change optionIndex
const BtnProductOptions = ({
  options,
  optionIndex,
  setOptionIndex,
}: BtnProductOptionsProps) => {
  // event handlers -----------------------------------------------------------------------------------
  const handleHover = (index: number) => {
    // change option index upon corresponding button click
    setOptionIndex(index);
  };

  // generate buttons for each option
  const optionButtons = options.map((option, index) => (
    <button
      key={option.id}
      onMouseEnter={() => handleHover(index)}
      className={`btn btn-xs  border-accent border-opacity-10 bg-accent text-xs normal-case hover:bg-accent hover:bg-opacity-20 ${
        index === optionIndex
          ? "btn-active pointer-events-none bg-opacity-40"
          : "bg-opacity-5 text-opacity-80"
      }`}
    >
      {option.name}
    </button>
  ));

  // render component ---------------------------------------------------------------------------------
  return (
    <div className="flex w-full flex-row justify-end gap-2">
      {optionButtons}
    </div>
  );
};

export default BtnProductOptions;
