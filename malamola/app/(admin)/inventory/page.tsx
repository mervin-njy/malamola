import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "® Inventory Management",
};

// create server action on this file without client-side fetching => protects db credentials
// => currently in alpha so => next.config.js => const nextConfig = { experimental: { serverActions: true, }, };
async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString(); // ? => string or undefined
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);
  const stock = Number(formData.get("stock") || 0);

  if (!name || !description || !imageUrl || !price || !stock) {
    throw Error("Missing required fields!");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price, stock },
  });

  redirect("/");
}

const ManageInventoryPage = () => {
  return (
    <>
      <div>
        <h1 className="mb-10 text-2xl tracking-wide">Manage your Products</h1>

        <div className="card card-bordered bg-neutral bg-opacity-5 p-4 hover:shadow-md">
          <h1 className="card-title">Product Name</h1>
          {/* change to "ID" mapped from db's product list */}
          <div className="card-body">
            <form action={addProduct}>
              <input
                required
                name="name"
                placeholder="Name"
                className="input input-bordered mb-3 w-full"
              />
              <textarea
                required
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered mb-3 w-full"
              />
              <input
                required
                name="imageUrl"
                placeholder="Image URL"
                type="url"
                className="input input-bordered mb-3 w-full"
              />
              <input
                required
                name="price"
                placeholder="Price (SGD)"
                type="number"
                className="input input-bordered mb-3 w-full"
              />
              <input
                required
                name="stock"
                placeholder="Stock"
                type="number"
                className="input input-bordered mb-3 w-full"
              />
              <button type="submit" className="btn btn-primary btn-block">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageInventoryPage;
