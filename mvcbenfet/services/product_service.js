import { Service } from "./service.js"
export { ProductService }

class ProductService extends Service {
	constructor() {
		super(`${app.url}productos`);
	
	}
}


class ListaService extends Service {
	constructor() {
		super(`${app.url}/listas.json`);
	
	}
}