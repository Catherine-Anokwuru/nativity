import { fetchProducts } from "./skincare.js";
import { displayProducts } from "./skincare.js";

//DISPLAY NOKWARE PRODUCTS
const productDOM = document.querySelector(".ctn");
const nokware = (list) => {
  const newItem = list.filter(function (products) {
    let { brand } = products;
    if (brand === "Nokware") {
      // console.log("hi");
      return products;
    }
  });
  displayProducts(newItem, productDOM);
};

const textInput = document.querySelector(".search-input");

//SEARCH FILTER
let setSearch = (store) => {
  const search = document.querySelector(".input-form");
  search.addEventListener("keyup", () => {
    const value = textInput.value;
    // console.log(value);
    // if (value) {
    const newProducts = store.filter((product) => {
      let { name, brand } = product;
      if (brand === "Nokware") {
        if (textInput.value === "") {
          return product;
        }

        if (name.includes(value)) {
          return product;
        }
        if (name.toLowerCase().includes(value)) {
          return product;
        }
        if (name.toUpperCase().includes(value)) {
          return product;
        }
      }
    });
    displayProducts(newProducts, productDOM);
    if (newProducts.length < 1) {
      productDOM.innerHTML = `<h3 class='filter-error-text'>
        Sorry, no products matched your search. </h3>`;
    }
    // }
    else {
      displayProducts(newProducts, productDOM);
    }
  });
};

// SKIN TYPE FILTER
const setSkinType = (list) => {
  const skin = document.querySelector(".skin-types");
  skin.addEventListener("click", function (event) {
    const element = event.target.textContent.toLowerCase();
    let e = element.trim();

    // console.log(element);
    const newItem = list.filter(function (products) {
      let { skinType, brand } = products;
      const trial = skinType.values();
      for (const letter of trial) {
        if (brand === "Nokware") {
          if (e === letter) {
            return products;
          }
          if (e == "all") {
            return products;
          }
        }
      }
      textInput.value = "";
    });
    displayProducts(newItem, productDOM);
  });
};

//SKIN ISSUE FILTER
const setSkinIssue = (list) => {
  const skin = document.querySelector(".skin");
  skin.addEventListener("click", function (event) {
    const element = event.target.textContent.toLowerCase();
    let e = element.trim();

    // console.log(element);
    const newItem = list.filter(function (products) {
      let { skinIssue, brand } = products;
      const trial = skinIssue.values();
      for (const letter of trial) {
        if (brand === "Nokware") {
          if (e == letter) {
            return products;
          }
          if (e == "all") {
            return products;
          }
        }
      }
      textInput.value = "";
    });
    displayProducts(newItem, productDOM);
  });
};

// PRICE FILTER
// const highestPrice = (amount) => {
//   const priceTag = document.querySelector(".price-filter");
//   priceTag.addEventListener("click", function (e) {
//     const element = e.target.textContent.toLowerCase();
//     // console.log(element);
//     const newPrice = amount.map(function (products) {
//       let { price, brand } = products;
//       const item = [];
//       item.push(price);
//       console.log(item);
//       // const prices = Array.from(products);
//       // console.log(prices);

//       if (brand === "Nokware") {
//         if (element === "lowest to highest") {
//           item.sort(function (a, b) {
//             console.log(b - a);
//           });
//         }
//       }
//       // }
//     });
//     newPrice;
//   });
// };

//CALLING IT
const init = async () => {
  const data = await fetchProducts();
  setSkinType(data);
  setSkinIssue(data);
  displayProducts(data);
  setSearch(data);
  nokware(data);
  // highestPrice(data);
};
init();
