import { Map } from "./pages/map.js";
import { Login } from "./pages/login.js";
import { Home } from "./pages/home.js";
import { menu } from "./components/menu.js";
import { Survivors } from "./pages/survivors.js";

(function autoinvocada() {
  function frontPage(container) {
    let l = new Home();
    l.renderHome(container);
  }
  function login(container) {
    let l = new Login();
    l.renderLogin(container);
  }
  function survivors(container) {
    let survivors = new Survivors();
    survivors.renderSurvivors(container);
  }
  function map(container) {
    let map = new Map();
    map.renderMap(container);
  }

  document.addEventListener("DOMContentLoaded", function domLoad() {
    let container = document.querySelector("#container");
    document.querySelector("body").prepend(menu());
    frontPage(container);

    document
      .querySelector("#home_link")
      .addEventListener("click", (e) => frontPage(container));
    document
      .querySelector("#map_link")
      .addEventListener("click", (e) => map(container));
    document
      .querySelector("#login_link")
      .addEventListener("click", (e) => login(container));
    document
      .querySelector("#survivors_link")
      .addEventListener("click", (e) => survivors(container));
  });
})();
