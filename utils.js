const dropDown = document.querySelectorAll(".dropdown");

dropDown.forEach(function (event) {
  event.addEventListener("click", function (e) {
    const question = e.target.parentElement;
    if (question) {
      const showDropDown = question.querySelector(".each-filter");
      showDropDown.classList.toggle("show-filter");
    }
  });
});

const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
  return formattedPrice;
};

export { formatPrice };
