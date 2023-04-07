import { fetchProducts } from "./skincare.js";
import { displayProducts } from "./skincare.js";
const dropDown = document.querySelectorAll(".filter-text");

dropDown.forEach(function (event) {
  event.addEventListener("click", function (e) {
    const question = e.target.parentElement;
    // console.log(question);
    if (question) {
      const showDropDown = question.querySelector(".dropdown");
      showDropDown.classList.toggle("show-filter");
    }
  });
});

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
    // console.log(element);
    const newItem = list.filter(function (products) {
      let { skinType, brand } = products;
      const trial = skinType.values();
      for (const letter of trial) {
        if (brand === "Nokware") {
          if (element === letter) {
            return products;
          }
          if (element === "all") {
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
    console.log(element);
    const newItem = list.filter(function (products) {
      let { skinIssue, brand } = products;
      const trial = skinIssue.values();
      for (const letter of trial) {
        if (brand === "Nokware") {
          if (element === letter) {
            return products;
          }
          if (element === "all") {
            return products;
          }
        }
      }
      textInput.value = "";
    });
    displayProducts(newItem, productDOM);
  });
};

//CALLING IT
const init = async () => {
  const data = await fetchProducts();
  setSkinType(data);
  setSkinIssue(data);
  displayProducts(data);
  setSearch(data);
  nokware(data);
};
init();
