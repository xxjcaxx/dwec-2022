import { View } from "./views.js";
import { BuildingView } from "./buildings_views.js";

import { SurvivorView } from "./survivors_view.js";
import { Controller } from "../controllers/controller.js";
import { Model } from "../models/model.js";
import { BuildingList, SurvivorList, VehicleList} from '../components/game_components.js';
import { CityDetails } from "../pages/city_details.js";

export { CitiesListView, CityView };

class CityView extends View {
  constructor(container, type) {
    super(container);
    this.type = type;
  }

  render(city) {
    let divCity = document.createElement("div");
    divCity.id = `city-${city.id}`;
    divCity.classList.add("col");
    // prettier-ignore
    divCity.innerHTML = ` 
    <div class="card text-dark" style="width: 10rem">
    <div class="card-body">
      <h5 class="card-title">${city.name}</h5>
    </div>
    <ul class="list-group list-group-flush" >
    <li class="list-group-item list-group-item-dark">Energy: ${parseFloat(city.energy).toFixed(2)}</li>
    <li class="list-group-item list-group-item-dark">Oil: ${parseFloat(city.oil).toFixed(2)}</li>
    <li class="list-group-item list-group-item-dark">Food: ${parseFloat(city.food).toFixed(2)}</li>
    <li class="list-group-item list-group-item-dark">Water: ${parseFloat(city.water).toFixed(2)}</li>
    <li class="list-group-item list-group-item-dark">Despair: ${parseFloat(city.despair).toFixed(2)}</li>
    <li class="list-group-item list-group-item-dark">Radiation: ${parseFloat(city.radiation).toFixed(2)}</li>

    </ul>
    <a href="#" class="btn btn-primary">Details</a>
  </div>
 
    `;
    return divCity;
  }

  renderResume(city) {
    let divCity = document.createElement("div");
    divCity.id = `city-${city.id}`;
    divCity.classList.add("window", "container");
    // prettier-ignore
    divCity.innerHTML = ` 
    
    <div class="row name"><h3 class="cityName">${city.name}</h3></div>
    <div class="row">
    <div class="buildings col g-0"><h4>Buildings</h4><div class="row g-0"></div></div>
    <div class="survivors col g-0"><h4>Survivors</h4><div class="row g-0"></div></div>
    <div class="vehicles col g-0"><h4>Vehicles</h4><div class="row g-0"></div></div>
</div>`;

    let buildingsDiv = divCity.querySelector(".buildings .row");
    BuildingList(buildingsDiv,city.buildings);
 
    let survivorsDiv = divCity.querySelector(".survivors .row");
    SurvivorList(survivorsDiv,city.survivors);

    let vehiclesDiv = divCity.querySelector(".vehicles .row");
    VehicleList(vehiclesDiv,city.all_vehicles);

    divCity.querySelector('.cityName').addEventListener('click',()=>{
      window.location.hash = '#/city/'+city.id;
    })


    return divCity;
  }

  mostrarItem(Items) {
    if (this.type == "list") {
      this.Items = Items;
      this.container.innerHTML = "";
      this.divRow.innerHTML = "";
      this.divRow.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");
      this.container.append(this.divRow);
      for (let key of Items) {
        this.divRow.append(this.render(key));
      }
    } else if (this.type == "resume") {
      this.Items = Items;
      //console.log(Items);
      this.container.innerHTML = "";
      for (let key of Items) {
        this.container.append(this.renderResume(key));
      }
    }
  }


}

class CitiesListView extends View {
  constructor() {
    super();
  }
}
