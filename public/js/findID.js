export const findID = (element) => {
  if (!element) return null;
  let targetElement;
  if (element.target) {
    targetElement = element.target;
  } else {
    targetElement = element;
  }

  const currentTD = targetElement.closest(".table__vehicles--info");

  if (!currentTD || !currentTD.id) return null;

  return currentTD.id.replace(/\D/g, "");
};
