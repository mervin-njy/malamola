import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import PriceTag from "@/app/components/PriceTag";
import { formatImageUrl } from "@/lib/format";

// types ----------------------------------------------------------------------------------------------
interface ProductCardProps {
  product: Product;
}

const AdminProductCard = () => {
  // render component ---------------------------------------------------------------------------------
  return (
    <Link
      href="/admin/inventory/addProduct"
      className="card w-full border-2 border-accent transition-shadow hover:shadow-xl"
    >
      <button className="btn btn-accent btn-md">Add new</button>
    </Link>
  );
};

export default AdminProductCard;
