export { Model };
export { Service };

class Model {
    //static nombre;
    constructor(id,url) {    /// Creem els datos bàsics i li asociem un service per al CRUD del model en el servidor
        this.id = id;  // identificador en cas de ser un element únic
        this.url = url;
        this.service = new Service(url);
        this.service.read().then(()=>{
          
        });
        //console.log(id,url);
    }
    assign(plainObject) {   // El que vinga del servidor cal asignar-ho a la classe actual
        Object.assign(this, plainObject);
    }
    notificarCambios(callback) {  // Funció per a que el controlador associe els canvis amb la vista
        this.service.onCambioItems = callback; // callback serà una funció de la vista
      //  console.log(callback);
    }

}


class Service {
    constructor(url) {
        this.url = url;
        this.Items = [];
        this.onCambioItems = ()=>{};   // fiquem una funció buida per omplir per el controlador.
        // onCambioItems serà el callback quan canvien els Items. Això implementa el patró observador 
    }

    async read() {
       return await fetch(this.url)
            .then(response => response.json())
            .then(datosItems => {  // cal procurar que sempre done un array d'objectes
                this.Items = datosItems;
                this.onCambioItems(this.Items); // cridem al callback de la vista associat per el cotrolador amb notificarcambios
            });
    }

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
}