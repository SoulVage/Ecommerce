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
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    },
    pagination: { el: swiperConfig.page, clickable: true },
    navigation: { nextEl: swiperConfig.next, prevEl: swiperConfig.prev },
  });
}
