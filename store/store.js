import {
  getStorageItem,
  setStorageItem,
} from "../shopping cart/utils.js";
let store = getStorageItem("store");
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      name: title,
      price,
      image: img,
      brand,
      usage,
      category,
      skinType,
      skinIssue,
      description,
    } = product;
    // console.log(product);
    return {
      id,
      title,
      price,
      img,
      brand,
      usage,
      category,
      skinType,
      skinIssue,
      description,
    };
  });
  setStorageItem("store", store);
};
// console.log(store);
const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};

export { store, setupStore, findProduct };
