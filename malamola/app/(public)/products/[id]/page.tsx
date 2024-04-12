import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import Image from "next/image";
import React, { cache } from "react";
import PriceTag from "@/app/components/badges/PriceTag";
import BtnAddToCart from "./BtnAddToCart";
import { updateProductQuantity } from "@/app/components/actions/actions";
import { formatImageUrl, formatCategory } from "@/app/helper/format";
import SelectOption from "@/app/components/products/SelectOption";
import SelectQuantity from "@/app/components/products/SelectQuantity";
import ProductItemQuantity from "./ProductItemQuantity";

// metadata ------------------------------------------------------------------------------------------------
export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + " - Filly Flower Crafts",
    description: product.description,
    openGraph: {
      images: [{ url: formatImageUrl(product.Options[0].imageUrl) }],
    },
  };
}

// types ---------------------------------------------------------------------------------------------------
interface ProductPageProps {
  params: {
    id: string; // get product id
  };
  searchParams: {
    // query params are strings => convert to number within component
    option?: string; // get option index param from query (if available) => default to 0}
  };
}

// functions -----------------------------------------------------------------------------------------------
const getProduct = cache(async (id: string) => {
  // cached the fetched product data so we can share with metadata => fetching w/ prisma doesn't allow default data cache w/ javascript fetch
  const product = await prisma.product.findUnique({
    where: { id },
    include: { Options: true },
  });
  if (!product) notFound();
  console.log("Product fetched:", product.name);

  return product;
});

// render component ----------------------------------------------------------------------------------------
const ProductPage = async ({
  params: { id },
  searchParams: { option = "0" },
}: ProductPageProps) => {
  // variables ---------------------------------------------------------------------------------------------
  const product = await getProduct(id);
  const options = product.Options;
  const index = parseInt(option);

  return (
    <div className="flex flex-col tablet:flex-row">
      {/* LEFT: Product images */}
      <div className="mb-4">
        <Image
          src={formatImageUrl(options[index].imageUrl)}
          alt={product.name}
          width={600}
          height={200}
          className="m-auto mb-4 rounded-2xl object-cover"
          priority
        />

        <div>
          {/* 1. Add image options - replace with imageUrl array */}
          {/* 2. Add selected to highlight selected image */}
          {options.length > 1 && (
            <SelectOption
              options={options}
              currentOption={index}
              display="image"
            />
          )}
        </div>
      </div>

      {/* RIGHT: Product details */}
      <div className="mx-auto w-[600px] tablet:w-5/12">
        {/* 2. Details */}
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <p className="py-6">{product.description}</p>

        {/* 3. variations if available */}
        {options.length > 1 && (
          <SelectOption
            options={options}
            currentOption={index}
            display="name"
          />
        )}

        {/* 4. price */}
        <PriceTag
          prices={[options[index].priceSGD, options[index].priceTWD]}
          className={`badge-ghost mb-4 rounded-md p-3 ${
            options[index].action === "Order"
              ? "font-semibold"
              : "text-opacity-50"
          }`}
        />

        {/* 5. Quantity Selection section */}
        <ProductItemQuantity
          optionID={options[index].id}
          productID={product.id}
        />

        {/* 7. favourite option */}
      </div>
    </div>
  );
};

export default ProductPage;
