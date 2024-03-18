"use client";

import { Product, ProductOptions } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
  IoMdInformationCircle,
} from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import PriceTag from "@/app/components/PriceTag";
import {
  formatCategory,
  formatImageUrl,
  formatDate,
  getAge,
} from "@/app/helper/format";

// types ----------------------------------------------------------------------------------------------
interface ProductCardProps {
  product: Product;
  options: ProductOptions[];
}

const AdminProductCard = ({ product, options }: ProductCardProps) => {
  // variables ----------------------------------------------------------------------------------------
  // give a NEW icon beside recently updated products (within 7 days => convert from ms)
  const isNew = getAge(product.createdAt) < 7;

  // hooks --------------------------------------------------------------------------------------------
  const [optionIndex, setOptionIndex] = useState<number>(0); // to track option index for rendering within card

  // event handlers -----------------------------------------------------------------------------------
  const handleOptionChange = (next: string) => {
    console.log(options);
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

    console.log("optionIndex: ", optionIndex, options[optionIndex]);
  };

  // render component ---------------------------------------------------------------------------------
  return (
    <div
      // href={"/products/" + product.id}
      className="card w-full bg-neutral bg-opacity-5 transition-shadow hover:shadow-xl"
    >
      <figure className="relative">
        {/* 1. image + option update buttons */}
        <Image
          src={formatImageUrl(options[optionIndex].imageUrl)}
          alt={"option-1"}
          width={800}
          height={400}
          className="h-80 rounded-[2rem] object-cover p-6 tablet:h-56 tablet:rounded-none tablet:p-0"
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
      <div className="card-body p-6">
        <div className="flex justify-between">
          {/* 2. title */}
          <h3 className="card-title font-bold tracking-wider">
            {product.name}{" "}
          </h3>
          {/* 3. category */}
          <h4 className="badge badge-accent rounded-md p-3 tracking-wide text-white">
            {formatCategory(product.category)}
          </h4>
        </div>

        {/* 4. description */}
        <p className="line-clamp-1 max-h-24 overflow-hidden text-sm tracking-wide">
          {product.description}
        </p>

        {/* 5. dates */}
        <div className="my-2 text-xs italic">
          <div className="flex justify-between tracking-wide">
            <h5>
              <span className="font-bold">Created:</span>
              {formatDate(product.createdAt)}
            </h5>
            <h5>{getAge(product.createdAt)} days(s) ago</h5>
          </div>
          <div className="flex justify-between tracking-wide">
            <h5>
              <span className="font-bold">Updated:</span>
              {formatDate(product.updatedAt)}
            </h5>
            {/* 9: orders TODO: get from new Schema - Orders */}
            <h5>{getAge(product.updatedAt)} day(s) ago</h5>
          </div>
        </div>

        {/* Option details */}
        {options.length > 0 && (
          <div className="divider divider-accent my-1 font-semibold tracking-wide">
            Option:
            <span className="text-accent">
              {options[optionIndex].name || "None"}
            </span>
          </div>
        )}

        <div className="my-2 flex justify-between">
          {/* 6. price SGD & TWD */}
          <div className="flex gap-2">
            <PriceTag
              price={options[optionIndex].priceSGD}
              currency="SGD"
              className="badge-ghost rounded-md p-3"
            />
            <PriceTag
              price={options[optionIndex].priceTWD}
              currency="TWD"
              className="badge-ghost rounded-md p-3"
            />
          </div>
          {/* 7. isNew */}
          {isNew && (
            <div className="attentionGrab badge badge-info p-3">NEW</div>
          )}
        </div>

        {/* 8. Option demand display */}
        <div className="flex justify-start gap-2">
          {/* a. option wished for by users */}
          <div className="badge badge-error badge-outline p-3">
            <MdFavorite size={20} />
            <p className="ml-2 font-bold tracking-wider text-primary">
              {options[optionIndex].wishedFor}
            </p>
          </div>
          {/* b. option requested by users */}
          <div className="badge badge-info badge-outline p-3">
            <IoMdInformationCircle size={20} />
            <p className="ml-2 font-bold tracking-wider text-primary">
              {options[optionIndex].requested}
            </p>
          </div>
          {/* c. option ordered by users */}
          <div className="badge badge-success badge-outline p-3">
            <BiSolidPurchaseTag size={20} />
            <p className="ml-2 font-bold tracking-wider text-primary">
              {options[optionIndex].ordered}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
