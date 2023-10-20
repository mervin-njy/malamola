import ProductCard from "@/app/components/products/ProductCard";
import prisma from "@/lib/db/prisma";
import { formatImageUrl } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <>
      {/* 1. HEADING */}
      <h1 className="my-4 text-3xl font-bold tracking-wider">All Products</h1>

      {/* 2. HERO BANNER - LATEST PRODUCT */}
      <div className="hero my-4 rounded-xl bg-base-200">
        <div className="hero-content w-full flex-col justify-start tablet:flex-row">
          <Image
            src={formatImageUrl(products[0].imageUrl)}
            alt={products[0].name}
            width={800}
            height={800}
            className="w-full max-w-2xl rounded-lg shadow-2xl"
            priority
          />
          <div className="px-4">
            <div className="text-5xl font-bold">{products[0].name}</div>
            <p className="py-4">{products[0].description}</p>
            <Link
              href={"/products/" + products[0].id}
              className="btn btn-accent"
            >
              Check it out!
            </Link>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & FILTER => TO BE CONVERTED INTO CSR COMPONENT */}
      <div className="my-4 rounded-xl bg-base-200 p-4">
        <h2 className="text-xl tracking-wide">
          Filter options: by category, name etc.
        </h2>
      </div>

      {/* 4. PRODUCT LIST DISPLAY */}
      {/* TODO: based on filter options */}
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {/* 4. PAGINATION (TBC) */}
      <div>
        <h4 className="text-xl tracking-wide">Pagination maybe?</h4>
      </div>
    </>
  );
};

export default ProductsPage;
