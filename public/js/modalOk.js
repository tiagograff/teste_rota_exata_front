export const showModalOk = (modal, message) => {
  modal.style.display = "flex";
  modal.innerText = message;
  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
};
