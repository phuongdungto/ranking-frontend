import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { loginService } from '../../services/auth.service';
import cookies from 'react-cookies';
import { handelNotify } from '../../core/utils/req';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogin } from '../../store/action/userAction';

function Register() {
  const [signup, setSignup] = useState({
    fullname: '',
    username: '',
    password: '',
    repassword: '',
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setSignup({
      ...signup,
      [e.target.name]: value,
    });
    console.log(signup);
  };
  //   const handleOnclick = async (e) => {
  //     e.preventDefault();

  //     try {
  //       let response = await loginService(login);
  //       const data = response && response.data ? response.data : '';
  //       cookies.save('Token', data.access_token);
  //       cookies.save('user', data.user);
  //       dispatch(userLogin(data.information));
  //       navigate('/');
  //     } catch (e) {
  //       if (
  //         e.response.data.error &&
  //         Array.isArray(e.response.data.error) &&
  //         e.response.data.error[0] &&
  //         e.response.data.error[0].field
  //       ) {
  //         handelNotify('error', e.response.data.error[0].message);
  //       } else {
  //         const message =
  //           e.response.data.error === 'Email or password is incorrect'
  //             ? 'Email hoặc mật khẩu không chính xác'
  //             : e.response.data.error;
  //         handelNotify('error', message);
  //       }
  // }
  //   };
  return (
    <>
      <ToastContainer></ToastContainer>
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
                  <form class="user">
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
                      </div>
                      <div class="col-sm-6">
                        <input
                          type="password"
                          class="form-control form-control-user"
                          id="exampleRepeatPassword"
                          placeholder="Repeat Password"
                          name="repassword"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <a
                      href="login.html"
                      class="btn btn-primary btn-user btn-block"
                    >
                      Register Account
                    </a>
                    <hr />
                  </form>
                  <hr />
                  <div class="text-center">
                    <NavLink to="/forgotpassword">
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
