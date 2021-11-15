import { Map } from "./pages/map.js";
import { Login } from "./components/login.js";
import { Home } from "./pages/home.js";
import { menu } from "./components/menu.js";
import { SurvivorsPage } from "./pages/survivors.js";
import { CitiesPage } from "./pages/cities.js";

window.app = {};
app.url = "http://192.168.88.15:8069";

(function autoinvocada() {
  app.frontPage = function () {
    let l = new Home();
    l.renderHome();
  };
  app.login = function () {
    let l = new Login();
    l.renderLogin();
  };
  app.survivors = function () {
    let survivors = new SurvivorsPage();
    survivors.render(app.container);
  };
  app.cities = function () {
    let cities = new CitiesPage();
    cities.render(app.container);
  };
  app.map = function () {
    let map = new Map();
    map.renderMap();
  };

  document.addEventListener("DOMContentLoaded", function domLoad() {
    app.container = document.querySelector("#container");
    document.querySelector("body").prepend(menu());

    if (localStorage.getItem("user")) {
      app.datosUsuario = {};
      app.frontPage();
    } else {
      app.login();
    }

    document
      .querySelector("#home_link")
      .addEventListener("click", (e) => app.frontPage());
    document
      .querySelector("#map_link")
      .addEventListener("click", (e) => app.map());
    document
      .querySelector("#login_link")
      .addEventListener("click", (e) => app.login());
    document.querySelector("#logout_link").addEventListener("click", (e) => {
      localStorage.clear();
      app.frontPage();
    });
    document
      .querySelector("#survivors_link")
      .addEventListener("click", (e) => app.survivors());
    document
      .querySelector("#cities_link")
      .addEventListener("click", (e) => app.cities());
  });

})();
