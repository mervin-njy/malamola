// convert category format into readable text
type Categories = { [key: string]: string };

export const formatCategory = (from: string, cat: string) => {
  const categories: Categories = {
    Mola: "Mola Gang",
    Seasonal: "Seasonal",
    DIY: "DIY",
    Past: "Past Projects",
  };

  if (from === "db") {
    return categories[cat];
  } else {
    return Object.keys(categories).find(
      (key) => categories[key] === cat,
    ) as string;
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
