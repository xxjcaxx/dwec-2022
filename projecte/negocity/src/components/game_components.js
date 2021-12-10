import { Controller } from "../controllers/controller.js";
import { Model } from "../models/model.js";
import { BuildingView } from "../views/buildings_views.js";
import { SurvivorView } from "../views/survivors_view.js";
import { VehicleView } from "../views/vehicles_views.js";
import { ConnectionView } from "../views/roads_views.js";
import { TravelView } from "../views/travels_views.js";

export {
  BuildingList,
  SurvivorList,
  VehicleList,
  ConnectionsList,
  TravelsList,
};

function BuildingList(container, ids, mode) {
  ids.forEach((b) => {
    let buildingController = new Controller(
      new Model(b, app.url + "/negocity/api/building/?id=" + b),
      new BuildingView(container, mode)
    );
  });
}

function SurvivorList(container, ids, mode) {
  ids.forEach((b) => {
    let survivorController = new Controller(
      new Model(b, app.url + "/negocity/api/survivor/?id=" + b),
      new SurvivorView(container, mode)
    );
  });
}

function VehicleList(container, ids, mode) {
  ids.forEach((b) => {
    let vehicleController = new Controller(
      new Model(b, app.url + "/negocity/api/vehicle/?id=" + b),
      new VehicleView(container, mode)
    );
  });
}

function ConnectionsList(container, ids, mode) {
  ids.forEach((c) => {
    let connectionController = new Controller(
      new Model(c, app.url + "/negocity/api/road/?id=" + c),
      new ConnectionView(container, mode)
    );
  });
}

function TravelsList(container, ids, mode) {
  ids.forEach((c) => {
    let travelController = new Controller(
      new Model(c, app.url + "/negocity/api/travel/?id=" + c),
      new TravelView(container, mode)
    );
  });
}
