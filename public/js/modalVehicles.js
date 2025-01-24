const register = document.getElementById("registerVehicle");
const modal = document.querySelector(".modal__vehicles");
const close = document.getElementById("modalClose");

register.addEventListener("click", () => {
  modal.style.display = "flex";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});
