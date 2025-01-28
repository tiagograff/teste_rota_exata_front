import { renderTable, renderPagination } from "./tableVehicles.js";

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];
let originalVehicles = [...vehicles];
let filteredVehicles = [...vehicles];

const rowsPerPage = 7;
let currentPage = 1;

const filterButtonSearch = document.getElementById("filterButton");

const filterMarks = document.querySelectorAll(
  ".container__filter--options .options input[type='checkbox']"
);

function getSelectedMarks() {
  return Array.from(filterMarks)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function filterVehicles() {
  const selectedMarks = getSelectedMarks();

  if (selectedMarks.length > 0) {
    filteredVehicles = originalVehicles.filter((vehicle) =>
      selectedMarks.some((mark) => vehicle.mark.includes(mark))
    );
  } else {
    filteredVehicles = [...originalVehicles];
  }

  currentPage = 1;
  renderTable(currentPage, filteredVehicles);
  renderPagination(filteredVehicles.length, rowsPerPage);
}

filterButtonSearch.addEventListener("click", filterVehicles);
renderTable(currentPage, vehicles);
renderPagination(vehicles.length, rowsPerPage);
