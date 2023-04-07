/*home section(swiper js)*/
new Swiper("#swiper1", {
  effect: "fade",
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  lazyLoading: true,
  pagination: {
    el: "#swiper1 .swiper-pagination",
    clickable: true,
  },
});
/*end of home*/

/*modal*/
const modal = document.querySelector(".modal");
const close = document.querySelector(".close-modal span");

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    modal.classList.add("show-modal");
  }, 4000);
});

close.addEventListener("click", function () {
  modal.classList.remove("show-modal");
});
/*End of modal


/*About section*/
const aboutBtn = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const texts = document.querySelectorAll(".about-text");
const images = document.querySelectorAll(".about-img");

about.addEventListener("click", function (e) {
  const dataId = e.target.dataset.id;
  if (dataId) {
    aboutBtn.forEach(function (button) {
      button.classList.remove("active");
      e.target.classList.add("active");
    });

    texts.forEach(function (text) {
      text.classList.remove("active");
    });
    images.forEach(function (image) {
      image.classList.remove("active");
    });
    const show = document.getElementById(dataId);
    show.classList.add("active");
  }
});

/*Reviews section(swiper js)*/
var swiper = new Swiper(".swiper4", {
  slidesPerView: 1, //when window is < 600px(small screen)
  spaceBetween: 50,
  allowSlideNext: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    clickable: true,
  },

  // Responsive Breakpoints
  breakpoints: {
    //when window is >= 600px(medium screen)
    600: {
      slidesPerView: 2,
    },
    //when window is >= 1024px(large screen)
    1024: {
      slidesPerView: 4,
    },
  },
});
/*end of reviews*/

/*Promo section*/
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const promoEnds = document.querySelector(".promo-ends");
const countdown = document.querySelector(".promo-countdown");
const item = document.querySelectorAll(".countdown h4");

let alwaysDay = new Date();
let alwaysYear = alwaysDay.getFullYear();
let alwaysMonth = alwaysDay.getMonth();
let alwaysDate = alwaysDay.getDate();

// let endDate = new Date(2023, 2, 11, 12, 30, 0); //counter set manually
const endDate = new Date(alwaysYear, alwaysMonth, alwaysDate + 5, 12, 30, 0); //adds 5 days to current day so counter always works
const year = endDate.getFullYear();
const hours = endDate.getHours();
const minutes = endDate.getMinutes();
const date = endDate.getDate();
const day = weekdays[endDate.getDay()];
let month = endDate.getMonth();
month = months[month];

promoEnds.textContent = `Promo ends on ${day}, ${date} ${month}, ${year} ${hours}:${minutes}p.m.`;

//countdown
const endTime = endDate.getTime(); //will give time in milliseconds

function remainingTime() {
  const today = new Date().getTime();
  const remainder = endTime - today; //will give the time remaing to promo end

  /*
  1s = 1000ms
  1m = 60s
  1hr = 60mins
  1day = 24hrs
  */

  //values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  let dayss = Math.floor(remainder / oneDay);
  let hourss = Math.floor((remainder % oneDay) / oneHour);
  let minutess = Math.floor((remainder % oneHour) / oneMinute);
  let secondss = Math.floor((remainder % oneMinute) / oneSecond);

  const values = [dayss, hourss, minutess, secondss];

  function change(items) {
    if (items < 10) {
      return (items = `0${items}`);
    }
    return items;
  }

  item.forEach(function (items, index) {
    items.innerHTML = change(values[index]);
  });

  if (remainder < 0) {
    clearInterval(down);
    countdown.innerHTML = `<h3 class='promo-end-text'>Sorry, this promo has ended.</h3>`;
  }
}

//loop countdown
let down = setInterval(remainingTime, 1000);
remainingTime();

/*footer*/
const footerDate = document.getElementById("footer-date");
footerDate.innerHTML = new Date().getFullYear();
