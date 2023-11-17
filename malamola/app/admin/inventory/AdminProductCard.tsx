import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import PriceTag from "@/app/components/PriceTag";
import { formatImageUrl, formatDate, getAge } from "@/lib/format";

// types ----------------------------------------------------------------------------------------------
interface ProductCardProps {
  product: Product;
}

const AdminProductCard = ({ product }: ProductCardProps) => {
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
        <div className="flex justify-between">
          {/* 2. title */}
          <h3 className="card-title tracking-wider">{product.name} </h3>
          {/* 3. category */}
          <h4 className="badge badge-accent rounded-md p-3 tracking-wide text-white">
            {product.category}
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
            {/* 9: orders TODO: get from new Schema - Orders */}
            <h5>{getAge(product.createdAt)} days ago</h5>
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

        <div className="mt-2 flex justify-between">
          {/* 6. price */}
          <PriceTag
            price={product.price}
            className="badge-ghost rounded-md p-3"
          />
          {/* 7. isNew */}
          {isNew && (
            <div className="attentionGrab badge badge-info p-3">NEW</div>
          )}
        </div>

        <div className="divider">Inventory</div>
        {/* 8. stock */}
        <div className="flex justify-between">
          <div className="badge badge-outline p-3 font-bold tracking-wider">
            Stock: {product.stock}
          </div>
          {/* 9: orders TODO: get from new Schema - Orders */}
          <div className="badge badge-outline p-3 font-bold tracking-wider">
            Orders: 0
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdminProductCard;
