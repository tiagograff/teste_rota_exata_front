const usernameParagraph = document.querySelector(".header__profile--username");

const updateUsername = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  console.log(user);
  if (user) {
    usernameParagraph.innerText = user.username;
    console.log(usernameParagraph);
  } else {
    usernameParagraph.innerHTML = `<a class="usernameChange" href="../pages/register.html">Usuário</a>`;
  }
};

updateUsername();
