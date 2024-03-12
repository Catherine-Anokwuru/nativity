const allProductsUrl = "skincare.json";

export const fetchProduct = async () => {
  try {
    const response = await fetch(allProductsUrl);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
fetchProduct();
// const displayProduct = (list) => {
//   list.find((products) => {
//     const params = new URLSearchParams(window.location.search);
//     const ids = params.get("id");
//     console.log(ids);
//     // products.id;
//     if (products.id === ids) {
//       return products.id;
//     }
//   });
// };
// const singleUrl = displayProduct();
