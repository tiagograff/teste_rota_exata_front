import { getUser } from "./findUsers.js";
import { eyes } from "./eyes.js";
import { showModalError } from "./modalError.js";

document.addEventListener("DOMContentLoaded", () => {
  const userEmail = document.getElementById("userEmail");
  const userPassword = document.getElementById("userPassword");
  const eye = document.querySelector(".eye");
  const loginButton = document.getElementById("loginButton");
  const modalError = document.getElementById("modalErrorLogin");

  const validation = (userEmail, userPassword) => {
    if (userEmail.value === "" || userPassword.value === "") {
      showModalError(modalError, "E-mail ou senha incorretos");
      return false;
    }
    return true;
  };

  function loginUser() {
    if (!validation(userEmail, userPassword)) return;
    const user = getUser(userEmail.value, userPassword.value);
    if (user) {
      alert("Usuário logado com sucesso!");
      window.location.href =
        "http://127.0.0.1:5500/teste_rota_exata_front/public/pages/vehicles.html";
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } else {
      showModalError(modalError, "Usuário não encontrado");
    }
  }

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    loginUser();
  });

  eyes(eye, userPassword);
});
