import prisma from "@/lib/db/prisma";
import ProductCard from "@/app/components/products/ProductCard";
import { formatImageUrl } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { GrFilter, GrSort } from "react-icons/gr";

// metadata --------------------------------------------------------------------------------------------------
export const metadata = {
  title: "®Admin - Inventory",
};

const ManageInventoryPage = async () => {
  // variables -----------------------------------------------------------------------------------------------
  // 1. session validation => ADMIN
  const session = await getServerSession(authOptions);
  // restrict access to only those who are logged in => TO CHANGE TO ADMIN
  if (session?.user.role !== "admin")
    redirect("/api/auth/signin?callbackUrl=/admin/inventory"); // route to request sign-in

  // 2. products for display to edit
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  // render component ----------------------------------------------------------------------------------------
  return (
    <>
      {!products.length ? (
        // TODO: change to addProduct Link
        <div className="bg-neutral bg-opacity-5 p-4 text-2xl tracking-wide">
          No products found.
        </div>
      ) : (
        <div className="px-20 tablet:px-4 laptop:px-0">
          <div className="flex flex-row items-center justify-between pl-4 tracking-wider">
            {/* 1. HEADING */}
            <h1 className="text-3xl font-bold">Manage your Products</h1>
            {/* <RiFilter2Fill /> */}

            {/* 2. SEARCH & FILTER OPTIONS MODAL => TO BE CONVERTED INTO CSR COMPONENT */}
            <div className="flex gap-2 rounded-xl text-xl font-light">
              <h2 className="btn btn-ghost w-[6rem] border-base-300 normal-case">
                <GrFilter />
                Filter
                {/* (Filter options: by category, keywords, availability etc.) */}
              </h2>
              <h2 className="btn btn-ghost w-[6rem] border-base-300 normal-case">
                <GrSort />
                Sort
                {/* (Sort options: by price, name etc.) */}
              </h2>
            </div>
          </div>

          <div className="my-6 grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
            {/* 3. addProduct Link */}
            <Link
              href="/admin/inventory/addProduct"
              className="card w-full border-2 border-dashed border-accent"
            >
              <button className="btn btn-accent btn-md m-auto w-6/12">
                Add new
              </button>
            </Link>

            {/* 4. PRODUCT LIST DISPLAY */}
            {/* TODO: based on filter options */}
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>

          {/* 4. PAGINATION (TBC) */}
          {/* <div>
            <h4 className="text-xl tracking-wide">Pagination maybe?</h4>
          </div> */}
        </div>
      )}
    </>
  );
};

export default ManageInventoryPage;
