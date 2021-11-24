import { View } from "./views.js";
import { VehicleList } from "../components/game_components.js";

export { SurvivorsListView, SurvivorView };

class SurvivorView extends View {
  constructor(container, type) {
    super(container);
    this.type = type;
  }

  render(survivor) {
    let divSurvivor = document.createElement("div");
    divSurvivor.id = `survivor-${survivor.id}`;
    divSurvivor.classList.add("m-1", "item");
    // prettier-ignore
    let content =  ` 
    <img class="" src="data:image/jpeg;base64,${ survivor.avatar}" />
    `;
    if (this.type == "mini") {
      divSurvivor.classList.add("col-5");
      content += `<div class="itemName">${survivor.name}</div>`;
    }
    if (this.type == "details") {
      divSurvivor.classList.add("col-1", "details");
      content += `<div class="itemName">
      <span class="nameDetails">${survivor.name}</span>
      <span class="">Desperation: ${survivor.desperation}</span>
      <span class="">Mutations: ${survivor.mutations}</span>
      <span class="">Illnes: ${survivor.illnes}</span>
      <span class="">Player: ${survivor.player[1]}</span>
      <span class="">Junk: ${survivor.junk}</span>
 
      </div>
      `;
    }
    divSurvivor.innerHTML = content;
    divSurvivor.querySelector(".itemName").addEventListener("click", () => {
      window.location.hash = "#/survivor/" + survivor.id;
    });
    return divSurvivor;
  }

  mostrarItem(Item) {
    if (this.type == "mini" || this.type == "details") {
      this.container.append(this.render(Item[0]));
    } else if (this.type == "page") {
      this.container.innerHTML = "";
      this.container.append(this.renderPage(Item[0]));
    }
  }

  renderPage(survivor) {
    let divsurvivor = document.createElement("div");
    divsurvivor.id = `survivor-${survivor.id}`;
    divsurvivor.classList.add("window", "container");
    // prettier-ignore
    divsurvivor.innerHTML = ` 
    
    <div class="row name"><h3 class="survivorName">${survivor.name}</h3></div>
    <div class="row">
    <div class="col">    <img class="itemPageImg" src="data:image/jpeg;base64,${ survivor.avatar}" />
    </div>
    <div class="col itemPageData">
    <h4>Data</h4>
    <span class="">Desperation: ${survivor.desperation}</span>
    <span class="">Mutations: ${survivor.mutations}</span>
    <span class="">Illnes: ${survivor.illnes}</span>
    <span class="">Player: ${survivor.player[1]}</span>
    <span class="">Player: ${survivor.city[1]}</span>
    <span class="">Junk: ${survivor.junk}</span>
    </div>
    <div class="vehicles col-6 g-0"><h4>Vehicles</h4><div class="row g-0"></div></div>
    </div>`;
    let vehiclesDiv = divsurvivor.querySelector(".vehicles .row");
    VehicleList(vehiclesDiv, survivor.vehicles, "details");

    return divsurvivor;
  }
}

class SurvivorsListView extends View {
  constructor() {
    super();
  }
}
