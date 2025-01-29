import { renderTable } from "./tableVehicles.js";

const paginationContainer = document.getElementById("pagination");
let currentPage = 1;
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];

export function updateStatusButton(button) {
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
