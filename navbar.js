import menu from "./nav.js";

const openBtn = document.querySelector("#open_nav_btn");
const closeBtn = document.querySelector("#close_nav_btn");
const wrapper = document.querySelector(".sidebar-wrapper");
const sidebarLinks = document.querySelector(".sidebar-links");
const menuItems = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".main-submenu");
const home = document.querySelector("#home");
const nav = document.querySelector(".nav");
const navContainer = document.querySelector(".nav-container");
// const navTextContainer = document.querySelector(".middle-bar");
// const navText = document.querySelector("#nav-bar");
const arrowUp = document.querySelector(".top-link");

//toggle sidebar
openBtn.addEventListener("click", () => {
  wrapper.classList.add("show-nav");
  openBtn.classList.add("remove");
});
closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("show-nav");
  openBtn.classList.remove("remove");
});

//set sidebar contents
sidebarLinks.innerHTML = menu
  .map((item) => {
    const { links, sublinks } = item;
    // console.log(item);
    return `<article class='sidebar-text'>
    <h4>${links}</h4>
    <div class='sidebar-text-submenu'>
  ${sublinks
    .map((item) => {
      return `<a href='${item.url}' class='scroll-link'>
        <span>${item.label}</span>
        </a>`;
    })
    .join("")}
    </div>
    </article>`;
  })
  .join("");

//Set submenu content
menuItems.forEach((item) => {
  item.addEventListener("mouseover", function (event) {
    // console.log(event.currentTarget);
    const text = event.currentTarget.textContent;
    const size = event.currentTarget.getBoundingClientRect();
    // console.log(size);
    const bottom = size.bottom + 1;
    const center = (size.left + size.right) / 2;

    const content = menu.find(({ links }) => links === text);
    // console.log(content);
    if (content) {
      const { links, sublinks } = content;
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      let columns = "col-3";
      if (sublinks.length > 3) {
        columns = "col-5";
      }

      submenu.innerHTML = `
        <article class='submenu-content'>
        <h4>${links}</h4>
        <div class='submenu-center ${columns}'>
      ${sublinks
        .map((sublink) => {
          return `<a href='${sublink.url}' >
        <span>${sublink.label}</span>
        </a>`;
        })
        .join("")}
        </div>
        </article>
        `;
    }
  });
});
nav.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("link-btn")) {
    submenu.classList.remove("show");
  }
});
home.addEventListener("mouseover", function () {
  submenu.classList.remove("show");
});

// sidebarLinks.addEventListener('click', function(){

// })

sidebarLinks.addEventListener("click", () => {
  wrapper.classList.remove("show-nav");
  openBtn.classList.remove("remove");
});

// set small screen navbar scroll
// let prevScrollposition;
// const smallQuery = window.matchMedia("(max-width: 1024px)");
// window.addEventListener("scroll", function () {
//   // console.log(prevScrollposition);
//   const currentScrollPosition = window.scrollY;
//   // console.log(currentScrollPosition);
//   if (prevScrollposition > currentScrollPosition && smallQuery.matches) {
//     navContainer.style.top = "0";
//   } else {
//     navContainer.style.top = "-80px";
//   }
//   prevScrollposition = currentScrollPosition;
// });

//Navbar Scroll
window.addEventListener("scroll", function () {
  // console.log(window.scrollY);
  const scrollHeight = window.scrollY;
  const navHeight = nav.getBoundingClientRect().height;
  const homeHeight = home.getBoundingClientRect().height;
  // console.log(homeHeight);

  // const query = window.matchMedia("(min-width: 1025px)");
  const totalHeight = navHeight + 120;
  if (scrollHeight > totalHeight) {
    navContainer.classList.add("fixed-nav");
  } else {
    navContainer.classList.remove("fixed-nav");
  }

  //arrow scroll
  if (scrollHeight > homeHeight - 120) {
    arrowUp.classList.add("show-link");
  } else {
    arrowUp.classList.remove("show-link");
  }
});
