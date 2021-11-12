export { menu };

function menu() {
  let navMenu = document.createElement("nav");
  navMenu.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "bg-dark");
  navMenu.innerHTML = ` <div class="container-fluid">
      <a class="navbar-brand" href="#">Negocity</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="home_link"
              aria-current="page"
              href="#"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" id="survivors_link" href="#">Survivors</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="cities_link" href="#">Cities</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="map_link" href="#">Map</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="login_link" href="#">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="logout_link" href="#">Logout</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#">Something else here</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>`;
  return navMenu;
}
