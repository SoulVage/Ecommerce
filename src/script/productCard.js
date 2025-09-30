import { getDiscountedPrice } from "./utils/discountCalculator.js";

export function createProductCard(product) {
  const discountHtml =
    product.offPercentage > 0
      ? `<p class="line-through text-black/50 text-sm">${product.price}</p>`
      : "";
      if (product) {
        return `
    <a href="#" class="swiper-slide" title="${product.title}">
      <div class="w-full max-w-90 rounded-xl flex flex-col items-center justify-between p-4 gap-5 hover:bg-black/2">
        <img class="w-[160px] h-[160px] object-cover" src="${product.img}" alt="${product.title}" />
        <div class="w-full">
          <div class="w-full">
            <h4 class="text-md font-medium truncate w-full whitespace-nowrap">${product.title}</h4>
            <p class="text-black/50 text-sm">${product.category}</p>
          </div>
          <div class="w-full h-[50px] flex justify-between items-end mt-2">
            <div>
              ${discountHtml}
              <p>$${getDiscountedPrice(product)}</p>
            </div>
            <button class="bg-amber-300 py-2 text-[12px] font-medium rounded-2xl px-4 transition duration-300 ease-in-out hover:bg-amber-400">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </a>`
      }else {
        return "Failed To Get data"
      }     ;
}
