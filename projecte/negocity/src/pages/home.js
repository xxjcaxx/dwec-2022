export { Home };
import { CityController } from "../controllers/cities_controller.js";
import { City,CityList } from "../models/cities_model.js";
import { CityView } from "../views/cities_views.js";

class Home {
  constructor() {}
  renderHome() {

    // En el home anem a veure una visió general de totes les ciutats
    app.container.innerHTML = `<h2>Cities</h2>`;
    let cityController = new CityController(
      new CityList(),
      new CityView(container,'resume')
    );
  }
}

/*

`<div class="row">
        <div class="col" id="survivors">
          <h2>Survivors</h2>
          <div class="card" style="width: 18rem">
            <img src="img/characters/selected/small/c1.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Jonhy Blood Sack</h5>
              <p class="card-text">Lorem ipsum dolor sit amerum?</p>
              <a href="#" class="btn btn-primary">Details</a>
            </div>
          </div>
          <div class="card" style="width: 18rem">
            <img src="img/characters/selected/small/o13.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Asfds ftewa</h5>
              <p class="card-text">Lorem ipsum dolor sit amerum?</p>
              <a href="#" class="btn btn-primary">Details</a>
            </div>
          </div>
        </div>
        <div class="col">
          <h2>Vehicles</h2>
          <div class="card" style="width: 18rem">
            <img
              src="img/vehicles/basic_car.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Basic car</h5>
              <p class="card-text"><ul>
                <li>Oil Consumption: 5</li>
                <li>Gas Tank: 50</li>
                <li>Passengers: 2</li>
                <li>Junk Level: 90%</li>
                <li>Damage: 200</li>
              </ul></p>
              <a href="#" class="btn btn-primary">Details</a>
            </div>
          </div>
          <div class="card" style="width: 18rem">
            <img
              src="img/vehicles/wasteland_truck.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Wasteland Truck</h5>
              <p class="card-text"><ul>
                <li>Oil Consumption: 15</li>
                <li>Gas Tank: 10000</li>
                <li>Passengers: 2</li>
                <li>Junk Level: 50%</li>
                <li>Damage: 20000</li>
              </ul></p>
              <a href="#" class="btn btn-primary">Details</a>
            </div>
          </div>
        </div>
        <div class="col">Column</div>
      </div>`*/
