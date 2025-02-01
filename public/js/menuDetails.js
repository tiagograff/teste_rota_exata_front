import { renderPagination } from "./pagination.js";
import { renderTable } from "./tableVehicles.js";
import { findVehicleInfo, vehicleUpdate } from "./modalEdit.js";

let currentPage = 1;
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];

const rowsPerPage = 7;
const tableBody = document.querySelector(".table__vehicles--body");
const editModal = document.querySelector(".modal__vehicles--edit");

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

  const spanEdit = event.target.closest(".menu__navEdit--item");
  const close = document.getElementById("modalCloseEdit");
  if (spanEdit) {
    editModal.style.display = "flex";
    close.addEventListener("click", () => {
      editModal.style.display = "none";
    });
    const currentTD = event.target.closest(".table__vehicles--info");
    let currentID = currentTD.id.replace(/\D/g, "");
    const objecteVehicle = findVehicleInfo(currentID);
    vehicleUpdate(objecteVehicle);
  }
});
