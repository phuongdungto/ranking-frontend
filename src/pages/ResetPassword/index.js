import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import validator from 'validator';
import { resetPasswordService } from '../../services/auth.service';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Notify } from '../../core/constant';
import { handelNotify } from '../../core/utils/req';
import { ToastContainer } from 'react-toastify';

function ResetPassword() {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showAlertCf, setShowAlertCf] = useState({
    open: false,
  });
  const [validate, setValidate] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
    console.log(user);
  };
  const handleOnclick = async (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
    try {
      let userRs = {};
      if (uid && token) {
        userRs = { ...user, id: parseInt(uid), token: token };
        await resetPasswordService(userRs);
        setShowAlertCf({
          open: true,
          variant: Notify.SUCCESS,
          text: 'Đổi mật khẩu thành công',
          title: 'Thành công',
          backdrop: 'static',
          onClick: () => navigate('/login'),
        });
      } else {
        handelNotify('error', 'Đổi mật khẩu thất bại');
      }
    } catch (e) {
      if (e.response.data.error) {
        console.log(e.response.data.message);
        handelNotify('error', e.response.data.message);
      }
    }
  };
  const validateAll = () => {
    const msg = {};
    if (validator.isEmpty(user.password)) {
      msg.password = 'Vui lòng nhập mật khẩu';
    } else {
      if (user.password.length < 8) {
        msg.password = 'Mật khẩu phải có ít nhất 8 ký tự';
      }
    }
    if (user.confirmPassword !== null && user.confirmPassword !== undefined)
      if (validator.isEmpty(user.confirmPassword)) {
        msg.confirmPassword = 'Vui lòng nhập lại mật khẩu';
      } else {
        if (user.password !== user.confirmPassword) {
          msg.confirmPassword = 'Mật khẩu không khớp';
        }
      }
    setValidate(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  return (
    <>
      <ToastContainer />
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
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-2">
                          Forgot Your Password?
                        </h1>
                        <p class="mb-4">
                          We get it, stuff happens. Just enter your email
                          address below and we'll send you a link to reset your
                          password!
                        </p>
                      </div>
                      <form class="user" onSubmit={handleOnclick}>
                        <div class="form-group mb-3">
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
                        <div class="form-group">
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
                        <input
                          class="btn btn-primary btn-user btn-block"
                          value="Reset Password"
                          type="submit"
                        />
                      </form>
                      <hr />
                      <div class="text-center">
                        <NavLink to="/signup">
                          <small>Create an Account!</small>
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
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
