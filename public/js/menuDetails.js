import { renderPagination } from "./pagination.js";
import { renderTable } from "./tableVehicles.js";

let currentPage = 1;
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];

const rowsPerPage = 7;
const tableBody = document.querySelector(".table__vehicles--body");

tableBody.addEventListener("click", (event) => {
  const detailsElement = event.target.closest(".image__details");
  if (detailsElement) {
    const parentTd = detailsElement.parentElement;
    const menuDetails = parentTd.querySelector(".menu__details");

    if (menuDetails) {
      if (menuDetails.classList.contains("active")) {
        menuDetails.classList.remove("active");
      } else {
        document
          .querySelectorAll(".menu__details.active")
          .forEach((element) => {
            element.classList.remove("active");
          });
        menuDetails.classList.add("active");
      }
    }
  }

  const spanDelete = event.target.closest(".menu__navDelete--item");
  if (spanDelete) {
    const trElement = spanDelete.closest("tr");
    const vehiclePlate = trElement.querySelector(
      ".table__vehicles--info"
    ).textContent;

    vehicles = vehicles.filter((vehicle) => vehicle.plate !== vehiclePlate);

    loggedUser.vehicles = vehicles;
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

    trElement.remove();

    renderTable(currentPage, vehicles);
    renderPagination(vehicles.length, rowsPerPage);
    window.location.reload();
  }
});
