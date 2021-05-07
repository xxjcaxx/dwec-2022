import { Page } from "./page.js"
import { ListaController } from "/controllers/product_controller.js"
import { ListaView } from "../views/product_view.js";
import { ListaService } from "../services/product_service.js";
export { PageListas };

class PageListas extends Page {

    constructor(name){
        super(name);
    }

    populate(container){
        container.innerHTML = `<h1>Listas</h1>`
        let listaController = new ListaController(new ListaService(), new ListaView(container))
    }
}