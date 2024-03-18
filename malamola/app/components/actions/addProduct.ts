"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { ProductsCategory, OptionChoices } from "@prisma/client";
import { redirect } from "next/navigation";
import { ProductFields } from "@/app/admin/inventory/addProduct/page";

export async function addProduct(formData: ProductFields) {
  const session = await getServerSession(authOptions);
  // restrict access to only those who are logged in
  if (session?.user.role !== "admin")
    redirect("/api/auth/signin?callbackUrl=/admin/inventory/addProduct"); // route to request sign-in (if add product button is clicked while not logged in)

  // CREATE new product along with affiliated options
  await prisma.product.create({
    data: {
      name: formData.name,
      category: formData.category as ProductsCategory, // Ensure formData.category matches enum ProductsCategory
      description: formData.description,
      Options: {
        createMany: {
          data: formData.options.map((option) => ({
            type: option.type,
            name: option.name,
            imageUrl: option.imageUrl,
            priceSGD: option.priceSGD,
            priceTWD: option.priceTWD,
            action: option.action as OptionChoices, // Ensure option.action matches enum OptionChoices
            wishedFor: option.wishedFor,
            requested: option.requested,
            ordered: option.ordered,
          })),
        },
      },
    },
  });

  redirect("/");
}
