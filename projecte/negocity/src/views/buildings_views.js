import { View } from "./views.js";

export { BuildingView };

class BuildingView extends View {
  constructor(container, type) {
    super(container);
    this.type = type;
  }

  render(building) {
    let divbuilding = document.createElement("div");
    divbuilding.id = `building-${building.id}`;
    divbuilding.classList.add("m-1", "item");
    // prettier-ignore
    let content =  ` 
    <img class="" src="data:image/jpeg;base64,${ building.image}" />
    `;
    if (this.type == "mini") {
      // divbuilding.classList.add("col-5");
      content += `<div class="itemName">${building.name}</div>`;
    }
    if (this.type == "details") {
      //  divbuilding.classList.add("col-1");
      divbuilding.classList.add("details");
      content += `<div class="itemName">
      <span class="nameDetails">${building.name}</span>
      <span class="">Level: ${building.level}</span>
      <span class="">Ruined: ${building.ruined}</span>
      <span class="">Energy: ${building.energy}</span>
      <span class="">Oil: ${building.oil}</span>
      <span class="">Food: ${building.food}</span>
      <span class="">Water: ${building.water}</span>
      <span class="">Despair: ${building.despair}</span>
      <span class="">Junk: ${building.junk}</span> 
      </div>
      `;
    }

    divbuilding.innerHTML = content;

    divbuilding.querySelector(".itemName").addEventListener("click", () => {
      window.location.hash = "#/building/" + building.id;
    });

    return divbuilding;
  }

  renderPage(building) {
    let divBuilding = document.createElement("div");
    divBuilding.id = `building-${building.id}`;
    divBuilding.classList.add("window", "container");
    // prettier-ignore
    divBuilding.innerHTML = ` 
    
    <div class="row name"><h3 class="buildingName">${building.name}</h3></div>
    <div class="row">
    <div class="col">    <img class="itemPageImg" src="data:image/jpeg;base64,${ building.image}" />
    </div>
    <div class="col itemPageData">
      <span class="">Level: ${building.level}</span>
      <span class="">Ruined: ${building.ruined}</span>
      <span class="">Energy: ${building.energy}</span>
      <span class="">Oil: ${building.oil}</span>
      <span class="">Food: ${building.food}</span>
      <span class="">Water: ${building.water}</span>
      <span class="">Despair: ${building.despair}</span>
      <span class="">Junk: ${building.junk}</span> 
      <span class="">City: ${building.city[1]}</span> 
    </div>
    </div>`;

    return divBuilding;
  }

  mostrarItems(Items) {
    // console.log(Items);
    this.Items = Items;
    this.container.innerHTML = "";
    for (let key of Items) {
      this.container.append(this.render(key));
    }
  }

  mostrarItem(Item) {
    if (this.type == "mini" || this.type == "details") {
      this.container.append(this.render(Item[0]));
    } else if (this.type == "page") {
      this.container.innerHTML = "";
      this.container.append(this.renderPage(Item[0]));
    }
  }
}
