import { renderPagination } from "./pagination.js";
import { renderTable } from "./tableVehicles.js";
import { findVehicleInfo, vehicleUpdate } from "./modalEdit.js";
import { findID } from "./findID.js";
import { getTime } from "./getTime.js";
import { saveToLocalStorage } from "./modalVehicles.js";

let currentPage = 1;
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];
let currentID = 0;
const rowsPerPage = 7;
const tableBody = document.querySelector(".table__vehicles--body");
const editModal = document.querySelector(".modal__vehicles--edit");
const detailsModal = document.querySelector(".modal__vehicles--details");

const plateDetails = document.getElementById("plateSpan");
const markDetails = document.getElementById("markSpan");
const yearDetails = document.getElementById("yearSpan");
const colorDetails = document.getElementById("colorSpan");
const purposeDetails = document.getElementById("purposeSpan");
const kmDetails = document.getElementById("kmSpan");
const comfortDetails = document.getElementById("comfortSpan");
const locationDetails = document.getElementById("locationSpan");

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

    const historicalEntry = getTime("DELETADO", vehiclePlate);
    loggedUser.historical.push(historicalEntry);
    saveToLocalStorage(loggedUser);

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
    currentID = findID(event);
    const objecteVehicle = findVehicleInfo(currentID);
    vehicleUpdate(objecteVehicle);

    const historicalEntry = getTime("EDITADO", objecteVehicle.plate);
    loggedUser.historical.push(historicalEntry);
    saveToLocalStorage(loggedUser);
  }

  const spanDetails = event.target.closest(".menu__navDetails--item");
  const closeDetails = document.getElementById("modalCloseDetails");
  if (spanDetails) {
    detailsModal.style.display = "flex";
    currentID = findID(event);
    const eventModalOpened = new CustomEvent("modalOpened", {
      detail: { currentID },
    });
    document.dispatchEvent(eventModalOpened);

    const vehicleInfos = findVehicleInfo(currentID);
    let comfortValue = document.getElementById(`comfortInfo-${currentID}`);
    comfortValue = comfortValue.textContent.trim();

    plateDetails.textContent = vehicleInfos.plate;
    markDetails.textContent = vehicleInfos.mark + " " + vehicleInfos.model;
    yearDetails.textContent = vehicleInfos.year;
    colorDetails.textContent = vehicleInfos.color;
    purposeDetails.textContent = vehicleInfos.purpose;
    kmDetails.textContent = vehicleInfos.km;
    comfortDetails.textContent = comfortValue;
    locationDetails.textContent =
      vehicleInfos.latitude + ", " + vehicleInfos.longitude;

    closeDetails.addEventListener("click", () => {
      detailsModal.style.display = "none";
    });
  }
});
