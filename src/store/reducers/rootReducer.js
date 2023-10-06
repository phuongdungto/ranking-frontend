import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adminReducer from './adminReducer';

const mainReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

export default mainReducer;
