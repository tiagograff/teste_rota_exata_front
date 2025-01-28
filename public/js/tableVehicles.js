let currentPage = 1;
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];

const rowsPerPage = 7;
const tableBody = document.querySelector(".table__vehicles--body");
const paginationContainer = document.getElementById("pagination");

export function renderTable(page, vehiclesList) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = vehiclesList.slice(start, end);

  let idCounter = start;

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
    <td id="confortInfo-${idCounter}" class="table__vehicles--info">${vehicle.confort}</td>
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

    renderTable(currentPage, vehicles);
    renderPagination(vehicles.length, rowsPerPage);
    window.location.reload();
  }
});

function updateStatusButton(button) {
  if (button.disabled) {
    button.style.color = "var(--color-grey)";
    button.style.pointerEvents = "none";
  } else {
    button.style.color = "var(--color-text)";
    button.style.pointerEvents = "auto";
  }
}

export function renderPagination(totalRows, rowsPerPage) {
  const pageCount = Math.ceil(totalRows / rowsPerPage);
  paginationContainer.innerHTML = "";

  const left = document.createElement("button");
  left.id = "buttonLeft";
  left.textContent = "<";
  left.disabled = true;
  updateStatusButton(left);
  paginationContainer.appendChild(left);

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className =
      i === 1 ? "pagination__button active" : "pagination__button";

    button.addEventListener("click", () => {
      currentPage = i;

      document
        .querySelector(".pagination__button.active")
        .classList.remove("active");
      button.classList.add("active");

      left.disabled = currentPage === 1;
      right.disabled = currentPage === pageCount;
      updateStatusButton(left);
      updateStatusButton(right);

      renderTable(currentPage, vehicles);
    });

    paginationContainer.appendChild(button);
  }

  const right = document.createElement("button");
  right.id = "buttonRight";
  right.textContent = ">";
  right.disabled = pageCount === 1;
  updateStatusButton(right);
  paginationContainer.appendChild(right);

  left.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      document
        .querySelector(".pagination__button.active")
        .classList.remove("active");
      paginationContainer
        .querySelectorAll("button")
        [currentPage].classList.add("active");

      renderTable(currentPage, vehicles);

      left.disabled = currentPage === 1;
      right.disabled = false;
      updateStatusButton(left);
      updateStatusButton(right);
    }
  });

  right.addEventListener("click", () => {
    if (currentPage < pageCount) {
      currentPage += 1;
      document
        .querySelector(".pagination__button.active")
        .classList.remove("active");
      paginationContainer
        .querySelectorAll("button")
        [currentPage].classList.add("active");

      renderTable(currentPage, vehicles);

      right.disabled = currentPage === pageCount;
      left.disabled = false;
      updateStatusButton(left);
      updateStatusButton(right);
    }
  });
}

renderTable(1, vehicles);
renderPagination(vehicles.length, rowsPerPage);
