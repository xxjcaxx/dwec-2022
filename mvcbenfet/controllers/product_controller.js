 
 import { Controller } from "/controllers/controller.js";
 export { ProductController }
 
 //// Els controladors 
/*
El controlador té una serie de funcios handle que diuen cóm reaccionar a un esdeveniment de la vista.
Generalment será demanar alguna cosa al servici.

En el contructor, relacionem els esdeveniments de la vista o del servici al servici o la vista respectivament

Per exemple: Quan el servici ja ha carregat les dades, sap quina funció callback ha d'executar perquè el controlador en el
seu constructor li ha dit quina és. 
Per una altra banda, quan la vista vol crear un producte, sap qué funció del controlador executar perquè ho hem associat. Aquesta 
funció crida a una altra del servici. 

D'aquesta manera, la vista i els servici no es relacionen dirèctament i pot ser més fàcil de programar per separat.

*/ 
    class ProductController extends Controller {
        constructor(service,view){ 
            super(service,view);
            this.service.notificarCambios(this.onCambioItems); // Associar la funció de la vista amb el service
            this.view.bindAddProduct(this.handleAddProduct); // Quan en la vista li donem a crear
            this.view.bindRemoveProduct(this.handleremoveProduct);
            this.view.bindEditProduct(this.handleUpdateProduct);
        }
        onCambioItems = Items => {  // es te que fer el fletxa per a que agafe el this de la classe
            this.view.mostrarItems(Items);
        }
        handleAddProduct = (product) =>{
            this.service.add(product);
        }
        handleremoveProduct = (product) => {
            this.service.remove(product.id);
        }
        handleUpdateProduct = (product) =>{
            this.service.update(product);
        }
    }






    class ProductListController extends Controller {
        constructor(service,view){ super(service,view);}
    }
