import { View } from "./view.js"

export { ProductListView, ProductView };

class ProductView extends View {
    constructor(container){ super(container);}

    render(producto){
       // console.log(producto);
        let divProducto = document.createElement('div');
        divProducto.classList.add('col');
        divProducto.innerHTML = `
        <div class="card">
        <img src="data:image/png;base64, ${producto.foto}" class="card-img-top" alt="${producto.referencia}">
        <div class="card-body">
          <h5 class="card-title">${producto.marca}  ${producto.referencia}</h5>
          <p class="card-text">${producto.precio}</p>
        </div>
      </div>
        `;
        this.divRow.append(divProducto);

    }
}
class ProductListView extends View {
    constructor(){ super();}
}