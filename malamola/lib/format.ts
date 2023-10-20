export const formatPrice = (price: number) => {
  // TODO: option to convert to TWD
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "SGD",
  });
};

export const formatImageUrl = (imageUrl: string) => {
  // 1. replace "file/d/" w/ "uc?export=view&id="
  // 2. remove "/view?usp=sharing" at the end
  return imageUrl
    .replace("file/d/", "uc?export=view&id=")
    .replace("/view?usp=sharing", "");
};
