import { productsInit } from "../../script/productsInit.js";


export function paginationInit(data) {
  const itemsPerPage = 16;
  let currentPage = 1;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const prevButton = document.getElementById("pagination-prev");
  const nextButton = document.getElementById("pagination-next");


  function updateButtons() {
    if (currentPage <= 1) {
      prevButton.disabled = true;
      prevButton.style.opacity= "0.5";
    } else {
      prevButton.disabled = false;
      prevButton.style.opacity = "1";
    }
  
    if (currentPage >= totalPages) {
      nextButton.disabled = true;
      nextButton.style.opacity= "0.5";
    } else {
      nextButton.disabled = false;
      nextButton.style.opacity= "1";
    }
  }
  
  prevButton.addEventListener("click", ()=> {
    if (currentPage <= 1) return  
    currentPage--;
    showPage(currentPage)
  })
  nextButton.addEventListener("click", ()=> {
    if (currentPage >= totalPages) return  
    currentPage++;
    showPage(currentPage)
  })
  
  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage
    console.log(end)
    const products = data.slice(start, end)
    const url = new URL(window.location);
    window.history.pushState({}, "", url);

    url.searchParams.set("page", page)
    renderPage()
    updateButtons()
    productsInit("products-wrapper", products, "", itemsPerPage, {});
  }
  showPage(currentPage)
  
  function renderPage() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
  
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.classList.add("w-8", "h-8", "text-sm" , "flex", "items-center", "justify-center", "rounded-full")
      button.textContent = i;
      if (i === currentPage) {
        button.classList.add("bg-black", "text-white");
      }
      button.addEventListener("click", ()=> {
        if (i === currentPage) return
        currentPage = i;
        showPage(currentPage)
      })
      pagination.appendChild(button);
    }
  }
  
}
