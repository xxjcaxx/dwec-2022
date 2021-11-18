export { Home };
import { CityController } from "../controllers/cities_controller.js";
import { City,CityList } from "../models/cities_model.js";
import { CityView } from "../views/cities_views.js";

class Home {
  constructor() {}
  renderHome() {

    // En el home anem a veure una visió general de totes les ciutats
    app.container.innerHTML = ``;
    let cityController = new CityController(
      new CityList(),
      new CityView(container,'resume')
    );
  }
}

