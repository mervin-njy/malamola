import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import Image from "next/image";
import React, { cache } from "react";
import PriceTag from "@/app/components/badges/PriceTag";
import { formatImageUrl, formatCategory } from "@/app/helper/format";
import SelectOption from "@/app/components/products/SelectOption";
import ProductItemQuantity from "./ProductItemQuantity";
import Link from "next/link";

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
  const category = formatCategory("db", product.category);

  return (
    <div className="flex flex-col tablet:flex-row tablet:px-10">
      {/* LEFT: Product images */}
      <div className="mx-auto mb-8 w-[37.5rem] tablet:mb-0">
        <Image
          src={formatImageUrl(options[index].imageUrl)}
          alt={product.name}
          width={600}
          height={200}
          className="m-auto mb-2 rounded-2xl object-cover"
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
      <div className="mx-auto flex w-[37.5rem] flex-col gap-6 tablet:w-5/12 tablet:px-6 laptop:px-0">
        {/* 2. Details */}
        <div className="flex flex-col gap-6">
          {/* a. name */}
          <h1 className="text-5xl font-bold">{product.name}</h1>
          {/* b. category + link to filter */}
          <Link
            href={`/products?category=${category}`}
            className="badge badge-accent badge-outline badge-lg rounded-md p-3 font-bold italic tracking-wider hover:badge-accent hover:badge-ghost"
          >
            {category}
          </Link>
          {/* c. tags + link to filter */}

          {/* d. description */}
          <p className="">{product.description}</p>
          {/* e. animal funfact? */}
        </div>

        {/* 3. variations if available */}
        {options.length > 1 && (
          <SelectOption
            options={options}
            currentOption={index}
            display="name"
          />
        )}

        <div className="flex flex-row items-center justify-between gap-4 tablet:flex-col tablet:items-start laptop:flex-row laptop:items-center">
          {/* 4. price */}
          <PriceTag
            prices={[options[index].priceSGD, options[index].priceTWD]}
            className={`badge-ghost rounded-md p-3 ${
              options[index].action === "Order"
                ? "font-semibold"
                : "text-opacity-50"
            }`}
          />

          {/* 5. Quantity Selection section - SelectQuantity+BtnAddToCart / BtnEnquireProduct / BtnAddFavourite*/}
          <ProductItemQuantity
            optionID={options[index].id}
            productID={product.id}
          />
        </div>

        {/* 6. Related products if available */}

        {/* 7. Reviews (TBC) */}
      </div>
    </div>
  );
};

export default ProductPage;
