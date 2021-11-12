export { Survivors };

class Survivor {
  constructor(datos) {
    Object.assign(this, datos);
  }
  render() {
    let divSurvivor = document.createElement("div");
    divSurvivor.id = `survivor-${this.id}`;
    divSurvivor.classList.add("col");
    divSurvivor.innerHTML = ` 
    <div class="card text-dark" style="width: 10rem">
    <img src="data:image/jpeg;base64,${
      this.avatar
    }" class="card-img-top" alt="${this.name}" />
    <div class="card-body">
      <h5 class="card-title">${this.name}</h5>
    </div>
    <ul class="list-group list-group-flush" >
    <li class="list-group-item list-group-item-dark">Illnes: ${this.illnes}</li>
    <li class="list-group-item list-group-item-dark">Desperation: ${
      this.desperation
    }</li>
    <li class="list-group-item list-group-item-dark">Mutations: ${
      this.mutations
    }</li>
    <li class="list-group-item list-group-item-dark">City: ${
      this.city[1] || "Traveling"
    }</li>
    </ul>
    <a href="#" class="btn btn-primary">Details</a>
  </div>
 
    `;

    divSurvivor.querySelector('.btn').addEventListener('click',()=>{
      this.renderdetails();
    });
    return divSurvivor;
  }

  renderdetails() {
    let divSurvivor = document.createElement("div");
    divSurvivor.id = `survivor-${this.id}`;
    divSurvivor.classList.add("col");
    divSurvivor.innerHTML = ` 
    <div class="card text-dark" style="width: 20rem">
    <img src="data:image/jpeg;base64,${
      this.avatar
    }" class="" alt="${this.name}" />
    <div class="card-body">
      <h5 class="card-title">${this.name}</h5>
    </div>
    <ul class="list-group list-group-flush" >
    <li class="list-group-item list-group-item-dark">Illnes: ${this.illnes}</li>
    <li class="list-group-item list-group-item-dark">Desperation: ${
      this.desperation
    }</li>
    <li class="list-group-item list-group-item-dark">Mutations: ${
      this.mutations
    }</li>
    <li class="list-group-item list-group-item-dark">City: ${
      this.city[1] || "Traveling"
    }</li>
    </ul>
    <a href="#" class="btn btn-primary">Return</a>
  </div>
 
    `;
    divSurvivor.querySelector('.btn').addEventListener('click',()=>{
      app.survivors();
    });

    app.container.innerHTML = `<div class="row" id="survivors"> </div>`;
   app.container.querySelector("#survivors").append(divSurvivor);

  }
}

class Survivors {
  constructor() {}

  async renderSurvivors() {
    app.container.innerHTML = `<div class="row" id="survivors">  </div>`;

    let response = await fetch(
      app.url + "/negocity/api/survivors/" + localStorage.getItem("id")
    );
    let datos = await response.json();
    //datos = datos.survivors;
    for (let s of datos) {
      console.log(s);
      let survivor = new Survivor(s);
      let divSurvivor = survivor.render();
      app.container.querySelector("#survivors").append(divSurvivor);
    }
  }
}
