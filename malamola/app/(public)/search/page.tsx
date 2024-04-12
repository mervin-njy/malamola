import ProductCard from "@/app/components/products/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import React from "react";

// metadata --------------------------------------------------------------------------------------------------
export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - Filly Flower Crafts`,
  };
}

// types ----------------------------------------------------------------------------------------------
interface SearchPageProps {
  searchParams: { query: string };
}

const SearchPage = async ({ searchParams: { query } }: SearchPageProps) => {
  // variables ----------------------------------------------------------------------------------------
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
    include: { Options: true },
  });

  // render component ---------------------------------------------------------------------------------
  return (
    <>
      {!products.length ? (
        <div className="text-2xl tracking-wide">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                options={product.Options}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchPage;
