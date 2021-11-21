import { View } from "./views.js"

export { SurvivorsListView, SurvivorView };

class SurvivorView extends View {
  constructor(container) { super(container); }

  render(survivor) {
    let divSurvivor = document.createElement("div");
    divSurvivor.id = `survivor-${survivor.id}`;
    divSurvivor.classList.add("col-5","m-1","item");
    // prettier-ignore
    divSurvivor.innerHTML = ` 
    <img class="" src="data:image/jpeg;base64,${
      survivor.avatar
    }" />
    <div class="itemName">${survivor.name}</div>
    `;
    return divSurvivor;
  }

  mostrarItem(Item){
    //console.log(Item);
    this.container.append(this.render(Item[0]));
  }

}




class SurvivorsListView extends View {
  constructor() { super(); }
}