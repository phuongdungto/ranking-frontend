import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { signupService } from '../../services/auth.service';
import { handelNotify } from '../../core/utils/req';
import { NavLink, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { Button, Modal } from 'react-bootstrap';
import { Notify } from '../../core/constant';

function Register() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [validate, setValidate] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setSignup({
      ...signup,
      [e.target.name]: value,
    });
    console.log(signup);
  };
  const [showAlertCf, setShowAlertCf] = useState({
    open: false,
  });
  const validateAll = () => {
    const msg = {};
    if (signup.fullname !== null && signup.fullname !== undefined) {
      if (validator.isEmpty(signup.fullname)) {
        msg.fullname = 'Vui lòng nhập tên';
      } else {
        if (validator.isNumeric(signup.fullname)) {
          msg.fullname = 'Tên không hợp lệ';
        }
      }
    }
    if (validator.isEmpty(signup.username)) {
      msg.username = 'Vui lòng nhập email';
    } else {
      if (!validator.isEmail(signup.username)) {
        msg.username = 'Email không hợp lệ';
      }
    }
    if (validator.isEmpty(signup.password)) {
      msg.password = 'Vui lòng nhập mật khẩu';
    } else {
      if (signup.password.length < 8) {
        msg.password = 'Mật khẩu phải có ít nhất 8 ký tự';
      }
    }
    if (signup.confirmPassword !== null && signup.confirmPassword !== undefined)
      if (validator.isEmpty(signup.confirmPassword)) {
        msg.confirmPassword = 'Vui lòng nhập lại mật khẩu';
      } else {
        if (signup.password !== signup.confirmPassword) {
          msg.confirmPassword = 'Mật khẩu không khớp';
        }
      }
    setValidate(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  const handleChangeOnClick = async (e) => {
    e.preventDefault();
    const isValid = validateAll(signup);
    if (!isValid) return;
    try {
      await signupService(signup);
      setShowAlertCf({
        open: true,
        variant: Notify.SUCCESS,
        text: 'Bạn có thể đăng nhập bằng tài khoản đã đăng ký',
        title: 'Đăng ký thành công',
        backdrop: 'static',
        onClick: () => navigate('/login'),
      });
    } catch (e) {
      if (e.response.data.error) {
        const map = {
          'username already existed':
            'Email đã tồn tại, vui lòng nhập email khác',
        };
        const message = map[e.response.data.message] || e.response.data.message;
        console.log(message);
        handelNotify('error', message);
      }
    }
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <Modal
        show={showAlertCf.open}
        onHide={() => setShowAlertCf({ open: false })}
        backdrop={showAlertCf.backdrop}
        keyboard={false}
      >
        <Modal.Header
          style={{ backgroundColor: showAlertCf.variant }}
          closeButton
        >
          <Modal.Title>{showAlertCf.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showAlertCf.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Hủy</Button>
          <Button onClick={showAlertCf.onClick} variant="primary">
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="container">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div class="col-lg-7">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form class="user" onSubmit={handleChangeOnClick}>
                    <div class="form-group row">
                      <div class="col-sm-12 mb-3 mb-sm-0">
                        <input
                          type="text"
                          class="form-control form-control-user"
                          id="exampleFirstName"
                          placeholder="Full Name"
                          name="fullname"
                          onChange={handleChange}
                        />
                        <p
                          style={{ color: 'red', textAlign: 'left' }}
                          className="text-red-400 text-xs italic"
                        >
                          {validate.fullname}
                        </p>
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Email Address"
                        name="username"
                        onChange={handleChange}
                      />
                      <p
                        style={{ color: 'red', textAlign: 'left' }}
                        className="text-red-400 text-xs italic"
                      >
                        {validate.username}
                      </p>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="password"
                          class="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                        />
                        <p
                          style={{ color: 'red', textAlign: 'left' }}
                          className="text-red-400 text-xs italic"
                        >
                          {validate.password}
                        </p>
                      </div>
                      <div class="col-sm-6">
                        <input
                          type="password"
                          class="form-control form-control-user"
                          id="exampleRepeatPassword"
                          placeholder="Repeat Password"
                          name="confirmPassword"
                          onChange={handleChange}
                        />
                        <p
                          style={{ color: 'red', textAlign: 'left' }}
                          className="text-red-400 text-xs italic"
                        >
                          {validate.confirmPassword}
                        </p>
                      </div>
                    </div>
                    <input
                      type="submit"
                      class="btn btn-primary btn-user btn-block"
                      value="Register Account"
                    />
                    <hr />
                  </form>
                  <hr />
                  <div class="text-center">
                    <NavLink to="/forgot-password">
                      <small>Forgot Password?</small>
                    </NavLink>
                  </div>
                  <div class="text-center">
                    <NavLink to="/login">
                      <small>Already have an account? Login!</small>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
