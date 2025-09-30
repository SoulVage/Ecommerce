export function getRandomProducts(products, count = 6) {
    return [...products].sort(() => 0.5 - Math.random()).slice(0, count);
  }
  