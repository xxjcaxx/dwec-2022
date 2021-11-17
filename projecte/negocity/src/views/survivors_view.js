import { View } from "./views.js"

export { SurvivorsListView, SurvivorView };

class SurvivorView extends View {
  constructor(container) { super(container); }

  render(survivor) {
    // console.log(survivor);
    let divSurvivor = document.createElement("div");
    divSurvivor.id = `survivor-${survivor.id}`;
    divSurvivor.classList.add("col");
    divSurvivor.innerHTML = ` 
    <div class="card text-dark" style="width: 10rem">
    <img src="data:image/jpeg;base64,${
        survivor.avatar
    }" class="card-img-top" alt="${survivor.name}" />
    <div class="card-body">
      <h5 class="card-title">${survivor.name}</h5>
    </div>
    <ul class="list-group list-group-flush" >
    <li class="list-group-item list-group-item-dark">Illnes: ${survivor.illnes}</li>
    <li class="list-group-item list-group-item-dark">Desperation: ${
        survivor.desperation
    }</li>
    <li class="list-group-item list-group-item-dark">Mutations: ${
        survivor.mutations
    }</li>
    <li class="list-group-item list-group-item-dark">City: ${
        survivor.city[1] || "Traveling"
    }</li>
    </ul>
    <a href="#" class="btn btn-primary">Details</a>
  </div>
 
    `;
    divSurvivor.querySelector('.btn').addEventListener('click',()=>{
        survivor.renderdetails();
    });
    return divSurvivor;
  }




  bindAddSurvivor(handler){
   
  }


  bindRemoveSurvivor(handler){
    this.removeItem = handler;
  }

  bindEditSurvivor(handler){
    this.updateItem = handler;  // associem l'edició del survivor a la funció que diga el controlador
    // aquesta rebrà el producte a modificar
  }

  updateItemEnviar(Item,divItem){

}


}




class SurvivorsListView extends View {
  constructor() { super(); }
}