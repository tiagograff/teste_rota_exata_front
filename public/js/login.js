import { getUser } from "./findUsers.js";
import { eyes } from "./eyes.js";
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const loginButton = document.getElementById("loginButton");

function loginUser() {
  const user = getUser(userEmail.value, userPassword.value);
  if (user) {
    alert("Usuário logado com sucesso!");
    window.location.href =
      "http://127.0.0.1:5500/teste_rota_exata_front/public/pages/vehicles.html";
    localStorage.setItem("loggedUser", JSON.stringify(user));
  } else {
    alert("Usuário não encontrado!");
  }
}

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  loginUser();
});

eyes(userPassword);
