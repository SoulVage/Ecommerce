import { getDiscountedPrice } from "./utils/discountCalculator.js";

export function createProductCard(product) {
  const discountHtml =
    product.offPercentage > 0
      ? `<p class="line-through text-black/50 text-sm">${product.price}</p>`
      : "";
      if (product) {
        return `
    <a href="#" class="swiper-slide" data-aos="zoom-in-up" title="${product.title}">
      <div class="w-full max-w-90 min-w-20 rounded-xl flex flex-col items-center justify-between p-3 sm:p-4 gap-5 hover:bg-black/2">
        <img loading="lazy" class="w-[160px] h-[160px] object-cover" src="${product.img}" alt="${product.title}" />
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
            <button class="bg-black text-white py-2 text-[12px] font-medium rounded-2xl px-2 sm:px-2 transition duration-300 ease-in-out hover:bg-amber-400">
            <p class="sm:hidden">Add to Cart</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 sm:block text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
            </button>
          </div>
        </div>
      </div>
    </a>`
      }else {
        return "Failed To Get data"
      }     ;
}
