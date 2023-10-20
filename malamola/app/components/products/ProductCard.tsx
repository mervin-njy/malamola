import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PriceTag from "../PriceTag";
import Image from "next/image";
import { formatImageUrl } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // give a NEW icon beside recently updated products (within 7 days => convert from ms)
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-neutral bg-opacity-5 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={formatImageUrl(product.imageUrl)}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title tracking-wider">{product.name} </h3>
        <p className="tracking-wide">{product.description}</p>
        <div className="flex justify-between">
          <PriceTag price={product.price} className="badge-secondary p-3" />
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
