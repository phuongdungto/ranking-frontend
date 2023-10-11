import request from '../core/utils/axios';

export const getUsersService = (user) => {
  let s = '';
  if (user.limit) {
    s += '?limit=' + user.limit + '';
  } else {
    s += '?limit=10';
  }
  if (user.fullname && user.fullname !== '') {
    s += '&fullname=' + user.fullname + '';
  }
  if (user.username && user.username !== '') {
    s += '&username=' + user.username + '';
  }
  if (user.sortBy) {
    s += '&sortBy=' + user.sortBy + '';
  }
  if (user.sort) {
    s += '&sort=' + user.sort + '';
  }
  if (user.page) {
    s += '&page=' + user.page + '';
  }

  return request.get('users' + s);
};

export const getUserByIdService = (userId, token) => {
  return request.get('users/' + userId);
};

export const getRankMonthlyService = () => {
  return request.get('ranks/monthly');
};

export const getRankYearlyService = () => {
  return request.get('ranks/yearly');
};

export const updateUserProfileService = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await request.put('users/me', user, config);
};

export const updateUserService = async (userId, user, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await request.put('users/' + userId, user, config);
};

export const createUserService = async (user, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await request.post('users', user, config);
};

export const deleteUserService = async (userId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await request.delete('users/' + userId, config);
};
