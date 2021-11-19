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
    divbuilding.classList.add("col");
    // prettier-ignore
    divbuilding.innerHTML = ` 
    <div class="card text-dark" style="width: 10rem">
    <div class="card-body">
      <h5 class="card-title">${building.name}</h5>
    </div>
    <ul class="list-group list-group-flush" >
    
    </ul>
    <a href="#" class="btn btn-primary">Details</a>
  </div>
 
    `;
    return divbuilding;
  }

  
  mostrarItems(Items) {
      console.log(Items);
      this.Items = Items;
      this.container.innerHTML = "";
      for (let key of Items) {
        this.container.append(this.render(key));
      }
  }


}

