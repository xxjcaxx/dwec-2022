import { View } from "./views.js";

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
    
    <div class="row"><h3>${city.name}</h3></div>
    <div class="row">
    <div class="buildings col"><h4>Buildings</h4></div>
    <div class="survivors col"><h4>Survivors</h4>${city.survivors_player}</div>
    <div class="vehicles col"><h4>Vehicles</h4>${city.vehicles_player}</div>
</div>`;

    let buildingsDiv = divCity.querySelector(".buildings");
    city.buildings.forEach((b) => {
      let bDiv = document.createElement("div");
      bDiv.classList.add("resumeImg");
      bDiv.innerHTML = b;
      buildingsDiv.append(bDiv);
    });

    return divCity;
  }

  mostrarItems(Items) {
    if (this.type == "list") {
      this.Items = Items;
      this.container.innerHTML = "<h2>Cities</h2>";
      this.divRow.innerHTML = "";
      this.divRow.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");
      this.container.append(this.divRow);
      for (let key of Items) {
        this.divRow.append(this.render(key));
      }
    } else if (this.type == "resume") {
      this.Items = Items;
      this.container.innerHTML = "<h2>Cities</h2>";
      for (let key of Items) {
        this.container.append(this.renderResume(key));
      }
    }
  }

  bindAddcity(handler) {}

  bindRemovecity(handler) {
    this.removeItem = handler;
  }

  bindEditcity(handler) {
    this.updateItem = handler; // associem l'edició del city a la funció que diga el controlador
    // aquesta rebrà el producte a modificar
  }

  updateItemEnviar(Item, divItem) {}
}

class CitiesListView extends View {
  constructor() {
    super();
  }
}
