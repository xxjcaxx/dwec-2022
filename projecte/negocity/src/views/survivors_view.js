import { View } from "./views.js"

export { SurvivorsListView, SurvivorView };

class SurvivorView extends View {
  constructor(container,type) { super(container); this.type = type;}

  render(survivor) {
    let divSurvivor = document.createElement("div");
    divSurvivor.id = `survivor-${survivor.id}`;
    divSurvivor.classList.add("m-1","item");
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