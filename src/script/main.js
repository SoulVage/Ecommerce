import { loadProducts } from "./api.js";
import { productsInit } from "./productsInit.js";
import { checkLogin } from "../__login_script/checkLogin.js";
import { userUi } from "../ui/userUi.js";

window.addEventListener("DOMContentLoaded", async () => {
  const data = (await loadProducts()) || [];
  const userData = await checkLogin();
  document.getElementById("loader")?.remove();
  AOS.init();
  if (userData) {
    await userUi(userData);
  }
  productsInit("product-segment", data, "", 10, {});
  productsInit("swiper-1", data, "", 6, {
    name: ".mySwiper1",
    page: ".swiper-pagination1",
    next: ".swiper-button-next1",
    prev: ".swiper-button-prev1",
  });

  productsInit("swiper-2", data, "Mobile", 6, {
    name: ".mySwiper2",
    page: ".swiper-pagination2",
    next: ".swiper-button-next2",
    prev: ".swiper-button-prev2",
  });
});
