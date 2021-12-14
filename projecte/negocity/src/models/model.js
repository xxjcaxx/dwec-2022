import { BehaviorSubject, map, Observable, skip, Subject } from "rxjs";

export { Model };

class Model {
  constructor(id, url) {
    this.id = id; // identificador en cas de ser un element únic
    this.url = url;
    this.dataSubject = new BehaviorSubject({random: Math.random()});  //Evitarem el primer perquè està buit
  }

  ///////// En observables
  read() {
    const readObservable = new Observable(async (observer) => {
      try {
        const response = await fetch(this.url);
        const data = await response.json();
        if (Array.isArray(data)) {
          Object.assign(this, data[0]);
          this.dataSubject.next({...this.dataSubject.getValue(),...data[0]} )
        }
        else {
          Object.assign(this, data);
        this.dataSubject.next({...this.dataSubject.getValue(),...data} )
        }
        
        // console.log(this);
        observer.next(data);
        observer.complete();
      } catch (err) {
        observer.error(err);
      }
    });

    readObservable.subscribe();

    return readObservable;
  }
 
}
