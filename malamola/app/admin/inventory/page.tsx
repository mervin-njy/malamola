import { prisma } from "@/lib/db/prisma";
import { authOptions } from "@/lib/configs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { formatCategory } from "@/app/helper/format";
import CategoryFilter from "@/app/components/filters/CategoryFilter";
import AddProductCard from "./AddProductCard";
import AdminProductCard from "./AdminProductCard";
import PaginationBar from "@/app/components/filters/PaginationBar";

// metadata --------------------------------------------------------------------------------------------------
export const metadata = {
  title: "®Admin - Inventory",
};

// types -----------------------------------------------------------------------------------------------------
interface ManageInventoryPageProps {
  // get searchParams for page number and category filter
  searchParams: { page: string; category: string };
}

const ManageInventoryPage = async ({
  // get {?page=, ?category} searchParams from {PaginationBar, CategoryFilter} Links => default at {1, "All"} onMount
  searchParams: { page = "1", category = "All" },
}: ManageInventoryPageProps) => {
  // variables -----------------------------------------------------------------------------------------------
  // 1. session validation => ADMIN ----------------------------------------------------------
  const session = await getServerSession(authOptions);
  // restrict access to only those who are logged in => TO CHANGE TO ADMIN
  if (session?.user.role !== "admin")
    redirect("/api/auth/signin?callbackUrl=/admin/inventory"); // route to request sign-in

  // 2. generate filter variables ------------------------------------------------------------
  const searchCategory = formatCategory("admin", category); // convert to db format || undefined for "All"

  // 3. generate page variables --------------------------------------------------------------
  const currentPage = parseInt(page);

  const productCards = 5;
  // no heroItemCard => but addProductCard is on every page

  const totalItemCount = await prisma.product.count({
    where: { category: searchCategory }, // based on filtered category
  });

  const totalPages = Math.ceil(totalItemCount / productCards);

  // 4. products for display to edit ---------------------------------------------------------
  // TODO: change sorting priority
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    where: { category: searchCategory }, // based on category searchParam from child component (CategoryFilter)
    skip: (currentPage - 1) * productCards,
    take: productCards,
    include: { Options: true },
  });

  // render component ----------------------------------------------------------------------------------------
  return (
    <>
      <div className="px-10 tablet:px-4 laptop:px-0">
        <div className="flex flex-row items-center justify-between pl-4 tracking-wider">
          {/* 1. HEADING */}
          <h1 className="text-3xl font-bold">Manage your Products</h1>

          {/* 2. FILTER TABS - categories */}
          {/* <RiFilter2Fill /> */}
          {/* TODO: filter for tags, sort by price, availability */}
          <CategoryFilter
            current={category}
            categories={[
              "All",
              "Mola Gang",
              "Seasonal",
              "DIY",
              "Past Projects",
            ]}
          />
        </div>

        <div className="my-6 grid grid-cols-1 gap-4 px-4 tablet:grid-cols-2 laptop:grid-cols-3">
          {/* 3. addProduct Link */}
          <AddProductCard />

          {/* 4. PRODUCT LIST DISPLAY || 0 products description */}
          {products.length > 0 ? (
            products.map((product) => (
              <AdminProductCard
                product={product}
                options={product.Options}
                key={product.id}
              />
            ))
          ) : (
            <div className="card h-20 w-full items-start justify-center p-4 font-medium">
              <p>Currently, there are no products in this category.</p>
              <p>Please add some for your customers to see!</p>
            </div>
          )}
        </div>

        {/* 5. PAGINATION */}
        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </>
  );
};

export default ManageInventoryPage;
