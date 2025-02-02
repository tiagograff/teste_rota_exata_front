import { renderTable } from "./tableVehicles.js";
import { renderPagination } from "./pagination.js";

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];
let originalVehicles = [...vehicles];
let filteredVehiclesMarks = [...vehicles];
let filteredVehiclesPurpose = [...vehicles];
let filteredVehiclesPlate = [...vehicles];

const rowsPerPage = 7;
let currentPage = 1;

const filterButtonSearch = document.getElementById("filterButton");
const filterMarks = document.querySelectorAll(
  ".container__filter--options .options input[type='checkbox']"
);
const filterPurpose = document.getElementById("purposeOfUse");
const filterPlateInput = document.getElementById("vehiclesPlate");
const rubberButton = document.getElementById("rubberButton");

const filterMarkSpan = document.getElementById("filterMarkSpan");

function getSelectedMarks() {
  return Array.from(filterMarks)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function filterVehicles() {
  const selectedMarks = getSelectedMarks();
  let plateValue = filterPlateInput.value.trim().toUpperCase();
  let purposeValue = filterPurpose.options[filterPurpose.selectedIndex].value;

  if (selectedMarks.length > 0) {
    filteredVehiclesMarks = originalVehicles.filter((vehicle) =>
      selectedMarks.some((mark) => vehicle.mark.includes(mark))
    );
  } else {
    filteredVehiclesMarks = [...originalVehicles];
  }

  if (purposeValue.length > 0) {
    filteredVehiclesPurpose = filteredVehiclesMarks.filter((vehicle) =>
      vehicle.purpose.includes(purposeValue)
    );
  } else {
    filteredVehiclesPurpose = [...filteredVehiclesMarks];
  }

  if (plateValue.length > 0) {
    filteredVehiclesPlate = filteredVehiclesPurpose.filter((vehicle) =>
      vehicle.plate.includes(plateValue)
    );
  } else {
    filteredVehiclesPlate = [...filteredVehiclesPurpose];
  }

  currentPage = 1;
  renderTable(currentPage, filteredVehiclesPlate);
  renderPagination(filteredVehiclesPlate.length, rowsPerPage);
}

filterButtonSearch.addEventListener("click", filterVehicles);
rubberButton.addEventListener("click", () => {
  filterMarks.forEach((checkbox) => (checkbox.checked = false));
  filterMarkSpan.innerText = "Selecione a(s) marca(s) do veículo";
  filterMarkSpan.style.color = "var(--color-grey)";
  filterPurpose.selectedIndex = 0;
  filterPlateInput.value = "Selecione a(s) marca(s) do veículo";

  currentPage = 1;
  filteredVehiclesMarks = [...originalVehicles];
  filteredVehiclesPurpose = [...originalVehicles];
  filteredVehiclesPlate = [...originalVehicles];

  renderTable(currentPage, originalVehicles);
  renderPagination(originalVehicles.length, rowsPerPage);
});

renderTable(currentPage, vehicles);
renderPagination(vehicles.length, rowsPerPage);
