import { prisma } from "@/lib/db/prisma";
import AdminProductCard from "./AdminProductCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { GrFilter, GrSort } from "react-icons/gr";
import AddProductCard from "./AddProductCard";
import PaginationBar from "@/app/components/products/PaginationBar";

// metadata --------------------------------------------------------------------------------------------------
export const metadata = {
  title: "®Admin - Inventory",
};

// types -----------------------------------------------------------------------------------------------------
interface ProductsPageProps {
  searchParams: { page: string };
}

const ManageInventoryPage = async ({
  searchParams: { page = "1" }, // get ?page= searchParams from PaginationBar Links => default at 1 onMount
}: ProductsPageProps) => {
  // variables -----------------------------------------------------------------------------------------------
  // 1. session validation => ADMIN
  const session = await getServerSession(authOptions);
  // restrict access to only those who are logged in => TO CHANGE TO ADMIN
  if (session?.user.role !== "admin")
    redirect("/api/auth/signin?callbackUrl=/admin/inventory"); // route to request sign-in

  // 2. generate page variables
  const currentPage = parseInt(page);

  const productCards = 5;
  // no heroItemCard => but addProductCard is on every page

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil(totalItemCount / productCards);

  // 3. products for display to edit
  // TODO: add filter options
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * productCards,
    take: productCards,
  });

  // render component ----------------------------------------------------------------------------------------
  return (
    <>
      {!products.length ? (
        // TODO: change to addProduct Link
        <AddProductCard />
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
            <AddProductCard />

            {/* 4. PRODUCT LIST DISPLAY */}
            {products.map((product) => (
              <AdminProductCard product={product} key={product.id} />
            ))}
          </div>

          {/* 5. PAGINATION */}
          {totalPages > 1 && (
            <PaginationBar currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>
      )}
    </>
  );
};

export default ManageInventoryPage;
