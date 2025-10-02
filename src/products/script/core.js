import { loadProducts } from "../../script/api.js";
import { productsInit } from "../../script/productsInit.js";
import { checkLogin } from "../../__login_script/checkLogin.js";
import { userUi } from "../../ui/userUi.js";
import { paginationInit } from "./pagination.js";


window.addEventListener("DOMContentLoaded", async () => {
  const data = (await loadProducts()) || [];
  const userData = await checkLogin();
  document.getElementById("loader")?.remove();
  paginationInit(data);
  if (userData) {
    await userUi(userData);
  }
});