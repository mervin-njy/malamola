import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import Image from "next/image";
import React, { cache } from "react";
import PriceTag from "@/app/components/PriceTag";
import { formatImageUrl } from "@/lib/format";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  // cached the fetched product data so we can share with metadata => fetching w/ prisma doesn't allow default data cache w/ javascript fetch
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  console.log("Product fetched:", product.name);
  return product;
});

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

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center">
      <Image
        src={formatImageUrl(product.imageUrl)}
        alt={product.name}
        width={500}
        height={100}
        className="rounded-sm object-cover"
        priority
      />

      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
