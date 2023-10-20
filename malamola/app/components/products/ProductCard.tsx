import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-neutral bg-opacity-5 transition-shadow hover:shadow-xl"
    >
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
