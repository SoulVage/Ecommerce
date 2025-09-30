export function getDiscountedPrice(product) {
    return product.offPercentage > 0
      ? (product.price - (product.price * product.offPercentage) / 100).toFixed(2)
      : product.price;
  }
  