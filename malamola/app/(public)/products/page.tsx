import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/app/components/products/ProductCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GrFilter, GrSort } from "react-icons/gr";
import PaginationBar from "@/app/components/filters/PaginationBar";
import { formatImageUrl } from "@/app/helper/format";

// types ----------------------------------------------------------------------------------------------
interface ProductsPageProps {
  searchParams: { page: string };
}

const ProductsPage = async ({
  searchParams: { page = "1" }, // get ?page= searchParams from PaginationBar Links => default at 1 onMount
}: ProductsPageProps) => {
  // variables ----------------------------------------------------------------------------------------
  // 1. generate page variables
  const currentPage = parseInt(page);

  // change page cards to display here
  const productCards = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / productCards);

  // 2. retrieve current page's products from db
  // TODO: add filter options
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * productCards + // skips 0 on 1st page
      (currentPage === 1 ? 0 : heroItemCount), // skip +heroItem after 1st page
    take: productCards + (currentPage === 1 ? heroItemCount : 0), // only +heroItem on 1st page
  });

  // render component ---------------------------------------------------------------------------------
  return (
    <>
      {!products.length ? (
        <div className="bg-neutral bg-opacity-5 p-4 text-2xl tracking-wide">
          No products found.
        </div>
      ) : (
        <div className="px-10 tablet:px-12 laptop:px-0">
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
          {currentPage === 1 && (
            <div className="hero my-4 rounded-xl bg-neutral bg-opacity-10">
              <div className="hero-content w-full flex-col justify-start tablet:flex-row">
                <Image
                  src={formatImageUrl(products[0].imageUrl)}
                  alt={products[0].name}
                  width={800}
                  height={800}
                  className="rounded-lg shadow-2xl tablet:w-8/12 tablet:max-w-xl laptop:w-full"
                  priority
                />
                <div className="px-4">
                  <div className="text-3xl font-bold tracking-wider tablet:text-4xl laptop:text-5xl">
                    {products[0].name}
                  </div>
                  <p className="my-6 line-clamp-5 overflow-hidden tablet:line-clamp-[11]">
                    {products[0].description}
                  </p>
                  <Link
                    href={"/products/" + products[0].id}
                    className="btn btn-accent"
                  >
                    Check it out!
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 4. PRODUCT LIST DISPLAY */}
          <div className="my-6 grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
            {(currentPage === 1 ? products.slice(heroItemCount) : products).map(
              (product) => (
                <ProductCard product={product} key={product.id} />
              ),
            )}
          </div>

          {/* 5. PAGINATION */}
          {totalPages > 1 && (
            <PaginationBar currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>
      )}
    </>
  );
};

export default ProductsPage;
