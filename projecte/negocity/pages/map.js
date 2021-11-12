export { Map };

class Map {
  constructor() {
    this.cities = [];
    this.roads = [];
  }
  renderCities(cities, ctx) {
    this.cities = cities;
    for (let c of cities) {
      // console.log(c);
      ctx.fillStyle = "rgb(200, 0, 0)";
      ctx.fillRect(c.position_x * 20, c.position_y * 20, 10, 10);
      ctx.fillText(c.name, c.position_x * 20, c.position_y * 20 + 20); 
    }
  }
  renderRoads(roads, ctx) {
    //console.log(roads);
    for (let r of roads) {
      let city1 = r.city_1;
      let city2 = r.city_2;
      city1 = this.cities.find((c) => c.id === city1[0]);
      city2 = this.cities.find((c) => c.id === city2[0]);
      // console.log(city1, city2);
      ctx.beginPath();
      ctx.moveTo(city1.position_x * 20 + 5, city1.position_y * 20 + 5);
      ctx.lineTo(city2.position_x * 20 + 5, city2.position_y * 20 + 5);
      ctx.stroke();
    }
  }
  renderMap() {
    app.container.innerHTML = `<div class="row">
     <div class="col" id="map"></div>
   </div>`;
    let canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    document.querySelector("#map").append(canvas);
    let ctx = canvas.getContext("2d");

    function json(response) {
      return response.json();
    }
    let fetchOptions = {
      method: "get",
    };
    fetch("http://10.100.23.100:8069/negocity/api/city", fetchOptions)
      .then(json)
      .then((cities) => {
        this.renderCities(cities, ctx);
      })
      .then(() => {
        return fetch(
          "http://10.100.23.100:8069/negocity/api/road",
          fetchOptions
        );
      })
      .then(json)
      .then((roads) => this.renderRoads(roads, ctx));
  }
}
