// const allProductsUrl = '/skincare.json'
// const fetchProduct = async () => {
//   try {
//     const response = await fetch(allProductsUrl);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//    console.log(error)
//   }
// };
// fetchProduct();
// const displayProduct = (list) => {
//   list.find((products) => {
//     const params = new URLSearchParams(window.location.search);
//     const ids = params.get("id");
//     console.log(ids);
//     // products.id;
//     if (products.id === ids) {
//       return products.id;
//     }})}
//     const singleUrl = displayProduct()
// const singleProductUrl = allProductsUrl/singleUrl

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

// const formatPrice = (price) => {
//   let formattedPrice = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format((price / 100).toFixed(2))
//   return formattedPrice
// }

const getStorageItem = (item) => {
  let storageItem = sessionStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(sessionStorage.getItem(item));
  } else {
    storageItem = [];
  }
  return storageItem;
};

const setStorageItem = (name, item) => {
  sessionStorage.setItem(name, JSON.stringify(item));
};

export {
  // allProductsUrl,
  // singleProductUrl,
  getElement,
  // formatPrice,
  getStorageItem,
  setStorageItem,
};
