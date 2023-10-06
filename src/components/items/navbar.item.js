const Navbar = () => {
  return (
    <>
      <div class="small mb-1">Navbar Dropdown Example:</div>
      <nav class="navbar navbar-expand navbar-light bg-light mb-4">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div
              class="dropdown-menu dropdown-menu-right animated--grow-in"
              aria-labelledby="navbarDropdown"
            >
              <a class="dropdown-item" href="#">
                Action
              </a>
              <a class="dropdown-item" href="#">
                Another action
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
