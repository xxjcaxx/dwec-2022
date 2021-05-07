export {Service};

class Service {
    constructor(url) {
        this.url = url;
		this.Items = {};
		this.read();
	}

	read(){
		fetch(this.url)
		.then(response => response.json())
		.then(datosItems => {
			this.Items = datosItems;
			this.onCambioItems(this.Items);
		});
	}

	add(Item){

	}
	edit(id, Item){

	}
	delete(id){

	}

	notificarCambios(callback){
		this.onCambioItems = callback;
	} 

}