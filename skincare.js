const productDOM = document.querySelector(".ctn");
const url = "skincare.json";

//FETCHING THE PRODUCTS
const fetchProducts = async () => {
  //state when setting up the file
  productDOM.innerHTML = `<h2 style = 'font-size:3rem' >Loading...</h2>`;
  //state if succesful with fetching the data
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    //state if there's an error
    productDOM.innerHTML = `<p>There was an error</p>`;
  }
};

//DISPLAYING THE PRODUCTS
const displayProducts = (list) => {
  const productList = list
    .map((product) => {
      //id, name, image, price
      const { id, name: title, price, image: img } = product;
      //   const image = img[0];
      // console.log(id);
      return `<a class="single-product" href="single.html?id=${id}">
    <div id="swiper-slide" class="card p-card">
        <div class="card-img c-image">
        <img src="${img}" alt="${title}" />
        </div>
        <div class="card-text">
        <h4>${title}</h4>
        <p>${price}</p>
        <button class="add-to-cart"><span>ADD TO CART</span></button>
        </div>
    </div>
    </a>`;
    })
    .join("");
  productDOM.innerHTML = ` ${productList} `;
};

//SEARCH FILTER
const setSearch = (store) => {
  const search = document.querySelector(".input-form");
  const textInput = document.querySelector(".search-input");
  search.addEventListener("keyup", () => {
    const value = textInput.value;
    // console.log(value);
    if (value) {
      const newProducts = store.filter((product) => {
        let { name } = product;
        // console.log(name);
        // name = name.toLowerCase();
        if (name.includes(value)) {
          return product;
          // console.log(product);
        }
        if (name.toLowerCase().includes(value)) {
          return product;
        }
        if (name.toUpperCase().includes(value)) {
          return product;
        }
      });
      // console.log(newProducts);
      displayProducts(newProducts, productDOM);
      if (newProducts.length < 1) {
        productDOM.innerHTML = `<h3 class='filter-error-text'>
        Sorry, no products matched your search. </h3>`;
      }
    } else {
      displayProducts(store, productDOM);
      // console.log(`${productList}`);
    }
  });
};

//SKIN TYPE FILTER
const setSkinType = (list) => {
  const skin = document.querySelector(".skin-types");
  skin.addEventListener("click", function (event) {
    const element = event.target.textContent.toLowerCase();
    // console.log(element);
    const newItem = list.filter(function (products) {
      let { skinType } = products;
      const trial = skinType.values();
      for (const letter of trial) {
        if (element === letter) {
          return products;
        }
      }
      if (element === "all") {
        return products;
      }
    });
    displayProducts(newItem, productDOM);
  });
};

//SKIN ISSUE FILTER
const setSkinIssue = (list) => {
  const skin = document.querySelector(".skin");
  skin.addEventListener("click", function (event) {
    const element = event.target.textContent.toLowerCase();
    // console.log(element);
    const newItem = list.filter(function (products) {
      let { skinIssue } = products;
      const trial = skinIssue.values();
      for (const letter of trial) {
        if (element === letter) {
          return products;
        }
      }
      if (element === "all") {
        return products;
      }
    });
    displayProducts(newItem, productDOM);
  });
};

//CALLING IT
const start = async () => {
  const data = await fetchProducts();
  setSkinType(data);
  setSkinIssue(data);
  displayProducts(data);
  setSearch(data);
};

//PAGINATION
//create an array which contains the number of items per page
// const paginate = (product) => {
//   const itemsPerPage = 8;
//   const numberOfPages = Math.ceil(product.length / itemsPerPage);

//   const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
//     const start = index * itemsPerPage;
//     return product.slice(start, start + itemsPerPage);
//   });
//   return newProducts;
// };
start();

// const pageBtn = document.querySelector(".page");
// let index = 0;
// let pages = [];

// const displayButtons = (container, page, activeIndex) => {
//   let btns = page.map((_, pageIndex) => {
//     return `<button class="page-btn ${
//       activeIndex === pageIndex ? "active-btn" : "null "
//     }" data-index="${pageIndex}">
// ${pageIndex + 1}
// </button>`;
//   });
//   btns.push(`<button class="next-btn"> > </button>`);
//   btns.unshift(`<button class="prev-btn"> < </button>`);
//   container.innerHTML = btns.join("");
// };

// const setup = () => {
//   displayProducts(pages[index]);
//   displayButtons(pageBtn, pages, index);
// };

// const init = async () => {
//   const product = await fetchProducts();
//   pages = paginate(product);

//   setup();
// };

// pageBtn.addEventListener("click", function (e) {
//   if (e.target.classList.contains("page")) return;
//   if (e.target.classList.contains("page-btn")) {
//     index = parseInt(e.target.dataset.index);
//   }
//   if (e.target.classList.contains("next-btn")) {
//     index++;
//     if (index > pages.length - 1) {
//       index = 0;
//     }
//   }
//   if (e.target.classList.contains("prev-btn")) {
//     index--;
//     if (index < 0) {
//       index = pages.length - 1;
//     }
//   }
//   setup();
// });

// window.addEventListener("load", init);

export {
  fetchProducts,
  displayProducts,
  setSearch,
  setSkinIssue,
  setSkinType,
  start,
};
