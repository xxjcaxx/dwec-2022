 
 import { Controller } from "/controllers/controller.js";
 export { ProductController }
 
 //// Els controladors 

    class ProductController extends Controller {
        constructor(service,view){ 
            super(service,view);
            this.service.notificarCambios(this.onCambioItems);

        }
        onCambioItems = Items => {  // es te que fer el fletxa per a que agafe el this de la classe
            this.view.mostrarItems(Items);
        }
    }






    class ProductListController extends Controller {
        constructor(service,view){ super(service,view);}
    }
