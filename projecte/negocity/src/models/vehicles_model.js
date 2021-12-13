import { map, Observable, Subject } from "rxjs";
import { Model } from "./model";

export { VehicleModel };

class VehicleModel extends Model {
  constructor(id, url) {
    super(id, url);
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
        vehicheView.anyadirDetalles(detalles);
      },
      error: (error) => {
        vehicheView.mostrarError(error);
      },
    });
  }

  /* read() {
    return new Observable(async (observer) => {
      try {
        const response = await fetch(this.url);
        const data = await response.json();
        observer.next(data);
        observer.complete();
      } catch (err) {
        observer.error(err);
      }
    });
  }*/
  /* assign(plainObject) {
    // El que vinga del servidor cal asignar-ho a la classe actual
    Object.assign(this, plainObject);
  }*/
}
