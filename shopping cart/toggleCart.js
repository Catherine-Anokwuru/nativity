// import {getElement} from './utils.js';

const cartOverlay = document.querySelector('.cart-overlay');
const openCartBtn = document.querySelector('.toggle-cart');
const closeCartBtn = document.querySelector('.cart-close');
const mainCart = document.querySelector('.s-cart');


openCartBtn.addEventListener('click', () => {
    cartOverlay.classList.add('show-cart-overlay');
    mainCart.classList.add('show-cart')
})
closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('show-cart-overlay');
    mainCart.classList.remove('show-cart')

})


export const openCart = () => {
    cartOverlay.classList.add('show-cart-overlay');
    mainCart.classList.add('show-cart')
}
