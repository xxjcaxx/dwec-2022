import { menu } from "./components/menu.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkUsuario } from "./utils/local_storage.js";

import "./style.css";
import { router } from "./router/router.js";

window.app = {};
//app.url = "http://10.100.23.100:8069";
app.url = "http://192.168.88.60:8069";

(function autoinvocada() {
  document.addEventListener("DOMContentLoaded", function domLoad() {
    app.container = document.querySelector("#container");
    document.querySelector("body").prepend(menu());

    if (checkUsuario()) {
      // window.location.hash = '#'
    } else {
      window.location.hash = "#/login";
    }

    router(window.location.hash);
  });

 window.addEventListener("hashchange", () => {
    router(window.location.hash);
  });
})();
