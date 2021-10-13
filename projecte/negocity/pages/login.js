export { Login };

class Login {
  constructor() {}
  renderLogin(container) {
    container.innerHTML = `<div class="row">
    <div class="col" id="login">
      <form onsubmit="return false;" class="bg-dark text-light">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
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
  }
}
