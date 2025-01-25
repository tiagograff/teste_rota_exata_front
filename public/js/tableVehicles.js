let currentPage = 1;

//dados aleatórios
const vehiclesData = Array.from({ length: 30 }, (_, i) => ({
  plate: `ABC-${i + 1000}`,
  mark: `Marca ${i + 1} / Modelo ${i + 1}`,
  year: 2000 + (i % 23),
  color: `Cor ${i + 1}`,
  purpose: `Propósito ${i % 3 === 0 ? "Pessoal" : "Comercial"}`,
  km: i % 2 === 0 ? "Sim" : "Não",
  confort: (i % 5) + 1,
  location: `${-23.5 + i / 100}, ${-46.6 + i / 100}`,
  details: "../img/Frame 1.svg", // Caminho da imagem
}));

const rowsPerPage = 10;
const tableBody = document.querySelector(".table__vehicles--body");
const paginationContainer = document.getElementById("pagination");

function renderTable(page) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = vehiclesData.slice(start, end);

  tableBody.innerHTML = "";

  pageData.forEach((vehicle) => {
    const tr = document.createElement("tr");
    tr.className = "table__vehicles--row";

    tr.innerHTML = `
          <td class="table__vehicles--info">${vehicle.plate}</td>
          <td class="table__vehicles--info">${vehicle.mark}</td>
          <td class="table__vehicles--info">${vehicle.year}</td>
          <td class="table__vehicles--info">${vehicle.color}</td>
          <td class="table__vehicles--info">${vehicle.purpose}</td>
          <td class="table__vehicles--info">${vehicle.km}</td>
          <td id="confortInfo" class="table__vehicles--info">${vehicle.confort}</td>
          <td class="table__vehicles--info">${vehicle.location}</td>
      `;

    const tdDetails = document.createElement("td");
    tdDetails.className = "table__vehicles--info";

    const image = document.createElement("img");
    image.src = vehicle.details;
    image.alt = "Detalhes do veículo";
    image.style.width = "30px";

    tdDetails.appendChild(image);
    tr.appendChild(tdDetails);
    tableBody.appendChild(tr);
  });
}

function updateStatusButton(button) {
  if (button.disabled) {
    button.style.color = "var(--color-grey)";
    button.style.pointerEvents = "none";
  } else {
    button.style.color = "var(--color-text)";
    button.style.pointerEvents = "auto";
  }
}

function renderPagination(totalRows, rowsPerPage) {
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

      renderTable(currentPage);
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

      renderTable(currentPage);

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

      renderTable(currentPage);

      right.disabled = currentPage === pageCount;
      left.disabled = false;
      updateStatusButton(left);
      updateStatusButton(right);
    }
  });
}

renderTable(1);
renderPagination(vehiclesData.length, rowsPerPage);
