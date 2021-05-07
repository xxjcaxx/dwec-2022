export { Model }

    class Model {
        static nombre;
        constructor(id) {
            this.id = id;
        }
        assign(plainObject) {   // El que vinga del servidor cal asignar-ho a la classe actual
            Object.assign(this, plainObject);
        }
        load() {  //Carregar del servidor
            fetch(`${app.url}${this.constructor.nombre}/${this.id}.json`)
                .then(response => response.json())
                .then(data => {
                 //   console.log(data);
                    this.assign(data);
                });
        }
        loadDetails() {    // En cas de tindre que fer consultes posteriors per carregar detalls

        }

        static create(data) {  // Es fa estàtica per a poder ser invocada desde la classe

        }
        

        delete() {

        }
        update() {

        }
    }


