(() => {
    "use strict";

    
    window.app = {};  // Creem aquest objecte global per anar instribint coses que volem que siguen accesibles per tots
    app.url = 'https://dwec-daw-default-rtdb.firebaseio.com/';
    /////////// La part de les classes genèriques de model vista controlador ////////////////


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
                    console.log(data);
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

    class View {
        constructor() {

        }
    }

    class Controller {
        constructor(model,view) {

        }
    }


    class Page {    ///////// Cada una de les pàgines de la web
        constructor(name, clase){ this.name = name; this.clase = clase; }
        populate(container){
            fetch(`${app.url}${this.clase.nombre}.json?shallow=true`)   // shllow true és per descarregar sols els id
                .then(response => response.json())
                .then(data => {
                    console.log('Page home',data);
                    for (let key in data){
                        let item = new this.clase(key)
                        item.load();
                        
                       // console.log('Item:',item.constructor.nombre,item);
                    }
                });
        }
    }


    ///////////// Els models que anem a utilitzar
    class Product extends Model {
        constructor(id) {
            super(id);
        }
        static nombre = 'productos'
    }

    class ProductList extends Model {
        constructor(id) {
            super( id);
        }
        static nombre = 'listas'
    }

    ///////// Les vistes que anem a utilitzar

    class ProductView extends View {
        constructor(){ super();}
    }
    class ProductListView extends View {
        constructor(){ super();}
    }

    //// Els controladors 

    class ProductController extends Controller {
        constructor(model,view){ super(model,view);}
    }
    class ProductListController extends Controller {
        constructor(model,view){ super(model,view);}
    }

    //// Les pàgines

    app.home = new Page('home',Product);

    ///////////// MAIN
    document.addEventListener("DOMContentLoaded", function () {
        app.container = document.querySelector('#container');
        app.home.populate(app.container);
    });
})();