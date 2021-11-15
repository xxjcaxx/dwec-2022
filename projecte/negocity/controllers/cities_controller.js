 
 import { Controller } from "./controller.js";
 export { CityController,cityListController }
 
 //// Els controladors 
/*
El controlador té una serie de funcios handle que diuen cóm reaccionar a un esdeveniment de la vista.
Generalment será demanar alguna cosa al servici.

En el contructor, relacionem els esdeveniments de la vista o del servici al servici o la vista respectivament

Per exemple: Quan el servici ja ha carregat les dades, sap quina funció callback ha d'executar perquè el controlador en el
seu constructor li ha dit quina és. 
Per una altra banda, quan la vista vol crear un citye, sap qué funció del controlador executar perquè ho hem associat. Aquesta 
funció crida a una altra del servici. 

D'aquesta manera, la vista i els servici no es relacionen dirèctament i pot ser més fàcil de programar per separat.

*/ 
    class CityController extends Controller {
        constructor(model,view){ 
            super(model,view);
            this.model.service.notificarCambios(this.onCambioItems); // Associar la funció de la vista amb el service
            this.view.bindAddcity(this.handleAddcity); // Quan en la vista li donem a crear
            this.view.bindRemovecity(this.handleremovecity);
            this.view.bindEditcity(this.handleUpdatecity);
        }
        onCambioItems = Items => {  // es te que fer el fletxa per a que agafe el this de la classe
            this.view.mostrarItems(Items);
            //console.log('oncambioItems del controlador',Items);
        }
       /* handleAddcity = (city) =>{
            this.service.add(city);
        }
        handleremovecity = (city) => {
            this.service.remove(city.id);
        }
        handleUpdatecity = (city) =>{
            this.service.update(city);
        }*/
    }


    class cityListController extends Controller {
        constructor(service,view){ super(service,view);}
    }
