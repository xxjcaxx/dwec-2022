import { Service } from "./service.js"
export { ProductService }

class ProductService extends Service {
	constructor() {
		super(`https://dwec-daw-default-rtdb.firebaseio.com/productos.json`);
	
	}
}


class ListaService extends Service {
	constructor() {
		super(`https://dwec-daw-default-rtdb.firebaseio.com/listas.json`);
	
	}
}