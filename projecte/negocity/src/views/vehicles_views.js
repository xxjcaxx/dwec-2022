import { View } from "./views.js"

export { VehiclesListView, VehicleView };

class VehicleView extends View {
  constructor(container) { super(container); }

  render(vehicle) {
    let divVehicle = document.createElement("div");
    divVehicle.id = `vehicle-${vehicle.id}`;
    divVehicle.classList.add("col-5","m-1","item");
    // prettier-ignore
    divVehicle.innerHTML = ` 
    <img class="" src="data:image/jpeg;base64,${
      vehicle.img_computed
    }" />
    <div class="itemName">${vehicle.name}</div>
    `;
    return divVehicle;
  }

  mostrarItem(Item){
    console.log(Item);
    this.container.append(this.render(Item[0]));
  }

}




class VehiclesListView extends View {
  constructor() { super(); }
}