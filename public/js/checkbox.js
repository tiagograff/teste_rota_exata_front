const selectTrigger = document.getElementById("selectTrigger");
const optionsList = document.getElementById("optionsList");

selectTrigger.addEventListener("click", () => {
  optionsList.style.display =
    optionsList.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".custom-select")) {
    optionsList.style.display = "none";
  }
});

const checkboxes = optionsList.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const selected = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.parentNode.textContent.trim());
    selectTrigger.querySelector("span").textContent =
      selected.length > 0
        ? selected.join(", ")
        : "Selecione a(s) marca(s) do veículo";
  });
});
