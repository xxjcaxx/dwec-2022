import { Controller } from "../controllers/controller.js";
import { Model } from "../models/model.js";
import { BuildingView } from "../views/buildings_views.js";
import { SurvivorView } from "../views/survivors_view.js";
import { VehicleView } from "../views/vehicles_views.js";
import { ConnectionView } from "../views/roads_views.js";
import { TravelView } from "../views/travels_views.js";
import { VehicleModel } from "../models/vehicles_model.js";
import { filter, skip } from "rxjs";

export {
  BuildingList,
  SurvivorList,
  VehicleList,
  ConnectionsList,
  TravelsList,
  VehicleListTravel,
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

function VehicleListTravel(container, ids, mode, road) {
  ids.forEach((vehicleId) => {   // Aquest component conté una llista de vehicles
    let vehicheView = new VehicleView(container, mode);
    vehicheView.mostrarItem();
    // En aquest cas, el component fa de controller per demanar més coses
    let vehicleModel = new VehicleModel(
      vehicleId,
      app.url + "/negocity/api/vehicle/?id=" + vehicleId
    );
    
    vehicleModel.dataSubject.subscribe((item) => {
    //  console.log(item);
      vehicheView.rellenarItem(item);
    });

    vehicleModel.read();

    vehicleModel.travelQuery(road);


 /*   vehicleModel.read().subscribe({
      next: (item) => {
        vehicheView.mostrarItem(item);
        vehicleModel.travelQuery(road);
        vehicleModel.dataSubject.pipe(filter((v) => 'detallesTravel' in v)).subscribe((vehicleData) => {
          vehicheView.anyadirDetalles(vehicleData.detallesTravel);
        });
      },
      error: (error) => {
        vehicheView.mostrarError(error);
      },
    });*/
  });
}

function ConnectionsList(container, ids, mode, city) {
  ids.forEach((c) => {
    let connectionController = new Controller(
      new Model(c, app.url + "/negocity/api/road/?id=" + c),
      new ConnectionView(container, mode, city)
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
