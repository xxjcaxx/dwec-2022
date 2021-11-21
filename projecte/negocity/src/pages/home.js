export { Home };
import { CityView } from "../views/cities_views.js";
import {Controller } from "../controllers/controller.js"
import { Model } from "../models/model.js";

class Home {
  constructor() {}
  renderHome() {

    // En el home anem a veure una visió general de totes les ciutats
    app.container.innerHTML = ``;
    let cityController = new Controller(
      new Model(0,app.url+'/negocity/api/cities/'+ localStorage.getItem("id")),
      new CityView(app.container,'resume')
    );
  }
}

