// global imports
import "./shopping cart/toggleSidebar.js";
import "./shopping cart/toggleCart.js";
import './shopping cart/setupCart.js'
// specific imports
import { fetchProduct } from "./global/fetchProducts.js";
import { setupStore, store } from "./store/store.js";
import { displayProduct } from "./single.js";
import { getElement } from "./shopping cart/utils.js";

const init = async () => {
  const products = await fetchProduct();
  if (products) {
    // add products to the store
    setupStore(products);
    // const featured = store.filter(
    //   (product) => product.featured === true
    // );
    // display(featured, getElement(".featured-center"));
  }
};

window.addEventListener("DOMContentLoaded", init);
