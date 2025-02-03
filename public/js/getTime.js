export const getTime = (type, plate) => {
  const typeOfOperation = type;
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const timeString = `${hours}:${minutes}:${seconds}`;

  return {
    image:
      typeOfOperation === "CADASTRADO"
        ? "../img/plus-solid.svg"
        : typeOfOperation === "EDITADO"
        ? "../img/pen-solid.svg"
        : "../img/trash-solid.svg",
    type: typeOfOperation,
    date: formattedDate,
    time: timeString,
    plate: plate,
  };
};
