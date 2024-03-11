import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import PriceTag from "../PriceTag";
import { formatCategory, formatImageUrl, getAge } from "@/app/helper/format";

// types ----------------------------------------------------------------------------------------------
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // variables ----------------------------------------------------------------------------------------
  // give a NEW icon beside recently updated products (within 7 days => convert from ms)
  const isNew = getAge(product.createdAt) < 7;

  // render component ---------------------------------------------------------------------------------
  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-neutral bg-opacity-5 transition-shadow hover:shadow-xl"
    >
      <figure>
        {/* 1. image */}
        <Image
          src={formatImageUrl(product.imageUrl)}
          alt={product.name}
          width={800}
          height={400}
          className="h-80 rounded-[2rem] object-cover p-6 tablet:h-56 tablet:rounded-none tablet:p-0"
        />
      </figure>

      <div className="card-body p-6">
        {/* 2. title */}
        <h3 className="card-title tracking-wider">{product.name} </h3>
        {/* 3. category */}
        <h4 className="badge badge-accent badge-outline rounded-md p-3 font-bold italic tracking-wider">
          {formatCategory(product.category)}
        </h4>
        {/* 4. description */}
        <p className="line-clamp-3 max-h-24 overflow-hidden text-sm tracking-wide">
          {product.description}
        </p>
        <div className="mt-2 flex justify-between">
          {/* 5. price */}
          <PriceTag
            price={product.price}
            className="badge-ghost rounded-md p-3"
          />
          {/* 6. isNew */}
          {isNew && (
            <div className="attentionGrab badge badge-info p-3">NEW</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
