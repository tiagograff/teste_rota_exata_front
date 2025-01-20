let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []; // Corrigido o nome da chave
const login = document.getElementById("login");
const password = document.getElementById("password");
const email = document.getElementById("email");
const username = document.getElementById("username");
const date = document.getElementById("birthday");

function saveToLocalStorage() {
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
}

login.addEventListener("click", () => {
  register();
});

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
