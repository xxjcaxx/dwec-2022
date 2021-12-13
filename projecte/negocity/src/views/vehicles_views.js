import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";

import { View } from "./views.js";

export { VehiclesListView, VehicleView };

class VehicleView extends View {
  constructor(container, type) {
    super(container);
    this.type = type;
  }

  render(vehicle) {
    let divVehicle = document.createElement("div");
    divVehicle.id = `vehicle-${vehicle.id}`;
    divVehicle.classList.add("col-5", "m-1", "item");
    // prettier-ignore
    let content =  ` 
    <img class="" src="data:image/jpeg;base64,${ vehicle.img_computed}" />
    `;
    if (this.type == "mini") {
      divVehicle.classList.add("col-5");
      content += `<div class="itemName">${vehicle.name}</div>`;
    }
    if (this.type == "details") {
      divVehicle.classList.add("col-1", "details");
      content += `<div class="itemName">
      <span class="nameDetails">${vehicle.name}</span>
      <span class="">Oil Consumption: ${vehicle.oil_consumption}</span>
      <span class="">Gas Tank: ${vehicle.gas_tank}</span>
      <span class="">Gas Level: ${vehicle.gas_tank_level}</span>
      <span class="">Speed: ${vehicle.speed}</span>
      <span class="">Passengers: ${vehicle.passengers}</span>
      </div>
      `;
    }
    if (this.type == "choose") {
      divVehicle.classList.add("col-1", "details");
      content += `<div class="itemName">
      <span class="nameDetails">${vehicle.name}</span>
      <span class=""><i class="fas fa-gas-pump"></i>: ${vehicle.oil_consumption} l/100km</span>
      <span class=""><i class="fas fa-gas-pump"></i>: ${vehicle.gas_tank}</span>
      <span class="" id="gas-level-${vehicle.id}"><i class="fas fa-oil-can"></i>: ${vehicle.gas_tank_level}</span>
      <span class=""><i class="fas fa-tachometer-alt"></i>: ${vehicle.speed}</span>
      <span class=""><i class="fas fa-users"></i>: ${vehicle.passengers}</span>
      <span class="time" id="time-${vehicle.id}"><i class="fas fa-stopwatch"></i>: **********</span><span class="oil_required" id="oil-${vehicle.id}"><i class="fas fa-gas-pump"></i>: **********</span>
      <button type="button" class="btn btn-dark">Choose</button>
      </div>
      `;
    }
    divVehicle.innerHTML = content;
    return divVehicle;
  }

  mostrarItem(Item) {
    console.log(Item);
    this.container.append(this.render(Item[0]));
  }

  anyadirDetalles(Detalles) {
    console.log(Detalles);
    this.container.querySelector(
      "#time-" + Detalles.vehicle.id
    ).innerHTML = `<i class="fas fa-stopwatch"></i>: ${Detalles.time}`;
    this.container.querySelector(
      "#oil-" + Detalles.vehicle.id
    ).innerHTML = `<i class="fas fa-gas-pump"></i>: ${Detalles.oil_required}`;
    if (Detalles.oil_required > Detalles.vehicle.gas_tank_level) {
      this.container
        .querySelector("#gas-level-" + Detalles.vehicle.id)
        .classList.add("warning");
    }
    // this.container.append(this.render(Item[0]));
  }
}

class VehiclesListView extends View {
  constructor() {
    super();
  }
}
