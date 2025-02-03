import { showModalError } from "./modalError.js";
import { showModalOk } from "./modalOk.js";
import { getTime } from "./getTime.js";

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

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
const comfort = document.querySelectorAll('.modal__rating input[type="radio"]');
const kilometer = document.getElementById("vehicleKmModal");
const modalOk = document.getElementById("modalOkVehicles");
const modalError = document.getElementById("modalErrorVehicles");

export const saveToLocalStorage = (loggedUser) => {
  localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
};

const closeAllModals = () => {
  document
    .querySelectorAll(
      ".modal__vehicles, .modal__vehicles--edit, .modal__vehicles--details"
    )
    .forEach((modal) => {
      modal.style.display = "none";
    });
};

export const validationModal = () => {
  const isPlateRegistered = loggedUser.vehicles.some(
    (vehicle) => vehicle.plate.toUpperCase() === plate.value.toUpperCase()
  );

  if (isPlateRegistered) {
    showModalError(modalError, "Placa já cadastrada");
    return;
  }

  if (
    plate.value === "" ||
    model.value === "" ||
    color.value === "" ||
    mark.value === "" ||
    year.value === "" ||
    purpose.value === "" ||
    latitude.value === "" ||
    longitude.value === "" ||
    !Array.from(comfort).some((input) => input.checked)
  ) {
    showModalError(modalError, "Preencha todos os campos!");
    return false;
  } else {
    return true;
  }
};

register.addEventListener("click", () => {
  closeAllModals();
  modal.style.display = "flex";
});

close.addEventListener("click", () => {
  closeAllModals();
});

save.addEventListener("click", (event) => {
  event.preventDefault();
  modal.style.display = "none";
  if (validationModal()) {
    const selectedStar = document.querySelector(".modal__rating input:checked");
    const comfortValueRegister = selectedStar ? selectedStar.value : 0;
    const newVehicle = {
      plate: plate.value.trim().toUpperCase(),
      mark: mark.value + " " + model.value,
      color: color.value,
      year: year.value,
      purpose: purpose.value,
      km: kilometer.checked === true ? "Sim" : "Não",
      comfort: comfortValueRegister,
      location: `${latitude.value}, ${longitude.value}`,
      details: "../img/Frame 1.svg",
    };
    loggedUser.vehicles.push(newVehicle);

    const historicalEntry = getTime("CADASTRADO", newVehicle.plate);
    loggedUser.historical.push(historicalEntry);

    saveToLocalStorage(loggedUser);
    showModalOk(modalOk, "Veículo cadastrado com sucesso!");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
});
