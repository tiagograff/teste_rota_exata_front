export function eyes(eye, userinput) {
  const currentPage = window.location.pathname;
  let primaryURL, secondaryURL;

  if (currentPage.includes("register.html")) {
    primaryURL = "../img/eye.svg";
    secondaryURL = "../img/eye-slash-solid.svg";
  } else {
    primaryURL = "./public/img/eye.svg";
    secondaryURL = "./public/img/eye-slash-solid.svg";
  }

  eye.addEventListener("click", (event) => {
    event.preventDefault();

    if (eye.classList.contains("eyesclose")) {
      eye.classList.remove("eyesclose");
      eye.classList.add("eyesopen");
      setBackgroundImage(eye, primaryURL, secondaryURL);
      userinput.type = "text";
    } else if (eye.classList.contains("eyesopen")) {
      eye.classList.remove("eyesopen");
      eye.classList.add("eyesclose");
      setBackgroundImage(eye, secondaryURL, primaryURL);
      userinput.type = "password";
    }
  });
}

function setBackgroundImage(element, primaryURL, secondaryURL) {
  element.style.backgroundImage = `url("${primaryURL}")`;

  element.onerror = () => {
    element.style.backgroundImage = `url("${secondaryURL}")`;
  };
}
