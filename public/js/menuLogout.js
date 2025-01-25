const menu = document.querySelector(".header__profile--image");
const logout = document.querySelector(".menu__toggle--logout");
menu.addEventListener("click", () => {
  const menuToggle = document.querySelector(".menu__toggle");
  menuToggle.classList.toggle("active");
  logout.addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
  });
});
