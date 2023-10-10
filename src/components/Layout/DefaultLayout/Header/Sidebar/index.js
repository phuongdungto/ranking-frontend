import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { faEmpire } from '@fortawesome/free-brands-svg-icons';
import {
  faCameraRetro,
  faVideo,
  faWrench,
  faPhone,
  faBars,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import './sidebar.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <Navbar id="sidebar-menu" expand="lg" className="header-menu">
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ borderColor: 'yellow' }}
        ></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="row">
          <Nav className="me-auto" style={{ width: '100%' }}>
            <NavLink
              to="/"
              className={(navData) =>
                'menu-item col-xl-2' + (navData.isActive ? ' active' : ' link')
              }
            >
              <span>Post</span>
            </NavLink>
            <NavLink
              to="/posts"
              className={(navData) =>
                'menu-item col-xl-2' + (navData.isActive ? ' active' : ' link')
              }
            >
              <span>Want To Go</span>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Sidebar;
