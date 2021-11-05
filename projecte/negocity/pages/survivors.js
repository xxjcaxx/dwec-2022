export { Survivors };

class Survivor {
  constructor(datos) {
    Object.assign(this, datos);
  }
  render() {
    let divSurvivor = document.createElement("div");
    divSurvivor.innerHTML = `<h2>${this.name}</h2><p>Illness: ${this.illness}</p>`;
    return divSurvivor;
  }
}

class Survivors {
  constructor() {}

  async renderSurvivors(container) {
    container.innerHTML = `<div class="row">
     <div class="col" id="survivors">SURVIVORS</div>
   </div>`;

    let response = await fetch("datos/survivors.json");
    let datos = await response.json();
    datos = datos.survivors;
    for (let s of datos) {
      console.log(s);
      let survivor = new Survivor(s);
      let divSurvivor = survivor.render();
      container.querySelector("#survivors").append(divSurvivor);
    }
  }
}
