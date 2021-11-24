export { BuildingDetails };
import { Controller } from "../controllers/controller.js";
import { Model } from "../models/model.js";
import { BuildingView } from "../views/buildings_views.js";

function BuildingDetails(building) {
  let buildingController = new Controller(
    new Model(0, app.url + "/negocity/api/building/?id=" + building),
    new BuildingView(app.container, "page")
  );
}
