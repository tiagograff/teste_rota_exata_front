export function eyes(eye, userinput) {
  eye.addEventListener("click", (event) => {
    event.preventDefault();
    if (eye.classList.contains("eyesclose")) {
      eye.classList.remove("eyesclose");
      eye.classList.add("eyesopen");
      eye.style.backgroundImage =
        `url("./public/img/eye.svg")` ||
        `url("https://github.com/tiagograff/teste_rota_exata_front/blob/main/public/img/eye.svg")`;
      userinput.type = "text";
    } else if (eye.classList.contains("eyesopen")) {
      eye.classList.remove("eyesopen");
      eye.classList.add("eyesclose");
      eye.style.backgroundImage =
        `url("./public/img/eye-slash-solid.svg")` ||
        `url(https://github.com/tiagograff/teste_rota_exata_front/blob/main/public/img/eye-slash-solid.svg")`;
      userinput.type = "password";
    }
  });
}
