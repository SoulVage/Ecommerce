import { getRandomProducts } from "./utils/randomProduct.js";
import { createProductCard } from "./productCard.js";

export function productsInit(wrapperId, data, filter,count, swiperConfig) {
  const productWrapper = document.getElementById(wrapperId);
  const products = filter
    ? data.filter((p) => p.category === filter).slice(0, count)
    : getRandomProducts(data, count);

    if (products && products.length > 0) {
        productWrapper.innerHTML = products.map(createProductCard).join("");
      } else {
        productWrapper.innerHTML = "Failed To Load Products";
      }
      
  new Swiper(swiperConfig.name, {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: { el: swiperConfig.page, clickable: true },
    navigation: { nextEl: swiperConfig.next, prevEl: swiperConfig.prev },
  });
}
