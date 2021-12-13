import { map, Observable, Subject } from "rxjs";

export { Model };

class Model {
  constructor(id, url) {
    this.id = id; // identificador en cas de ser un element únic
    this.url = url;
  }

  ///////// En observables
  read() {
    return new Observable(async (observer) => {
      try {
        const response = await fetch(this.url);
        const data = await response.json();
        Object.assign(this, data[0]);
        // console.log(this);
        observer.next(data);
        observer.complete();
      } catch (err) {
        observer.error(err);
      }
    });
  }
  /* assign(plainObject) {
    // El que vinga del servidor cal asignar-ho a la classe actual
    Object.assign(this, plainObject);
  }*/
}
