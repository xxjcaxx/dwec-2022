export { Controller }

    class Controller {
        constructor(model,view) {
            this.model = model;
            this.view = view;
            this.model.notificarCambios(this.onCambioItem); // Associar la funció de la vista amb el service
        }
        onCambioItem = Item => {  // es te que fer el fletxa per a que agafe el this de la classe
            this.view.mostrarItem(Item);
            //console.log('oncambioItems del controlador',Items);
        }
    }

