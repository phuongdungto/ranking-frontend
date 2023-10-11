import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'react-cookies';
import { userLogout } from '../../../../../store/action/userAction';

function Brand() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnclickLogin = () => {
    navigate('/login');
  };
  const handleOnclickProfile = () => {
    navigate('/profile');
  };
  const handleOnclickAdmin = () => {
    navigate('/admin/users');
  };
  let path = (
    <Button
      onClick={(e) => handleOnclickLogin()}
      className="col-7 col-xl-4 btn btn-warning btn-sm my-1"
    >
      Đăng Nhập
    </Button>
  );
  if (user) {
    let name = '';
    let arrName = user.fullname.split(' ');
    if (arrName.length < 1) {
      name = user.fullname;
    } else {
      name += arrName[arrName.length - 1];
    }
    path = (
      <Dropdown>
        <Dropdown.Toggle variant="Info" id="dropdown-basic">
          {name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => handleOnclickProfile()}>
            Thông tin tài khoản
          </Dropdown.Item>
          {user && user.role === 'admin' && (
            <Dropdown.Item onClick={(e) => handleOnclickAdmin()}>
              Đến trang quản lý
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={(e) => handleOnclickLogout()}>
            Đăng xuất
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    const handleOnclickLogout = () => {
      cookies.remove('Token');
      cookies.remove('user');
      dispatch(userLogout());
      navigate('/');
    };
  }
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
              {path}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Brand;
