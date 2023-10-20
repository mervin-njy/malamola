export const formatPrice = (price: number) => {
  // TODO: option to convert to TWD
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "SGD",
  });
};
