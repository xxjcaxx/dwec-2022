export { Controller };

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.read().subscribe({
      next: (item) => { this.view.mostrarItem(item) },
      error: (error) => { this.view.mostrarError(error); }
    })
  }

}
