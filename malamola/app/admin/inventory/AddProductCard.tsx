import Link from "next/link";
import React from "react";

const AddProductCard = () => {
  // render component ----------------------------------------------------------------------------------------
  return (
    <Link
      href="/admin/inventory/addProduct"
      className="card h-40 w-full border-2 border-dashed border-accent hover:bg-accent hover:bg-opacity-10 tablet:h-auto"
    >
      <h2 className="m-auto text-2xl font-bold tracking-wider text-accent">
        Add new
      </h2>
    </Link>
  );
};

export default AddProductCard;
