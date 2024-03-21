import { formatPrice } from "@/app/helper/format";
import React from "react";

// types -----------------------------------------------------------------------------------------------------
interface PriceTagProps {
  price: number;
  currency: string;
  className?: string;
}

const PriceTag = ({ price, currency, className }: PriceTagProps) => {
  // render component ----------------------------------------------------------------------------------------
  return (
    <span className={`badge ${className}`}>{formatPrice(price, currency)}</span>
  );
};

export default PriceTag;
