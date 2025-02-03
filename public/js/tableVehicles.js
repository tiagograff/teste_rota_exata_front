import { renderPagination } from "./pagination.js";

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];

const rowsPerPage = 7;
const tableBody = document.querySelector(".table__vehicles--body");

export function renderTable(page, vehiclesList) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = vehiclesList.slice(start, end);

  let idCounter = 0;

  tableBody.innerHTML = "";

  pageData.forEach((vehicle) => {
    const tr = document.createElement("tr");
    tr.className = "table__vehicles--row";
    tr.id = `tableRow${idCounter}`;
    ++idCounter;
    tr.innerHTML = `
    <td id="plateInfo-${idCounter}" class="table__vehicles--info">${vehicle.plate}</td>
    <td id="markInfo-${idCounter}" class="table__vehicles--info">${vehicle.mark}</td>
    <td id="yearInfo-${idCounter}" class="table__vehicles--info">${vehicle.year}</td>
    <td id="colorInfo-${idCounter}" class="table__vehicles--info">${vehicle.color}</td>
    <td id="purposeInfo-${idCounter}" class="table__vehicles--info">${vehicle.purpose}</td>
    <td id="kmInfo-${idCounter}" class="table__vehicles--info">${vehicle.km}</td>
    <td id="comfortInfo-${idCounter}" class="table__vehicles--info">${vehicle.comfort}</td>
    <td id="locationInfo-${idCounter}" class="table__vehicles--info">${vehicle.location}</td>
 `;

    const tdDetails = document.createElement("td");
    tdDetails.id = `detailsInfo${idCounter}`;
    tdDetails.className = "table__vehicles--info";

    const items = document.createElement("li");
    const spanDetails = document.createElement("span");
    spanDetails.innerText = "Detalhes";
    spanDetails.className = "menu__navDetails--item";
    spanDetails.id = "menuDetails";
    const spanEdit = document.createElement("span");
    spanEdit.className = "menu__navEdit--item";
    spanEdit.id = "menuEdit";
    spanEdit.innerText = "Editar";
    const spanDelete = document.createElement("span");
    spanDelete.className = "menu__navDelete--item";
    spanDelete.id = "menuDelete";
    spanDelete.innerText = "Deletar";

    const menuDetails = document.createElement("nav");
    menuDetails.className = "menu__details";

    items.append(spanDetails, spanEdit, spanDelete);
    menuDetails.appendChild(items);

    const image = document.createElement("img");
    image.src = vehicle.details;
    image.alt = "Detalhes do veículo";
    image.className = "image__details";
    image.style.width = "30px";

    tdDetails.appendChild(image);
    tdDetails.appendChild(menuDetails);
    tr.appendChild(tdDetails);
    tableBody.appendChild(tr);
  });
}

renderTable(1, vehicles);
renderPagination(vehicles.length, rowsPerPage);
