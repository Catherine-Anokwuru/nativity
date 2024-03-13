// import
import {
  getStorageItem,
  setStorageItem,
  getElement,
} from "./utils.js";
import { formatPrice } from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store/store.js";
import addToCartDOM from "./addToCart.js";
import { cartValue } from "../single.js";
// set items

const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");
const cartCheckout = getElement(".cart-checkout");

let cart = getStorageItem("cart");

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    let product = findProduct(id);
    // add item to the the
    product = { ...product, amount: cartValue };
    cart = [...cart, product];
    // add item to the DOM;
    addToCartDOM(product);
  } else {
    // update values
    // const amount = increaseAmount(id);
    // const items = [
    //   ...cartItemsDOM.querySelectorAll(".cart-item-amount"),
    // ];
    // const newAmount = items.find((value) => value.dataset.id === id);
    // newAmount.textContent = amount;
  }
  // add one to the item count
  displayCartItemCount();
  // display cart totals
  displayCartTotal();
  // set cart in local storage

  setStorageItem("cart", cart);
  //more stuff coming up
  openCart();
};
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}
function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total : ${formatPrice(total)} `;
  return total;
}
function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}
function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    // remove
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id);
      // parent.parentElement.remove();
      element.parentElement.parentElement.remove();
    }
    // increase
    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });
}
const init = () => {
  // display amount of cart items
  displayCartItemCount();
  // display total
  displayCartTotal();
  // add all cart items to the dom
  displayCartItemsDOM();
  // setup cart functionality
  setupCartFunctionality();
};
init();
const cartTotal = displayCartTotal;
// cartCheckout.addEventListener("click", setMonnify());

function setMonnify() {
  cartCheckout.addEventListener("click", function () {
    console.log(cartTotal());
    MonnifySDK.initialize({
      amount: cartTotal(),
      currency: "NGN",
      reference: new String(new Date().getTime()),
      customerFullName: "Nativity test",
      customerEmail: "nativitytest@gmail.com",
      apiKey: "MK_TEST_APXCXC4GMS",
      contractCode: "0921819244",
      paymentDescription: "Testing the monify gateway on nativity",
      isTestMode: true,
      onComplete: function (response) {
        //Implement what happens when the transaction is completed.
        // console.log(response);
        if (response.status === "SUCCESS") {
          cart = [];
          setStorageItem("cart", cart);
          while (cartItemsDOM.firstChild) {
            cartItemsDOM.removeChild(cartItemsDOM.firstChild);
          }
          cartItemCountDOM.textContent = 0;
          cartTotalDOM.textContent = `Total : ${formatPrice(0)} `;;
        }
      },
      onClose: function (data) {
        //Implement what should happen when the modal is closed here
        // console.log(data);

      },
    });
  });
}
setMonnify()
