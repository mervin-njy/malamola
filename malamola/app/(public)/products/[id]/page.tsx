import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import PriceTag from "@/app/components/PriceTag";
import { formatImageUrl } from "@/lib/format";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

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
