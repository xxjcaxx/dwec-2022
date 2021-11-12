import { Map } from "./pages/map.js";
import { Login } from "./pages/login.js";
import { Home } from "./pages/home.js";
import { menu } from "./components/menu.js";
import { Survivors } from "./pages/survivors.js";

window.app = {};
app.url = "http://10.100.23.100:8069";

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
    let survivors = new Survivors();
    survivors.renderSurvivors();
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
  });
})();
