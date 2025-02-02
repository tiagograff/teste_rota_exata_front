let map;
let marker;
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let vehicles = loggedUser && loggedUser.vehicles ? loggedUser.vehicles : [];

document.addEventListener("modalOpened", function (event) {
  setTimeout(() => {
    const currentID = event.detail.currentID;
    const plateElement = document.getElementById(`plateInfo-${currentID}`);

    if (!plateElement) {
      console.error("Elemento da placa não encontrado!");
      return;
    }

    const currentPlate = plateElement.innerText.trim();
    console.log("Placa atual:", currentPlate);

    const vehicle = vehicles.find((v) => v.plate === currentPlate);
    if (!vehicle) {
      console.error("Veículo não encontrado para a placa:", currentPlate);
      return;
    }

    console.log("Veículo encontrado:", vehicle);

    let [latitude, longitude] = vehicle.location.split(" ");
    latitude = parseFloat(latitude.replace(/[^0-9.-]/g, ""));
    longitude = parseFloat(longitude.replace(/[^0-9.-]/g, ""));

    if (!map) {
      map = L.map("map", { zoomControl: false }).setView(
        [latitude, longitude],
        15
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    } else {
      map.setView([latitude, longitude], 15);
    }

    if (marker) {
      map.removeLayer(marker);
    }

    marker = L.marker([latitude, longitude]).addTo(map).openPopup();

    map.invalidateSize();
  }, 300);
});
