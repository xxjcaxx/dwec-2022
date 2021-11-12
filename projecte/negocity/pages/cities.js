export { Cities };

class City {
    constructor(datos) {
        Object.assign(this, datos);
    }
    render() {
        let divCity = document.createElement("div");
        divCity.id = `city-${this.id}`;
        divCity.classList.add("col");
        // prettier-ignore
        divCity.innerHTML = ` 
    <div class="card text-dark" style="width: 10rem">
    <div class="card-body">
      <h5 class="card-title">${this.name}</h5>
    </div>
    <ul class="list-group list-group-flush" >
    <li class="list-group-item list-group-item-dark">Energy: ${parseFloat(this.energy).toFixed(2)}</li>
    <li class="list-group-item list-group-item-dark">Oil: ${parseFloat(this.oil).toFixed(2)}</li>
    <li class="list-group-item list-group-item-dark">Food: ${parseFloat(this.food).toFixed(2)}</li>
    <li class="list-group-item list-group-item-dark">Water: ${parseFloat(this.water).toFixed(2)}</li>
    <li class="list-group-item list-group-item-dark">Despair: ${parseFloat(this.despair).toFixed(2)}</li>
    <li class="list-group-item list-group-item-dark">Radiation: ${parseFloat(this.radiation).toFixed(2)}</li>

    </ul>
    <a href="#" class="btn btn-primary">Details</a>
  </div>
 
    `;
        return divCity;
    }
}

class Cities {
    constructor() { }

    async renderCities() {
        app.container.innerHTML = `<div class="row" id="cities">
     
   </div>`;

        let response = await fetch(
            app.url + "/negocity/api/cities/"+localStorage.getItem('id')
        );
        let datos = await response.json();
        //datos = datos.survivors;
        for (let s of datos) {
            console.log(s);
            let city = new City(s);
            let divCity = city.render();
            app.container.querySelector("#cities").append(divCity);
        }
    }
}
