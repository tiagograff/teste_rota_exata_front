let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];
const rowsPerPage = 7;
const modalError = document.getElementById("modalErrorVehicles");

import { renderTable } from "./tableVehicles.js";
import { renderPagination } from "./pagination.js";
import { showModalError } from "./modalError.js";

export const vehicleUpdate = (vehicle) => {
  const save = document.getElementById("saveEditVehicle");
  const plate = document.getElementById("vehiclePlateModalEdit");
  const model = document.getElementById("vehicleModelModalEdit");
  const color = document.getElementById("vehicleColorModalEdit");
  const mark = document.getElementById("vehicleMarkModalEdit");
  const year = document.getElementById("vehicleYearModalEdit");
  const purpose = document.getElementById("vehiclePurposeModalEdit");
  const latitude = document.getElementById("vehicleLatitudeModalEdit");
  const longitude = document.getElementById("vehicleLongitudeModalEdit");
  const kilometer = document.getElementById("vehicleKmModalEdit");
  const confort = document.querySelectorAll(
    '.modal__rating--edit input[type="radio"]'
  );
  const selectedComfort =
    Array.from(confort)
      .find((star) => star.checked)
      ?.getAttribute("data-rating") || 0;

  plate.value = vehicle.plate;
  mark.value = vehicle.mark;
  model.value = vehicle.model;
  color.value = vehicle.color;
  year.value = vehicle.year;
  purpose.value = vehicle.purpose;
  latitude.value = vehicle.latitude;
  longitude.value = vehicle.longitude;
  confort.value = selectedComfort;
  kilometer.checked = vehicle.km === "Sim";

  save.addEventListener("click", () => {
    const updatedComfort =
      Array.from(confort)
        .find((star) => star.checked)
        ?.getAttribute("data-rating") || 0;
    const updatedVehicle = {
      plate: plate.value,
      mark: mark.value + " " + model.value,
      color: color.value,
      year: year.value,
      purpose: purpose.value,
      km: kilometer.checked ? "Sim" : "Não",
      confort: updatedComfort,
      location: `${latitude.value}, ${longitude.value}`,
      details: "../img/Frame 1.svg",
    };

    const vehicleIndex = vehicles.findIndex(
      (vehicle) => vehicle.plate === updatedVehicle.plate
    );

    if (vehicleIndex !== -1) {
      vehicles[vehicleIndex] = updatedVehicle;
      loggedUser.vehicles = vehicles;
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      console.log("✅ Veículo atualizado no localStorage!");
    } else {
      showModalError(modalError, "Veículo não encontrado");
    }

    renderTable(1, vehicles);
    renderPagination(vehicles.length, rowsPerPage);
  });
};

export function findVehicleInfo(id) {
  const plateNow = document
    .getElementById(`plateInfo-${id}`)
    .textContent.trim();
  const vehicle = vehicles.find((vehicle) => plateNow === vehicle.plate);
  const plate = vehicle.plate;
  const [mark, model] = vehicle.mark.split(" ");
  const color = vehicle.color;
  const year = vehicle.year;
  const purpose = vehicle.purpose;
  let [latitude, longitude] = vehicle.location.split(" ");
  latitude = latitude.replace(/[^0-9.-]/g, "");
  longitude = longitude.replace(/[^0-9.-]/g, "");
  const km = vehicle.km;
  const confort = vehicle.confort;

  const nowVehicle = {
    plate: plate,
    mark: mark,
    model: model,
    color: color,
    year: year,
    purpose: purpose,
    latitude: latitude,
    longitude: longitude,
    km: km,
    confort: Array.from(confort).find((star) => star.checked)?.value || 0,
  };

  return nowVehicle;
}
