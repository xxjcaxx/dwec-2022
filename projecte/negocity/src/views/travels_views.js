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
    elementTravel.innerHTML = `<td>${travel.origin[1]}</td>
<td>${travel.date_end}</td>
<td>${travel.progress}</td>
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
