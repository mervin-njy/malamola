import { ProductsCategory } from "@prisma/client";

// convert category format into readable text
type Categories = { [key: string]: string };

export const formatCategory = (from: string, cat: string): ProductsCategory => {
  // to ensure type safety for enum type in schema.prisma
  const categories: Record<string, ProductsCategory> = {
    "Mola Gang": ProductsCategory.Mola,
    Seasonal: ProductsCategory.Seasonal,
    DIY: ProductsCategory.DIY,
    "Past Projects": ProductsCategory.Past,
  };

  // return all categories if "All" is passed => only from client
  // if (cat === "All") {
  //   if (from === "db") return Object.values(categories);
  //   else return Object.keys(categories).map((cat) => categories[cat]);
  // }

  if (from === "db") {
    return Object.keys(categories).find(
      (key) => categories[key] === cat,
    ) as ProductsCategory;
  } else {
    return categories[cat];
  }
};

export const formatPrice = (price: number, currency: string) => {
  // TODO: option to convert to TWD
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
};

export const formatImageUrl = (imageUrl: string) => {
  // for drive.google.com
  // 1. replace "file/d/" w/ "uc?export=view&id="
  // 2. remove "/view?usp=sharing" at the end || "/view..."
  // return imageUrl
  //   .replace("file/d/", "uc?export=view&id=")
  //   .replace(/\/view(.*)/, "");

  // for imgur.com
  return imageUrl + ".jpeg";
};

export const formatDate = (date: Date) => date.toDateString().slice(3);

export const getAge = (date: Date) =>
  Math.floor((Date.now() - new Date(date).getTime()) / 1000 / 60 / 60 / 24);
