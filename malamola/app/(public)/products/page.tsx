import ProductCard from "@/app/components/products/ProductCard";
import prisma from "@/lib/db/prisma";
import React from "react";

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <>
      <h1>Product Page Title</h1>

      <div>
        <h1>Filter options: by category, name etc.</h1>
      </div>

      <ProductCard product={products[0]} />

      <div>
        <h1>Pagination maybe?</h1>
      </div>
    </>
  );
};

export default ProductsPage;
