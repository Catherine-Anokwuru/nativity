const productsDOM = document.querySelector("#sp");
const url = "skincare.json";
import { addToCart } from "./shopping cart/setupCart.js";
import { formatPrice } from "./utils.js";

const fetchProduct = async () => {
  try {
    productsDOM.innerHTML = `<h1 style = 'font-size:3rem' >Loading...</h1>`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    productsDOM.innerHTML = `<p style= 'font-size:3rem'>There was an error</>`;
  }
};
fetchProduct();

export let cartValue = 1;
export const displayProduct = (list) => {
  list.find((products) => {

    const {
      name: title,
      price,
      image: img,
      brand,
      description,
      id
    } = products;
    const params = new URLSearchParams(window.location.search);

    const ids = params.get("id");
    // console.log(ids);
    products.id;
    if (products.id === ids) {
      document.title = title;

      productsDOM.innerHTML = `<div class="single-ctn">
    <div class="single-image">
      <img
      src="${img}"
      alt="${title}"
      />
    </div>
    <div class="single-text">
      <h1>${title}</h1>
      <h4>${brand}</h4>
      <p>${formatPrice(price)}</p>
  <p>
    ${description}
  </p>
  <div class="quantity">
    <label class="quantity-text" for="id">Quantity</label>
    <div class="quan-btn">
      <button class="btn minus"><i class="bx bx-minus"></i></button>
      <p
        class="quantity-input"
        name="quantity"
        id="value"
        // min="1"
        // value=${cartValue}
      >${cartValue}</p>
      <button class="btn plus"><i class="bx bx-plus"></i></button>
    </div>
  </div>

  <button class="add-to-cart product-cart-btn" data-id="${id}">ADD TO CART</button>
</div>
</div>`;
      const minus = document.querySelector(".minus");
      const itemCount = document.querySelector(".quantity-input");
      const plus = document.querySelector(".plus");
      plus.addEventListener("click", function () {
        cartValue++;
        itemCount.textContent = cartValue;
      });
      minus.addEventListener("click", function () {
        if (cartValue > 1) {
          cartValue--;
          itemCount.textContent = cartValue;
        }
      });
      const addCart = document.querySelector(".add-to-cart");
       addCart.addEventListener("click", function (e) {
         const parent = e.target;
         if (parent) {
           addToCart(parent.dataset.id);
         }
       });
    }
  });
};



const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
