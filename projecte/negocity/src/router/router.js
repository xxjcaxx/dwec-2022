export { router };
import { Map } from "../pages/map.js";
import { Login } from "../components/login.js";
import { Home } from "../pages/home.js";
import { menu } from "../components/menu.js";
import { SurvivorsPage } from "../pages/survivors.js";
import { CitiesPage } from "../pages/cities.js";
import { CityDetails } from "../pages/city_details.js";
import { BuildingDetails } from "../pages/buiding_details.js";
import { SurvivorDetails } from "../pages/survivor_details.js";

const router = (route) => {
  console.log(route);

  /// Rutes a expresions regulars

  if (/#\/city\/[0-9]+/.test(route)) {
    let cityId = route.split("/")[2];
    CityDetails(cityId);
    // console.log(cityId);
  } else if (/#\/building\/[0-9]+/.test(route)) {
    let buidingId = route.split("/")[2];
    BuildingDetails(buidingId);
  } else if (/#\/survivor\/[0-9]+/.test(route)) {
    let survivorId = route.split("/")[2];
    SurvivorDetails(survivorId);
  }
  //////////// Rutes a pàgines
  else {
    switch (route) {
      case "#/":
        console.log("#");
        let l = new Home();
        l.renderHome();
        break;
      case "#/survivors":
        console.log("#survivors");
        let survivors = new SurvivorsPage();
        survivors.render(app.container);
        break;
      case "#/cities":
        console.log("cities");
        let cities = new CitiesPage();
        cities.render(app.container);
        break;
      case "#/map":
        console.log("map");
        let map = new Map();
        map.renderMap();
        break;
      case "#/logout":
        console.log("logout");
        localStorage.clear();
        let H = new Home();
        H.renderHome();
        break;
      case "#/login":
        console.log("login");
        let login = new Login();
        login.renderLogin();
        break;

      default:
        console.log("#");
        let h = new Home();
        h.renderHome();
    }
  }
};
