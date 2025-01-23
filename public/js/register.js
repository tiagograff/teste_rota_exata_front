import { eyes } from "./eyes.js";
import { showModalError } from "./modalError.js";
import { showModalOk } from "./modalOk.js";

let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []; // Corrigido o nome da chave
const registerButton = document.getElementById("registerButton");
const password = document.getElementById("password");
const email = document.getElementById("email");
const username = document.getElementById("username");
const date = document.getElementById("birthday");
const confirmPassword = document.getElementById("confirmPassword");
const eyePassword = document.querySelector(".eyePassword");
const eyeConfirmPassword = document.querySelector(".eyeConfirmPassword");
const modalError = document.getElementById("modalErrorLogin");
const modalOk = document.getElementById("modalOkLogin");

document.addEventListener("DOMContentLoaded", (event) => {
  function saveToLocalStorage() {
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  }

  const validationPassword = (password) => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    return regex.test(password);
  };

  const validationEmail = (email) => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regex.test(email);
  };

  const validation = (userEmail, userPassword) => {
    if (
      username.value === "" ||
      userEmail.value === "" ||
      userPassword.value === "" ||
      date.value === "" ||
      confirmPassword.value === ""
    ) {
      showModalError(modalError, "Preencha todos os campos");
      return false;
    } else if (!validationEmail(userEmail.value)) {
      showModalError(modalError, "Email inválido");
      return false;
    } else if (!validationPassword(userPassword.value)) {
      showModalError(modalError, "Senha fraca");
      return false;
    } else if (userPassword.value !== confirmPassword.value) {
      showModalError(modalError, "As senhas não são iguais");
      return false;
    }
    return true;
  };

  registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (validation(email, password)) {
      const users = {
        username: username.value,
        email: email.value,
        password: password.value,
        birthday: date.value,
      };
      registeredUsers.push(users);
      saveToLocalStorage();
      showModalOk(modalOk, "Usuário cadastrado com sucesso");
      setTimeout(() => {
        window.location.href = "/teste_rota_exata_front/index.html";
      }, 1000);
      username.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
      date.value = "";
    }
  });

  eyes(eyePassword, password);
  eyes(eyeConfirmPassword, confirmPassword);
});
