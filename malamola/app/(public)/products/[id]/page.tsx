import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import Image from "next/image";
import React, { cache } from "react";
import PriceTag from "@/app/components/PriceTag";
import { formatImageUrl } from "@/lib/format";
import BtnAddToCart from "./BtnAddToCart";

// types ---------------------------------------------------------------------------------------------------
interface ProductPageProps {
  params: {
    id: string;
  };
}

// reusable functions --------------------------------------------------------------------------------------
const getProduct = cache(async (id: string) => {
  // cached the fetched product data so we can share with metadata => fetching w/ prisma doesn't allow default data cache w/ javascript fetch
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  console.log("Product fetched:", product.name);
  return product;
});

// metadata ------------------------------------------------------------------------------------------------
export async function generateMetaData({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: formatImageUrl(product.imageUrl) }],
    },
  };
}

// render component ----------------------------------------------------------------------------------------
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col tablet:flex-row">
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
          <div className="w-imageOptions m-auto grid grid-cols-5 gap-4 tablet:w-11/12">
            {[...Array(5)].map(() => {
              return (
                <div className="aspect-square rounded-lg bg-neutral bg-opacity-20 hover:bg-opacity-100"></div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-imageOptions mx-auto tablet:w-5/12">
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>

        {/* <SelectVariation /> */}
        {/* <SelectQuantity /> => if (product.stock <= 5) { ShowStock() } */}
        <BtnAddToCart productId={product.id} />
      </div>
    </div>
  );
};

export default ProductPage;
