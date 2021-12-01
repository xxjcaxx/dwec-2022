import { Map } from "./pages/map.js";
import { Login } from "./components/login.js";
import { Home } from "./pages/home.js";
import { menu } from "./components/menu.js";
import { SurvivorsPage } from "./pages/survivors.js";
import { CitiesPage } from "./pages/cities.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  isInLE,
  inicializarUsuario,
  checkUsuario,
} from "./utils/local_storage.js";

import "./style.css";
import { router } from "./router/router.js";

window.app = {};
app.url = "http://10.100.23.100:8069";
//app.url = "http://192.168.88.15:8069";

(function autoinvocada() {
  document.addEventListener("DOMContentLoaded", function domLoad() {
    app.container = document.querySelector("#container");
    document.querySelector("body").prepend(menu());

    checkUsuario("#/login");

    router(window.location.hash);
  });

  window.addEventListener("hashchange", () => {
    router(window.location.hash);
  });
})();
