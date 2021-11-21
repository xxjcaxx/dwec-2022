import { View } from "./views.js";

export { BuildingView};

class BuildingView extends View {
  constructor(container, type) {
    super(container);
    this.type = type;
  }

  render(building) {
    let divbuilding = document.createElement("div");
    divbuilding.id = `building-${building.id}`;
    divbuilding.classList.add("col-5","m-1","item");
    // prettier-ignore
    divbuilding.innerHTML = ` 
    <img class="" src="data:image/jpeg;base64,${
      building.image
    }" />
    <div class="itemName">${building.name}</div>
    `;
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

  mostrarItem(Item){
  //  console.log(Item);
    this.container.append(this.render(Item[0]));
  }


}

