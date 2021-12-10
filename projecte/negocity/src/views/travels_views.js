import { View } from "./views.js";

export { TravelsListView, TravelView };

class TravelView extends View {
  constructor(container, type) {
    super(container);
    this.type = type;
  }

  render(travel) {
    let elementTravel = document.createElement("tr");
    elementTravel.classList.add("travel");
    console.log(travel);
    elementTravel.innerHTML = `<td>${this.type == 'coming' ? travel.origin[1] : travel.destiny[1]}</td>
<td>${travel.date_end}</td>
<td>
<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: ${travel.progress}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${travel.progress}%</div>
</div>

</td>
<td>${travel.player[1]}</td>
<td>${travel.vehicle[1]}</td>
`;
    return elementTravel;
  }

  mostrarItem(Item) {
    // console.log(Item);
    this.container.append(this.render(Item[0]));
  }
}

class TravelsListView extends View {
  constructor() {
    super();
  }
}
