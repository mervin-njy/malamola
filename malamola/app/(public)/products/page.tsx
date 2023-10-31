import ProductCard from "@/app/components/products/ProductCard";
import prisma from "@/lib/db/prisma";
import { formatImageUrl } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GrFilter, GrSort } from "react-icons/gr";

const ProductsPage = async () => {
  // variables ----------------------------------------------------------------------------------------
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  // render component ---------------------------------------------------------------------------------
  return (
    <>
      {!products.length ? (
        <div className="bg-neutral bg-opacity-5 p-4 text-2xl">
          No products found.
        </div>
      ) : (
        <div className="px-20 tablet:px-4 laptop:px-0">
          <div className="flex flex-row items-center justify-between pl-4 tracking-wider">
            {/* 1. HEADING */}
            <h1 className="text-3xl font-bold">All Products</h1>
            {/* <RiFilter2Fill /> */}

            {/* 2. SEARCH & FILTER OPTIONS MODAL => TO BE CONVERTED INTO CSR COMPONENT */}
            <div className="flex gap-2 rounded-xl text-xl font-light">
              <h2 className="btn btn-ghost w-[6rem] border-base-300 normal-case">
                <GrFilter />
                Filter
                {/* (Filter options: by category, keywords, availability etc.) */}
              </h2>
              <h2 className="btn btn-ghost w-[6rem] border-base-300 normal-case">
                <GrSort />
                Sort
                {/* (Sort options: by price, name etc.) */}
              </h2>
            </div>
          </div>

          {/* 3. HERO BANNER - LATEST PRODUCT */}
          <div className="hero my-4 rounded-xl bg-neutral bg-opacity-10">
            <div className="hero-content w-full flex-col justify-start tablet:flex-row">
              <Image
                src={formatImageUrl(products[0].imageUrl)}
                alt={products[0].name}
                width={800}
                height={800}
                className="w-8/12 max-w-xl rounded-lg shadow-2xl laptop:w-full"
                priority
              />
              <div className="px-4">
                <div className="text-3xl font-bold tablet:text-4xl laptop:text-5xl">
                  {products[0].name}
                </div>
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

          {/* 4. PRODUCT LIST DISPLAY */}
          {/* TODO: based on filter options */}
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
            {products.slice(1).map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>

          {/* 4. PAGINATION (TBC) */}
          {/* <div>
            <h4 className="text-xl tracking-wide">Pagination maybe?</h4>
          </div> */}
        </div>
      )}
    </>
  );
};

export default ProductsPage;
