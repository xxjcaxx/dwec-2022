import { map, Observable, skip, Subject } from "rxjs";
import { Model } from "./model";

export { VehicleModel };

class VehicleModel extends Model {
  constructor(id, url) {
    super(id, url);
   // console.log('vehicle');
  }
  ///////// En observables

  travelQuery(road) {
    const travelQueryModel = new Model(
      this.id,
      `${app.url}/negocity/api/travel-query/?vehicle=${this.id}&road=${road}`
    );
    travelQueryModel.dataSubject.subscribe((detalles) => {
     // console.log('DETALLES',detalles);
      detalles.vehicle = this;
     // console.log(this);
      this.dataSubject.next({...this.dataSubject.getValue(),detallesTravel: detalles});
      });

    travelQueryModel.read();
  }

   read() {

     return  super.read();
   }
  
}
