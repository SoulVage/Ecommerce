import { loadProducts } from "./api.js";
import { productsInit } from "./productsInit.js";
import { checkLogin } from "../__login_script/checkLogin.js";
import { userUi } from "../ui/userUi.js";
const loader = document.createElement("div");
loader.id = "loader";
loader.className = "fixed w-full h-dvh bg-white z-[300] flex justify-center items-center";
loader.innerHTML = `<div class="loader"></div>`;
document.body.appendChild(loader);

window.addEventListener("DOMContentLoaded", async () => {
  const data = (await loadProducts()) || [];
  const userData = await checkLogin();
  !loader
  AOS.init();
  if (userData) {
    await userUi(userData);
  }
  if (loader) {
    loader.remove();
  }
  productsInit("product-segment", data, "", 13, {});
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
