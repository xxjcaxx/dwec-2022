export { Model };
export { Service };

class Model {
    static nombre;
    constructor(id,url) {
        console.log();
        this.id = id;
        this.url = url;
        this.service = new Service(url);
    }
    assign(plainObject) {   // El que vinga del servidor cal asignar-ho a la classe actual
        Object.assign(this, plainObject);
    }
}


class Service {
    constructor(url) {
        this.url = url;
        this.Items = [];
        this.onCambioItems = ()=>{};  // En el constructor, a falta de
      
    }

    async read() {
       return await fetch(this.url)
            .then(response => response.json())
            .then(datosItems => {
                this.Items = Object.entries(datosItems).map(entrie => entrie[1]);
                this.onCambioItems(this.Items); // cridem al callback de la vista associat per el cotrolador amb notificarcambios
            });
    }

    add(Item) {
        console.log('add', Item);
        fetch(this.url + '.json', { method: 'post', headers: { "Content-type": "application/json; charset=UTF-8" }, body: JSON.stringify(Item) })
            .then(response => response.json())
            .then(datos => {
                this.read();
            });
    }
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
    }

    notificarCambios(callback) {  // Funció per a que el controlador associe els canvis amb la vista
        this.onCambioItems = callback; // callback serà una funció de la vista
    }

}