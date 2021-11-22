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
      divbuilding.classList.add("col-5");
      content += `<div class="itemName">${building.name}</div>`;
    }
    if (this.type == "details") {
      divbuilding.classList.add("col-1", "details");
      content += `<div class="itemName">${building.name}</div>
      <div class="">Level: ${building.level}</div>
      <div class="">Ruined: ${building.ruined}</div>
      <div class="">Energy: ${building.energy}</div>
      <div class="">Oil: ${building.oil}</div>
      <div class="">Food: ${building.food}</div>
      <div class="">Water: ${building.water}</div>
      <div class="">Despair: ${building.despair}</div>
      <div class="">Junk: ${building.junk}</div>
      `;
    }

    divbuilding.innerHTML = content;
    return divbuilding;
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
    //  console.log(Item);
    this.container.append(this.render(Item[0]));
  }
}
