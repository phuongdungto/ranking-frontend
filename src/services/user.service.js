import request from '../core/utils/axios';

export const getUserService = (user) => {
  let s = '';
  if (user.limit) {
    s += '?limit=' + user.limit + '';
  } else {
    s += '?limit=10';
  }
  if (user.name && user.name !== '') {
    s += '&name=' + user.name + '';
  }
  if (user.brandId && user.brandId !== '') {
    s += '&brandId=' + user.brandId + '';
  }
  if (user.categoryId && user.categoryId !== '') {
    s += '&categoryId=' + user.categoryId + '';
  }
  if (user.description && user.description !== '') {
    s += '&description=' + user.description + '';
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
