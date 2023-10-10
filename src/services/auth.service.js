import request from '../core/utils/axios';

export const loginService = (user) => {
  const bodyParameters = {
    ...user,
  };

  return request.post('auth/signin', bodyParameters);
};

export const signupService = (user) => {
  const bodyParameters = {
    ...user,
  };

  return request.post('auth/signup', bodyParameters);
};

export const forgotpasswordService = (user) => {
  const bodyParameters = {
    ...user,
  };
  return request.post('auth/forgot-password', bodyParameters);
};

export const resetPasswordService = (user) => {
  delete user.confirmPassword;
  const bodyParameters = {
    ...user,
  };
  return request.post('auth/password-reset', bodyParameters);
};
