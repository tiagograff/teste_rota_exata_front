export function eyes(passwordType) {
  passwordType.addEventListener("click", (event) => {
    event.preventDefault();
    if (userPassword.classList.contains("eyesclose")) {
      userPassword.classList.remove("eyesclose");
      userPassword.classList.add("eyesopen");
      userPassword.type = "text";
    } else if (userPassword.classList.contains("eyesopen")) {
      userPassword.classList.remove("eyesopen");
      userPassword.classList.add("eyesclose");
      userPassword.type = "password";
    }
  });
}
