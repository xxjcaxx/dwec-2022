import { View } from "./views.js";

export { ConnectionsListView, ConnectionView };

class ConnectionView extends View {
  constructor(container, type) {
    super(container);
    this.type = type;
  }

  render(connection) {
    let elementConnection = document.createElement("tr");
    elementConnection.classList.add("connection");
    console.log(connection);
    elementConnection.innerHTML = `
             <td>${connection.city_1[1]}</td>
             <td>${connection.city_2[1]}</td>
             <td>${Math.round(connection.distance * 100) / 100} Km</td>
    `;
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
