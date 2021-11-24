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
    divVehicle.innerHTML = content;
    return divVehicle;
  }

  mostrarItem(Item) {
    // console.log(Item);
    this.container.append(this.render(Item[0]));
  }
}

class VehiclesListView extends View {
  constructor() {
    super();
  }
}
