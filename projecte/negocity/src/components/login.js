/* eslint-disable no-undef */
import { router } from "../router/router";

export { Login };

class Login {
  constructor() {
    this.password = "";
  }
  renderLogin() {
    app.container.innerHTML = `<div class="row ">
    <div class="col " id="login">
      <form onsubmit="return false;" class="">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="text"
            class="form-control"
            id="InputEmail"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="InputPassword" />
        </div>
        <div class="form-group form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="exampleCheck1"
          />
          <label class="form-check-label" for="exampleCheck1"
            >Check me out</label
          >
        </div>
        <button class="btn btn-primary" id="btn-login">Submit</button>
      </form>
    </div>
  </div>`;
    container.querySelector("#btn-login").addEventListener("click", () => {
      app.user = app.container.querySelector("#InputEmail").value;
      this.password = app.container.querySelector("#InputPassword").value;
      this.login();
    });
  }

  login() {
    let body = {
      jsonrpc: "2.0",
      method: "call",
      params: { user: app.user, password: this.password },
    };
    fetch(app.url + "/negocity/login", {
      method: "post",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((datos) => {
        localStorage.setItem("user", this.user);
        localStorage.setItem("id", datos.result.id);
        localStorage.setItem("name", datos.result.name);
        router("#/");
      });
  }
}
