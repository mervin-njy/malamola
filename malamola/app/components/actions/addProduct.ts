"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { ProductsCategory } from "@prisma/client";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  const session = await getServerSession(authOptions);
  // restrict access to only those who are logged in
  if (session?.user.role !== "admin")
    redirect("/api/auth/signin?callbackUrl=/admin/inventory/addProduct"); // route to request sign-in (if add product button is clicked while not logged in)

  // For product schema ----------------------------------------------------------
  const name = formData.get("name")?.toString(); // ? => string or undefined
  const category: ProductsCategory = formData.get(
    "category",
  ) as ProductsCategory;
  const description = formData.get("description")?.toString();
  // + timestamps are automatically added

  // // For productOptions schema (one product to multiple options) ----------------
  //   const options = formData.getAll("options");

  //   for (const option of options) {
  //     console.log(option);
  //   }

  // const imageUrl = formData.get("imageUrl")?.toString();
  // const price = Number(formData.get("price") || 0);
  // const stock = Number(formData.get("stock") || 0);
  // // TODO: add optionDIY for category === "mola" String?
  // const optionDIY = "";
  // // TODO: add optionColours for category === "DIY" String[]
  // const optionColours = [];

  // TO BE VALIDATED ON CLIENT SIDE
  // validate field entries before querying db to add new data
  if (!name || !category || !description) {
    throw Error("Missing required fields!");
  }

  // CREATE new product
  await prisma.product.create({
    data: { name, category, description },
  });

  // CREATE new productOptions (>= 1)
  // use product.id for productOptions.productId
  // set productOptions.favourited, productOptions.requested, productoptions.pre_ordered to 0

  redirect("/");
}
