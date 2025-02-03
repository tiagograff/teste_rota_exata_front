import { renderTableHistorical } from "./tableHistorical.js";
import { renderPaginationHistorical } from "./paginationHistorical.js";

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];
let originalVehicles = [...vehicles];
let filteredVehiclesPlate = [...vehicles];

const rowsPerPage = 7;
let currentPage = 1;

const filterButtonSearch = document.getElementById("buttonSearchHistorical");
const filterPlateInput = document.getElementById("vehiclesPlate");
const rubberButton = document.getElementById("buttonRubberHistorical");

function filterVehicles() {
  let plateValue = filterPlateInput.value.trim();

  if (plateValue.length > 0) {
    filteredVehiclesPlate = originalVehicles.filter((vehicle) =>
      vehicle.plate.includes(plateValue)
    );
  } else {
    filteredVehiclesPlate = [...originalVehicles];
  }

  currentPage = 1;
  renderTableHistorical(currentPage, filteredVehiclesPlate);
  renderPaginationHistorical(filteredVehiclesPlate.length, rowsPerPage);
}

filterButtonSearch.addEventListener("click", filterVehicles);
rubberButton.addEventListener("click", () => {
  filterPlateInput.value = "";

  currentPage = 1;
  filteredVehiclesPlate = [...originalVehicles];

  renderTableHistorical(currentPage, originalVehicles);
  renderPaginationHistorical(originalVehicles.length, rowsPerPage);
});

renderTableHistorical(currentPage, vehicles);
renderPaginationHistorical(vehicles.length, rowsPerPage);
