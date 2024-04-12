"use client";

import React from "react";
import { formatPrice } from "@/app/helper/format";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

// types -----------------------------------------------------------------------------------------------------
interface PriceTagProps {
  prices: number[];
  className?: string;
}

const PriceTag = ({ prices, className }: PriceTagProps) => {
  // variables -----------------------------------------------------------------------------------------------
  const language = useSelector((state: RootState) => state.language.current);
  const price = language === "en" ? prices[0] : prices[1];
  const currency = language === "en" ? "SGD" : "TWD";
  // render component ----------------------------------------------------------------------------------------
  return (
    <span className={`badge ${className}`}>{formatPrice(price, currency)}</span>
  );
};

export default PriceTag;
