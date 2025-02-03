import { renderPaginationHistorical } from "./paginationHistorical.js";
let loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {
  historical: [],
};
let historical =
  loggedUser && Array.isArray(loggedUser.historical)
    ? loggedUser.historical
    : [];

const rowsPerPage = 7;
const tableBody = document.querySelector(".table__historical--body");

export function renderTableHistorical(page, historicalData) {
  const start = (page - 1) * rowsPerPage;
  const end = historicalData.length;
  const pageData = historicalData.slice(start, end);
  tableBody.innerHTML = "";

  pageData.forEach((entry, index) => {
    const tr = document.createElement("tr");

    const globalIndex = start + index;

    tr.className = "table__historical--row";
    tr.id = `tableRowHistorical${globalIndex + 1}`;

    const plateInfo = entry.plate ? `<strong>${entry.plate}</strong>` : "";

    tr.innerHTML = `
    <td id="historicalInfo-${globalIndex + 1}" class="table__historical--info">
      <img src="${entry.image}" alt="${entry.type}" />
      Veículo ${plateInfo} ${entry.type} em ${entry.date} às ${entry.time}
    </td>
  `;

    const tdDetails = document.createElement("td");
    tdDetails.id = `detailsInfo${globalIndex + 1}`;
    tdDetails.className = "table__vehicles--info";

    const items = document.createElement("li");
    const menuDetails = document.createElement("nav");
    menuDetails.className = "menu__details";
    menuDetails.appendChild(items);

    tdDetails.appendChild(menuDetails);
    tr.appendChild(tdDetails);
    tableBody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTableHistorical(1, historical);
  renderPaginationHistorical(historical.length, rowsPerPage);
});
