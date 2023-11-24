import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BtnSubmitForm from "@/app/components/buttons/BtnSubmitForm";
import { prisma } from "@/lib/db/prisma";
import { ProductsCategory } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

// metadata --------------------------------------------------------------------------------------------------
export const metadata = {
  title: "®Admin - Add Product",
};

// server actions ------------------------------------------------------------------------------------
// create server action on this file without client-side fetching => protects db credentials
// => currently in alpha so => next.config.js => const nextConfig = { experimental: { serverActions: true, }, };
async function addProduct(formData: FormData) {
  "use server";

  const session = getServerSession(authOptions);
  // restrict access to only those who are logged in => TO CHANGE TO ADMIN
  if (!session)
    redirect("/api/auth/signin?callbackUrl=/admin/inventory/addProduct"); // route to request sign-in (if add product button is clicked while not logged in)

  const name = formData.get("name")?.toString(); // ? => string or undefined
  const category: ProductsCategory = formData.get(
    "category",
  ) as ProductsCategory;
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);
  const stock = Number(formData.get("stock") || 0);
  // TODO: add optionDIY for category === "mola" String?
  const optionDIY = "";
  // TODO: add optionColours for category === "DIY" String[]
  const optionColours = [];

  // validate field entries
  if (!name || !category || !description || !imageUrl || !price || !stock) {
    throw Error("Missing required fields!");
  }

  // CREATE new product
  await prisma.product.create({
    data: { name, category, description, imageUrl, price, stock },
  });

  redirect("/");
}

const AddProductPage = async () => {
  // variables -----------------------------------------------------------------------------------------------
  const session = await getServerSession(authOptions);

  // restrict access to only those who are logged in => TO CHANGE TO ADMIN
  if (session?.user.role !== "admin")
    redirect("/api/auth/signin?callbackUrl=/admin/inventory/addProduct"); // route to request sign-in

  // render component ----------------------------------------------------------------------------------------
  return (
    <>
      <div className="tracking-wide">
        <h1 className="mb-10 text-3xl font-bold">Add new Product</h1>

        <div className="card card-bordered bg-neutral bg-opacity-5 p-4 hover:shadow-md">
          <h1 className="card-title">Product Name</h1>
          {/* change to "ID" mapped from db's product list */}
          <div className="card-body">
            <form action={addProduct}>
              {/* Input: name */}
              <input
                required
                name="name"
                placeholder="Name"
                className="input input-bordered mb-3 w-full"
              />
              {/* Input: Category choices */}
              <div className="mb-3 flex flex-col justify-start px-4 py-2 tablet:flex-row">
                <h3 className="mr-4 text-base font-semibold tracking-wide">
                  Category:
                </h3>
                {["Mola", "Seasonal", "DIY", "Packages"].map((cat, ind) => {
                  return (
                    <div
                      key={ind}
                      className="my-2 flex flex-row tablet:mx-4 tablet:my-0"
                    >
                      <input
                        type="radio"
                        value={cat}
                        name="category"
                        className="radio-accent radio mr-2"
                      />
                      <h4 className="font-medium italic tracking-wide">
                        {cat}
                      </h4>
                    </div>
                  );
                })}
              </div>
              {/* Input: Description */}
              <textarea
                required
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered mb-3 w-full"
              />
              {/* Input: Image Url */}
              <input
                required
                name="imageUrl"
                placeholder="Image URL"
                type="url"
                className="input input-bordered mb-3 w-full"
              />
              {/* Input: Price */}
              <input
                required
                name="price"
                placeholder="Price (in SGD cents)"
                type="number"
                className="input input-bordered mb-3 w-full"
              />
              {/* Input: Stock */}
              <input
                required
                name="stock"
                placeholder="Stock"
                type="number"
                className="input input-bordered mb-3 w-full"
              />
              <BtnSubmitForm className="btn-accent btn-block">
                Add Product
              </BtnSubmitForm>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
