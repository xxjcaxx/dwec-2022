import { Map } from "./pages/map.js";
import { Login } from "./pages/login.js";
import { Home } from "./pages/home.js";

(() => {
  function frontPage(container) {
    let l = new Home();
    l.renderHome(container);
  }

  function login(container) {
    let l = new Login();
    l.renderLogin(container);
  }

  document.addEventListener("DOMContentLoaded", function () {
    let container = document.querySelector("#container");
    frontPage(container);
    document
      .querySelector("#home_link")
      .addEventListener("click", (e) => frontPage(container));
    document.querySelector("#map_link").addEventListener("click", (e) => {
      let map = new Map();
      map.renderMap(container);
    });
    document
      .querySelector("#login_link")
      .addEventListener("click", (e) => login(container));
  });
})();
