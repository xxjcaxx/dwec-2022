import { map, Observable, Subject } from "rxjs";
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
    travelQueryModel.read().subscribe({
      next: (detalles) => {
        detalles.vehicle = this;
        this.dataSubject.next({...this.dataSubject.getValue(),detallesTravel: detalles})
       // console.log(this);
      },
      error: (error) => {
       
      },
    });
  }

   read() {

     return  super.read();
   }
  
  /* assign(plainObject) {
    // El que vinga del servidor cal asignar-ho a la classe actual
    Object.assign(this, plainObject);
  }*/
}
