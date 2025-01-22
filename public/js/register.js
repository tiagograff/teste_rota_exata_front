import { eyes } from "./eyes.js";
document.addEventListener("DOMContentLoaded", () => {
  let registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || []; // Corrigido o nome da chave
  const registerButton = document.getElementById("registerButton");
  const password = document.getElementById("password");
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const date = document.getElementById("birthday");
  const confirmPassword = document.getElementById("confirmPassword");
  const eyePassword = document.querySelector(".eyePassword");
  const eyeConfirmPassword = document.querySelector(".eyeConfirmPassword");

  function saveToLocalStorage() {
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  }

  const validation = (userEmail, userPassword) => {
    if (userEmail.value === "" || userPassword.value === "") {
      showModalError(modalError, "Preencha todos os campos");
      return false;
    } else if (!validationPassword(userPassword)) {
      showModalError(modalError, "Senha fraca");
      return false;
    } else if (!validationEmail(userEmail)) {
      showModalError(modalError, "Email inválido");
      return false;
    }
    return true;
  };

  const validationPassword = (password) => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    regex.test(password) ? false : true;
  };

  const validationEmail = (email) => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    regex.test(email) ? false : true;
  };

  function register() {
    const user = {
      username: username.value,
      email: email.value,
      password: password.value,
      birthday: date.value,
    };

    registeredUsers.push(user);
    saveToLocalStorage();
  }

  registerButton.addEventListener("click", () => {
    validation(registeredUsers.email, registeredUsers.password);
    register();
  });

  eyes(eyePassword, password);
  eyes(eyeConfirmPassword, confirmPassword);
});
