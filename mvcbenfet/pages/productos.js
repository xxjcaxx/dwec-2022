import { Page } from "./page.js"
import { ProductController } from "../controllers/product_controller.js"
import { Product } from "../models/model_product.js";
import { ProductView } from "../views/product_view.js";
import { ProductService } from "../services/product_service.js";
export { PageProductos };

class PageProductos extends Page {

    constructor(name){
        super(name);
    }

    populate(container){
        container.innerHTML = `<h1>Productos</h1>`
        // sols creant el controlador ja invoques a la creació del servici/model i de la vista
        let productController = new ProductController(new ProductService(), new ProductView(container));
    }
}
