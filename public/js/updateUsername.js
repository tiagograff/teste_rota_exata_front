const usernameParagraph = document.querySelector(".header__profile--username");

const updateUsername = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (user) {
    usernameParagraph.innerText = user.username;
  } else {
    usernameParagraph.innerHTML = `<a class="usernameChange" href="../pages/register.html">Usuário</a>`;
  }
};

updateUsername();
