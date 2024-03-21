import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import Image from "next/image";
import React, { cache } from "react";
import PriceTag from "@/app/components/badges/PriceTag";
import BtnAddToCart from "./BtnAddToCart";
import { updateProductQuantity } from "@/app/components/actions/actions";
import { formatImageUrl, formatCategory } from "@/app/helper/format";

// metadata ------------------------------------------------------------------------------------------------
export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + " - Filly Flower Crafts",
    description: product.description,
    openGraph: {
      images: [{ url: formatImageUrl(product.imageUrl) }],
    },
  };
}

// types ---------------------------------------------------------------------------------------------------
interface ProductPageProps {
  params: {
    id: string;
  };
}

// functions -----------------------------------------------------------------------------------------------
const getProduct = cache(async (id: string) => {
  // cached the fetched product data so we can share with metadata => fetching w/ prisma doesn't allow default data cache w/ javascript fetch
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  console.log("Product fetched:", product.name);
  return product;
});

// render component ----------------------------------------------------------------------------------------
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col tablet:flex-row">
      {/* LEFT: Product images */}
      <div className="mb-4 tablet:w-7/12">
        <Image
          src={formatImageUrl(product.imageUrl)}
          alt={product.name}
          width={600}
          height={200}
          className="m-auto mb-4 rounded-2xl object-cover tablet:w-11/12"
          priority
        />

        <div>
          {/* 1. Add image options - replace with imageUrl array */}
          {/* 2. Add selected to highlight selected image */}
          <div className="m-auto grid w-[600px] grid-cols-5 gap-4 tablet:w-11/12">
            {[...Array(5)].map((elem, ind) => {
              return (
                <div
                  key={ind}
                  className="aspect-square rounded-lg bg-neutral bg-opacity-20 hover:bg-opacity-100"
                >
                  {elem}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: Product details */}
      <div className="mx-auto w-[600px] tablet:w-5/12">
        {/* 2. Details */}
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>

        {/* <SelectVariation /> */}

        {/* 2. Quantity to add */}
        {/* <SelectQuantity /> => if (product.stock <= 5) { ShowStock() } */}
        {/* (formatCategory("db", product.category) === "DIY" && <SelectQuantity />) */}

        {/* 3. Button to confirm add */}
        <BtnAddToCart
          // TODO:  btnName={(formatCategory("db", product.category) === "DIY" ? "Add to Cart" : "Preorder" )}
          productId={product.id}
          updateProductQuantity={updateProductQuantity}
        />
      </div>
    </div>
  );
};

export default ProductPage;
