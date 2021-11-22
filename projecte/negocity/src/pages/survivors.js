
import { SurvivorView } from "../views/survivors_view.js";
import { Controller } from "../controllers/controller.js";
import { Model } from "../models/model.js";

export { SurvivorsPage };

class SurvivorsPage {
  constructor(name) {
    this.name = name;
  }

  render(container) {
   // console.log("Render survivors");
    container.innerHTML = `<h1>Survivors</h1>`;
    let survivorController = new Controller(
      new Model(0,app.url+'/negocity/api/survivors/'+ localStorage.getItem("id")),
      new SurvivorView(container)
    );
  }
}
