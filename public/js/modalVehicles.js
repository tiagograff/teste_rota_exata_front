import { showModalError } from "./modalError.js";
import { showModalOk } from "./modalOk.js";

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
const confort = document.querySelectorAll('.modal__rating input[type="radio"]');
const kilimeter = document.getElementById("vehicleKmModal");
const modalOk = document.getElementById("modalOkVehicles");
const modalError = document.getElementById("modalErrorVehicles");

const saveToLocalStorage = (loggedUser) => {
  localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
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
    const confortStars = document.querySelectorAll(".modal__rating input");
    let confortValue = 0;

    confortStars.forEach((star) => {
      if (star.checked) {
        confortValue = star.getAttribute("data-rating");
      }
    });
    const newVehicle = {
      plate: plate.value,
      mark: mark.value + " " + model.value,
      color: color.value,
      year: year.value,
      purpose: purpose.value,
      km: kilimeter.checked === true ? "Sim" : "Não",
      confort: confortValue,
      location: `${latitude.value}, ${longitude.value}`,
      details: "../img/Frame 1.svg",
    };
    loggedUser.vehicles.push(newVehicle);
    saveToLocalStorage(loggedUser);
    showModalOk(modalOk, "Veículo cadastrado com sucesso!");
    window.location.reload();
  } else {
    showModalError(modalError, "Preencha todos os campos!");
  }
});
