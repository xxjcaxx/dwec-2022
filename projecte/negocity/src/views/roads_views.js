import { View } from "./views.js";

export { ConnectionsListView, ConnectionView };

class ConnectionView extends View {
  constructor(container, type, city) {
    super(container);
    this.type = type;
    this.city = city;
  }

  render(connection) {
    let elementConnection = document.createElement("tr");
    elementConnection.classList.add("connection");
   // console.log(connection);
    elementConnection.innerHTML = `
             <td>${this.city.name == connection.city_1[1] ? connection.city_1[1] : connection.city_2[1]}</td>
             <td>${Math.round(connection.distance * 100) / 100} Km</td>
             <td><button type="button" class="go btn btn-dark">Go!</button>
             </td>
    `;


    const goButton = elementConnection.querySelector('button.go');
    goButton.addEventListener('click',()=>{
      //console.log(this.city);
      const modal = document.createElement('div');
      modal.classList.add('modal-dialog', 'modal-dialog-centered');
    })

    return elementConnection;
  }

  mostrarItem(Item) {
    // console.log(Item);
    this.container.append(this.render(Item[0]));
  }
}

class ConnectionsListView extends View {
  constructor() {
    super();
  }
}
