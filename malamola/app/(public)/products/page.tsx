import ProductCard from "@/app/components/products/ProductCard";
import prisma from "@/lib/db/prisma";
import React from "react";

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold tracking-wider">All Products</h1>

      <div className="mb-4">
        <h2 className="text-xl tracking-wide">
          Filter options: by category, name etc.
        </h2>
      </div>

      <ProductCard product={products[0]} />

      {/* <div className="grid">
        <>
          {products.map((product) => {
            <div key={product.id}>
              <ProductCard product={product} />
            </div>;
          })}
        </>
      </div> */}

      <div>
        <h4 className="text-xl tracking-wide">Pagination maybe?</h4>
      </div>
    </>
  );
};

export default ProductsPage;
