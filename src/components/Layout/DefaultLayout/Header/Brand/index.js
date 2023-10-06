import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function Brand() {
  return (
    <>
      <div id="header-top">
        <div className="header-topbar row">
          <div className="header-topbar-content col-12 offset-0 col-xl-4 offset-xl-4">
            <NavLink
              to="/Home"
              style={{ textDecoration: 'none', color: 'yellow' }}
            >
              <pre>User Ranking</pre>
            </NavLink>
          </div>

          <div className="col-4 col-xl-3">
            <div className="row">
              <div className="shop-card offset-6 col-xl-1"></div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Brand;
