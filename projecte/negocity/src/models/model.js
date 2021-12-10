import { map, Observable } from "rxjs";

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

/*class Service {
  constructor(url) {
    this.url = url;
    this.Items = [];
    this.onCambioItems = () => {}; // fiquem una funció buida per omplir per el controlador.
    // onCambioItems serà el callback quan canvien els Items. Això implementa el patró observador
    this.onError = (error) => {
      console.log(error);
    };
  }*/

 /*  En promeses 
 async read() {
    return await fetch(this.url)
      .then((response) => response.json())
      .then((datosItems) => {
        // cal procurar que sempre done un array d'objectes
        this.Items = datosItems;
        this.onCambioItems(this.Items); // cridem al callback de la vista associat per el cotrolador amb notificarcambios
      })
      .catch((error) => {
        this.onError(error);
      });
  }*/


  /*
    add(Item) {
        console.log('add', Item);
        fetch(this.url + '.json', { method: 'post', headers: { "Content-type": "application/json; charset=UTF-8" }, body: JSON.stringify(Item) })
            .then(response => response.json())
            .then(datos => {
                this.read();
            });
    }*/

  /*
    update(Item) {
        // Com que volem actualizar, els Items tenen id, que no és necessari en firebase, ja que és la clau
        // primer li llevem el id:
        console.log('update', key);
        fetch(`${this.url}/${key}.json`,
            { method: 'put', headers: { "Content-type": "application/json; charset=UTF-8" }, body: JSON.stringify(Item) })
            .then(response => response.json())
            .then(datos => {
                this.read();
            });


    }
    remove(id) {
        console.log('remove', id);
        fetch(`${this.url}/${id}.json`, { method: 'delete', headers: { "Content-type": "application/json; charset=UTF-8" }, body: {} })
            .then(response => response.json())
            .then(datos => {
                this.read();
            });
    }*/
//}
