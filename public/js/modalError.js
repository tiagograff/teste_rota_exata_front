export const showModalError = (modal, message) => {
  modal.style.display = "flex";
  modal.innerText = message;
  setTimeout(() => {
    modal.style.display = "none";
  }, 5000);
};
