import { showModalError } from "./modalError.js";
import { showModalOk } from "./modalOk.js";

let vehicles = JSON.parse(localStorage.getItem("registeredUsers")) || [];
const register = document.getElementById("registerVehicle");
const modal = document.querySelector(".modal__vehicles");
const close = document.getElementById("modalClose");
const save = document.getElementById("saveRegisterVehicle");
const plate = document.getElementById("vehiclePlateModal");
const model = document.getElementById("vehicleModelModal");
const color = document.getElementById("vehicleColorModal");
const mark = document.getElementById("vehicleMarkModal");
const year = document.getElementById("vehicleYearModal");
const purpose = document.getElementById("vehiclePurposeModal");
const latitude = document.getElementById("vehicleLatitudeModal");
const longitude = document.getElementById("vehicleLongitudeModal");
const confort = document.querySelectorAll('.modal__rating input[type="radio"]');
const kilimeter = document.getElementById("vehicleKmModal");
const modalOk = document.getElementById("modalOkVehicles");
const modalError = document.getElementById("modalErrorVehicles");

const saveToLocalStorage = () => {
  localStorage.setItem("registeredVehicles", JSON.stringify(vehicles));
};

const validationModal = () => {
  if (
    plate.value === "" ||
    model.value === "" ||
    color.value === "" ||
    mark.value === "" ||
    year.value === "" ||
    purpose.value === "" ||
    latitude.value === "" ||
    longitude.value === "" ||
    !Array.from(confort).some((input) => input.checked)
  ) {
    return false;
  } else {
    return true;
  }
};

register.addEventListener("click", () => {
  modal.style.display = "flex";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

save.addEventListener("click", (event) => {
  event.preventDefault();
  modal.style.display = "none";
  if (validationModal()) {
    const newVehicle = {
      plate: plate.value,
      model: model.value,
      color: color.value,
      mark: mark.value,
      year: year.value,
      purpose: purpose.value,
      latitude: latitude.value,
      longitude: longitude.value,
      confort: confort.value,
      kilimeter: kilimeter.value,
    };
    vehicles.push(newVehicle);
    saveToLocalStorage(vehicles);
    showModalOk(modalOk, "Veículo cadastrado com sucesso!");
  } else {
    showModalError(modalError, "Preencha todos os campos!");
  }
});
