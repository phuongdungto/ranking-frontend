const userLogin = (payload) => {
  console.log(payload);
  return {
    type: 'USER_LOGIN',
    payload: payload,
  };
};
const userLogout = (payload = null) => {
  return {
    type: 'USER_LOGOUT',
    payload: payload,
  };
};
export { userLogin, userLogout };
