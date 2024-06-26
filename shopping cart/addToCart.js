import { getElement } from "./utils.js";
import { formatPrice } from "../utils.js";
const cartItemsDOM = getElement(".cart-items");
const addToCartDOM = ({ id, title, price, img, amount }) => {
  // console.log({ id, title, price, img, amount });
  const article = document.createElement("article");
  article.classList.add("cart-item");
  article.setAttribute("data-id", id);
  article.innerHTML = `
    <img class="cart-item-img" src=${img} alt=${title} />

            <div>
              <h4 class="cart-item-name">${title}</h4>
              <p class="cart-item-price">${formatPrice(price)}</p>
              <button class="cart-item-remove-btn" data-id=${id}>remove</button>
            </div>

            <div>
              <button class="cart-item-increase-btn" data-id="${id}">
                <i class="bx bx-plus"></i>
              </button>
              <p class="cart-item-amount" data-id="${id}">${amount}</p>
              <button class="cart-item-decrease-btn" data-id="${id}">
                <i class="bx bx-minus"></i>
              </button>
            </div>`;
  cartItemsDOM.appendChild(article);
};



export default addToCartDOM;
