"use client";

import { Product, ProductOptions } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { formatCategory, formatImageUrl, getAge } from "@/app/helper/format";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import PriceTag from "../badges/PriceTag";

// types ----------------------------------------------------------------------------------------------
interface ProductCardProps {
  product: Product;
  options: ProductOptions[];
}

const ProductCard = ({ product, options }: ProductCardProps) => {
  // variables ----------------------------------------------------------------------------------------
  // give a NEW icon beside recently updated products (within 7 days => convert from ms)
  const isNew = getAge(product.createdAt) < 7;

  // hooks --------------------------------------------------------------------------------------------
  const [optionIndex, setOptionIndex] = useState<number>(0); // to track option index for rendering within card

  // event handlers -----------------------------------------------------------------------------------
  const handleOptionChange = (next: string) => {
    // generate options for display
    setOptionIndex((prevIndex: number) => {
      if (next === "plus") {
        return prevIndex === options.length - 1 ? 0 : prevIndex + 1;
      } else if (next === "minus") {
        return prevIndex === 0 ? options.length - 1 : prevIndex - 1;
      }
      // if no change => return current index
      return prevIndex;
    });
  };

  // render component ---------------------------------------------------------------------------------
  return (
    <div
      // Link: href={"/products/" + product.id}
      className="flex w-full flex-row rounded-xl bg-neutral bg-opacity-5 transition-shadow laptop:card hover:shadow-xl"
    >
      <figure className="relative w-8/12 laptop:w-full">
        {/* 1. image + option update buttons */}
        <Image
          src={formatImageUrl(options[optionIndex].imageUrl)}
          alt={`option-${options[optionIndex].name}`}
          width={800}
          height={400}
          className="rounded-[2rem] object-cover tablet:h-72 tablet:rounded-none tablet:p-0"
        />
        {/* render buttons for option selection if there are more than 1 */}
        {options.length > 1 && (
          <div>
            <button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                handleOptionChange("minus")
              }
              className="absolute bottom-0 left-0 top-0 block cursor-pointer p-2 ease-in-out"
            >
              <IoMdArrowDropleftCircle
                size={25}
                className="fill-base-200 hover:fill-base-100"
              />
            </button>
            <button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                handleOptionChange("plus")
              }
              className="absolute bottom-0 right-0 top-0 block cursor-pointer p-2 ease-in-out"
            >
              <IoMdArrowDroprightCircle
                size={25}
                className="fill-base-200 hover:fill-base-100"
              />
            </button>
          </div>
        )}
      </figure>

      {/* TODO: change to LINK with href={"/products/" + product.id} */}
      <div className="card-body w-full p-6">
        {/* PRODUCT HEADER */}
        {/* 2. title */}
        <div className="flex items-center justify-between">
          <h3 className="card-title tracking-wider">{product.name} </h3>
          {/* 3. category */}
          <h4 className="badge badge-accent badge-outline rounded-md p-3 font-bold italic tracking-wider">
            {formatCategory("db", product.category)}
          </h4>
        </div>

        {/* 4. description */}
        <p className="line-clamp-2 max-h-10 text-sm tracking-wide laptop:line-clamp-3 laptop:max-h-24">
          {product.description}
        </p>

        <div className="mt-2 flex justify-between">
          {/* 5. price */}
          <PriceTag
            price={options[optionIndex].priceSGD}
            currency="SGD"
            className="badge-ghost rounded-md p-3"
          />
          {/* 6. isNew */}
          {isNew && (
            <div className="attentionGrab badge badge-info p-3">NEW</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
