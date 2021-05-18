import { Model } from "./model.js";
export { Product, ProductList }

    class Product extends Model {
        constructor(id) {  // En realitat no necessitem indicar tots els camps perquè els assignarem amb assign
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
//  https://github.com/Caballerog/VanillaJS-MVC-Users/blob/master/models/user.model.js
