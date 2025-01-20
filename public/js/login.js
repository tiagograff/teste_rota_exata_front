let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const login = document.getElementById("login");

function getUser(email, password) {
  return registeredUsers.find(
    (user) => user.email === email && user.password === password
  );
}

function loginUser() {
  const user = getUser(userEmail.value, userPassword.value);
  if (user) {
    alert("Usuário logado com sucesso!");
  } else {
    alert("Usuário não encontrado!");
  }
}

login.addEventListener("click", () => {
  loginUser();
});
