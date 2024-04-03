import { ProductOptions } from "@prisma/client";
import { formatImageUrl } from "@/app/helper/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// types -----------------------------------------------------------------------------------------------------
interface SelectOptionProps {
  options: ProductOptions[]; // get options from product
  currentOption: number; // to Link to current option for display
  display: string;
}

const SelectOption = ({
  options,
  currentOption,
  display,
}: SelectOptionProps) => {
  // generate option selections ------------------------------------------------------------------------------
  const optionSelections = options.map((option, ind) =>
    display === "name" ? (
      <Link
        key={option.id}
        href={"?option=" + ind}
        className={`btn btn-sm border-accent border-opacity-10 bg-accent text-sm normal-case hover:bg-accent hover:bg-opacity-20 ${
          ind === currentOption
            ? "btn-active pointer-events-none bg-opacity-40"
            : "bg-opacity-5 text-opacity-80"
        }`}
      >
        {option.name}
      </Link>
    ) : (
      <Link key={option.id} href={"?option=" + ind}>
        <Image
          src={formatImageUrl(option.imageUrl)}
          alt={option.id}
          width={120}
          height={120}
          className={`aspect square rounded-lg ${
            ind === currentOption ? "ring-2 ring-info" : "opacity-60"
          }`}
        />
      </Link>
    ),
  );

  // render component ----------------------------------------------------------------------------------------
  return <div className="mb-4 flex flex-row gap-2">{optionSelections}</div>;
};

export default SelectOption;
