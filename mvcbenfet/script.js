import { Model } from "./models/model.js";
import { View } from "./views/view.js";
import { Controller } from "./controllers/controller.js";
import { Product, ProductList} from "./models/model_product.js";
import { ProductView, ProductListView } from "./views/product_view.js";
import { Page } from "./pages/page.js";
import { PageHome } from "./pages/home.js";
import { PageProductos } from "./pages/productos.js";
//import { Service } from "./services/service.js";

(() => {
    "use strict";

    
    window.app = {};  // Creem aquest objecte global per anar instribint coses que volem que siguen accesibles per tots
    app.url = 'https://dwec-daw-default-rtdb.firebaseio.com/';
    /////////// La part de les classes genèriques de model vista controlador ////////////////


    function cargarListas() {
        fetch('https://dwec-daw-default-rtdb.firebaseio.com/listas.json')
        .then(response => response.json())
        .then(datos => {
            let container = document.querySelector('#container')
            for (let lista in datos){
                let divLista = document.createElement('div');
                divLista.innerHTML = `<h2>${lista}</h2>`
                let datosLista = datos[lista].productos;
                for(let producto of datosLista){
                    let divProducto = document.createElement('div');
                    divProducto.innerHTML = `<h3>${producto}</h3>
                    <p>Marca</p>
                        <p>Referencia</p>
                        <p>Precio</p>
                    `;
                    divLista.append(divProducto);
                    fetch(`https://dwec-daw-default-rtdb.firebaseio.com/productos/${producto}.json`)
                    .then(response => response.json())
                    .then(datosProducto => {
                        divProducto.innerHTML = `<h3>${producto}</h3>
                        <img src="data:image/png;base64, ${datosProducto.foto}"/>
                        <p>${datosProducto.marca}</p>
                        <p>${datosProducto.referencia}</p>
                        <p>${datosProducto.precio}</p>
                        `;
                        
                    });

                    
                }
                container.append(divLista);
            }
        })
    }

    function cargarHome(){
        app.home.populate(app.container);
    }
    function cargarProductos(){
        app.productos.populate(app.container);
    }

    //// Les pàgines

    app.home = new PageHome('home');
    app.productos = new PageProductos('Productos')

    ///////////// MAIN
    document.addEventListener("DOMContentLoaded", function () {
        app.container = document.querySelector('#container');
        cargarHome();

        //cargarListas();
        document.querySelector('#menuHome').addEventListener('click', cargarHome);
        document.querySelector('#menuListas').addEventListener('click', cargarListas);
        document.querySelector('#menuProductos').addEventListener('click', cargarProductos);



    });
})();
