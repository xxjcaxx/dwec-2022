import { View } from "./views.js";
import {Modal} from "bootstrap";
import { SurvivorList, VehicleList, VehicleListTravel } from "../components/game_components.js";

export { ConnectionsListView, ConnectionView };

class ConnectionView extends View {
  constructor(container, type, city) {
    super(container);
    this.type = type;
    this.city = city;
  }

  render(connection) {
    let elementConnection = document.createElement("tr");
    elementConnection.classList.add("connection");
    const cityConnection = this.city.name == connection.city_1[1] ? connection.city_1[1] : connection.city_2[1];
   // console.log(connection);
    elementConnection.innerHTML = `
             <td>${cityConnection}</td>
             <td>${Math.round(connection.distance * 100) / 100} Km</td>
             <td><button type="button" class="go btn btn-dark">Go!</button>
             </td>
    `;


    const goButton = elementConnection.querySelector('button.go');
    goButton.addEventListener('click',()=>{
      //console.log(this.city);
      const modalWrap = document.createElement('div');
      modalWrap.innerHTML = `
      <div class="modal fade modal-dark " id="travelModal" tabindex="-1" aria-labelledby="travelModal" aria-hidden="true">
      <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Launch Travel</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Origin: ${this.city.name} Destiny: ${cityConnection}</p>
          <h4>Available vehicles</h4>
          <div class="availableVehicles row"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
    </div>`;


      const availableVehiclesDiv = modalWrap.querySelector('.availableVehicles');
     // let survivorsDiv = divCity.querySelector(".survivors .row");
      VehicleListTravel(availableVehiclesDiv, this.city.all_vehicles, "choose",connection.id);


      document.querySelector('body').append(modalWrap);
      const divModal = new Modal(modalWrap.querySelector('.modal'));
      divModal.show();


    })

    return elementConnection;
  }

  mostrarItem(Item) {
    // console.log(Item);
    this.container.append(this.render(Item[0]));
  }
}

class ConnectionsListView extends View {
  constructor() {
    super();
  }
}
