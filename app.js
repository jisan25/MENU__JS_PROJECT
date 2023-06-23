import { menu } from "./data.js";

// selection menuwrapper & btnwrapper
const menuWrapper = document.querySelector(".section-center");
const btnWrapper = document.querySelector(".btn-container");

// after the window is loaded
window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu);
  displayMenuButtons();
});
// display category items
function displayMenuItems(menuItems) {
  const displayMenu = menuItems
    .map((item) => {
      return `<article class="menu-item">
    <img src=${item.img} class="photo" />
    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">${item.price}</h4>
      </header>
      <p class="item-text">
        ${item.desc}
      </p>
    </div>
  </article>`;
    })
    .join("");
  menuWrapper.innerHTML = displayMenu;
}
// display category buttons
function displayMenuButtons() {
  // get unique categories
  const categories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  // add all categories into dom
  const displayCategory = categories
    .map((category) => {
      return `<button class="filter-btn" type="button" data-id=${category}>
    ${category}
  </button>`;
    })
    .join("");
  btnWrapper.innerHTML = displayCategory;

  // filter menu items
  const buttons = btnWrapper.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    // after clicking a button
    btn.addEventListener("click", (e) => {
      // user selected category
      const selectedCategory = e.currentTarget.dataset.id;

      // filter menu with user selected category
      const filteredCategory = menu.filter((item) => {
        if (item.category === selectedCategory) {
          return item;
        }
      });
      // load menu items via selection
      if (selectedCategory === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(filteredCategory);
      }
    });
  });
}
