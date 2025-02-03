import { renderPaginationHistorical } from "./paginationHistorical.js";

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];
let historical =
  loggedUser && loggedUser.historical ? loggedUser.historical : [];

const rowsPerPage = 7;
const tableBody = document.querySelector(".table__historical--body");

export function renderTableHistorical(page, vehiclesList) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = vehiclesList.slice(start, end);
  tableBody.innerHTML = "";

  console.log(loggedUser.historical);
  pageData.forEach((vehicle, index) => {
    const tr = document.createElement("tr");

    // Usando historical diretamente
    const historyEntry = historical[index] || {
      type: "N/A",
      date: "N/A",
      time: "N/A",
    }; // Garantindo que haja um fallback

    tr.className = "table__historical--row";
    tr.id = `tableRowHistorical${index + 1}`;

    tr.innerHTML = `
      <td id="historicalInfo-${index + 1}" class="table__historical--info">
        Veículo <strong>${vehicle.plate} ${historyEntry.type} em ${
      historyEntry.date
    } às ${historyEntry.time}</strong>
      </td>
    `;

    const tdDetails = document.createElement("td");
    tdDetails.id = `detailsInfo${index + 1}`;
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

    tdDetails.appendChild(menuDetails);
    tr.appendChild(tdDetails);
    tableBody.appendChild(tr);
  });
}

renderTableHistorical(1, vehicles);
renderPaginationHistorical(vehicles.length, rowsPerPage);
