const menu = document.querySelector(".header__profile--image");
menu.addEventListener("click", () => {
  const menuToggle = document.querySelector(".menu__toggle");
  menuToggle.classList.toggle("active");
});
