import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { loginService } from '../../services/auth.service';
import cookies from 'react-cookies';
import { handelNotify } from '../../core/utils/req';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogin } from '../../store/action/userAction';
import validator from 'validator';

function Login() {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validate, setValidate] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setLogin({
      ...login,
      [e.target.name]: value,
    });
  };
  const handleOnclick = async (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
    try {
      let response = await loginService(login);
      const data = response && response.data ? response.data : '';
      cookies.save('Token', data.access_token);
      cookies.save('user', data.user);
      dispatch(userLogin(data.user));
      navigate('/');
    } catch (e) {
      if (
        e.response.data.error &&
        Array.isArray(e.response.data.error) &&
        e.response.data.error[0] &&
        e.response.data.error[0].field
      ) {
        handelNotify('error', e.response.data.error[0].message);
      } else {
        const message =
          e.response.data.error === 'Email or password is incorrect'
            ? 'Email hoặc mật khẩu không chính xác'
            : e.response.data.error;
        handelNotify('error', message);
      }
    }
  };
  const validateAll = () => {
    const msg = {};
    if (validator.isEmpty(login.username)) {
      msg.username = 'Vui lòng nhập email';
    } else {
      if (!validator.isEmail(login.username)) {
        msg.username = 'Email không hợp lệ';
      }
    }

    if (validator.isEmpty(login.password)) {
      msg.password = 'Vui lòng nhập mật khẩu';
    } else {
      if (login.password.length < 8) {
        msg.password = 'Mật khẩu phải có ít nhất 8 ký tự';
      }
    }
    setValidate(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form class="user" onSubmit={handleOnclick}>
                        <div class="form-group">
                          <input
                            type="email"
                            class="form-control form-control-user"
                            name="username"
                            onChange={handleChange}
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                          />
                          <p
                            style={{ color: 'red', textAlign: 'left' }}
                            className="text-red-400 text-xs italic"
                          >
                            {validate.username}
                          </p>
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            name="password"
                            class="form-control form-control-user"
                            onChange={handleChange}
                            id="exampleInputPassword"
                            placeholder="Password"
                          />
                          <p
                            style={{ color: 'red', textAlign: 'left' }}
                            className="text-red-400 text-xs italic"
                          >
                            {validate.password}
                          </p>
                        </div>
                        <input
                          value={'Login'}
                          type="submit"
                          class="btn btn-primary btn-user btn-block"
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
                        <NavLink to="/signup">
                          <small>Create an Account!</small>
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

export default Login;
