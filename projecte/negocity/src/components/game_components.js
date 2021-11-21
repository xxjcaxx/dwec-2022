import {Controller} from '../controllers/controller.js';
import {Model} from '../models/model.js';
import {BuildingView} from '../views/buildings_views.js';
import { SurvivorView } from '../views/survivors_view.js';
import { VehicleView } from '../views/vehicles_views.js';

export {BuildingList,SurvivorList,VehicleList};

function BuildingList(container,ids){
    ids.forEach((b) => {
        let buildingController = new Controller(
          new Model(b,app.url+'/negocity/api/building/?id='+b),
          new BuildingView(container,'mini')
        );
      });
  
}

function SurvivorList(container,ids){
  ids.forEach((b) => {
    let survivorController = new Controller(
      new Model(b,app.url+'/negocity/api/survivor/?id='+b),
      new SurvivorView(container,'mini')
    );
  });
}

function VehicleList(container,ids){
  ids.forEach((b) => {
    let vehicleController = new Controller(
      new Model(b,app.url+'/negocity/api/vehicle/?id='+b),
      new VehicleView(container,'mini')
    );
  });
}

