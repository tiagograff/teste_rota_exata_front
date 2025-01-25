import { getUser } from "./findUsers.js";
import { eyes } from "./eyes.js";
import { showModalError } from "./modalError.js";
import { showModalOk } from "./modalOk.js";

const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const eye = document.querySelector(".eye");
const loginButton = document.getElementById("loginButton");
const modalError = document.getElementById("modalErrorLogin");
const modalOk = document.getElementById("modalOkLogin");
let ok = false;

function loginUser() {
  userEmail.value === "" || userPassword.value === ""
    ? showModalError(modalError, "Preencha todos os campos")
    : (ok = true);
  if (ok) {
    const user = getUser(userEmail.value, userPassword.value);
    if (user) {
      showModalOk(modalOk, `${user.username} logado com sucesso...`);
      setTimeout(() => {
        window.location.href = "./public/pages/vehicles.html";
        localStorage.setItem("loggedUser", JSON.stringify(user));
      }, 1000);
    } else {
      showModalError(modalError, "Usuário não encontrado");
    }
  }
}

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  loginUser();
});

eyes(eye, userPassword);
