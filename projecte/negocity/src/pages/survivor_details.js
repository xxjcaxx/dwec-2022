export { SurvivorDetails };
import { Controller } from "../controllers/controller.js";
import { Model } from "../models/model.js";
import { SurvivorView } from "../views/survivors_view.js";

function SurvivorDetails(survivor) {
  let survivorController = new Controller(
    new Model(0, app.url + "/negocity/api/survivor/?id=" + survivor),
    new SurvivorView(app.container, "page")
  );
}
