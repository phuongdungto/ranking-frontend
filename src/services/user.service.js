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

  console.log(s);
  return request.get('users' + s);
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

export const updateUserService = async (id, user, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const bodyParameters = {
    ...user,
  };
  return await request.put('users/' + id, bodyParameters, config);
};
