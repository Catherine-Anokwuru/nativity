const productsDOM = document.querySelector("#sp");
const url = "skincare.json";
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

const displayProduct = (list) => {
  list.find((products) => {
    const { name: title, price, image: img, brand, description } = products;
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
      <input
        class="quantity-input"
        name="quantity"
        id="value"
        min="1"
        value="1"
      />
      <button class="btn plus"><i class="bx bx-plus"></i></button>
    </div>
  </div>

  <button class="add-to-cart"><span>ADD TO CART</span></button>
</div>
</div>`;
    }
  });
};

const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
// count = 1
const value = document.querySelector("value");
const btns = document.querySelectorAll(".btn");

// btns.forEach(function (bt) {
//     bt.addEventListener('click', function(el) {
//         const styles = el.currentTarget.classList;
//         console.log(styles);
//             if(styles.contains('minus') && (count > 0)){
//                 count--;
//             } else if(styles.contains('plus')){
//                 count++;
//             } else(count = 1);
//         value.textContent = count;
//     });
// });

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
