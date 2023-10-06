import request from '../core/utils/axios';

export const loginService = (user) => {
  const bodyParameters = {
    ...user,
  };

  return request.post('auth/signin', bodyParameters);
};
