"use client";

import { Product, ProductOptions } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { formatCategory, formatImageUrl, getAge } from "@/app/helper/format";
import PriceTag from "../badges/PriceTag";
import HoverProductOptions from "./HoverProductOptions";

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

  // render component ---------------------------------------------------------------------------------
  return (
    <Link
      href={"/products/" + product.id} // TODO: mobile/tablet click on option doesn't route to product/[id]
      className="flex w-full flex-row rounded-xl bg-neutral bg-opacity-5 transition-shadow laptop:card hover:shadow-xl"
    >
      <figure className="relative w-8/12 laptop:w-full">
        {/* 1. image + option update buttons */}
        <Image
          src={formatImageUrl(options[optionIndex].imageUrl)}
          alt={`option-${options[optionIndex].name}`}
          width={800}
          height={400}
          className="rounded-[2rem] object-cover tablet:h-72 tablet:p-0"
        />
        {/* 2. isNew tag */}
        {isNew && (
          <div className="attentionGrab badge badge-info absolute right-4 top-4 p-3">
            NEW
          </div>
        )}
      </figure>

      {/* TODO: change to LINK with href={"/products/" + product.id} */}
      <div className="card-body w-full p-6">
        {/* PRODUCT HEADER */}
        {/* 3. title */}
        <div className="flex items-center justify-between">
          <h3 className="card-title tracking-wider">{product.name} </h3>
          {/* 4. category */}
          <h4 className="badge badge-accent badge-outline rounded-md p-3 font-bold italic tracking-wider">
            {formatCategory("db", product.category)}
          </h4>
        </div>

        {/* 5. description */}
        <p className="line-clamp-2 max-h-10 text-sm tracking-wide laptop:line-clamp-3 laptop:max-h-24">
          {product.description}
        </p>

        <div className="mt-2 flex justify-between">
          {/* 6. price */}
          <PriceTag
            prices={[
              options[optionIndex].priceSGD,
              options[optionIndex].priceTWD,
            ]}
            className={`badge-ghost rounded-md p-3 ${
              options[optionIndex].action === "Order"
                ? "font-semibold"
                : "text-opacity-50"
            }`}
          />

          {/* 7. Options (if applicable) */}
          {options.length > 1 && (
            <HoverProductOptions
              options={options}
              optionIndex={optionIndex}
              setOptionIndex={setOptionIndex}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
